import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  FileText, 
  Target, 
  Eye, 
  Star,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import BasicInfoStep from './BasicInfoStep';
import DetailsStep from './DetailsStep';
import MediaStep from './MediaStep';
import ReviewStep from './ReviewStep';
import toast from 'react-hot-toast';

interface ProductFormData {
  name: string;
  category: string;
  description: string;
  targetAudience: string;
  keyFeatures: string;
  pricing: string;
  competition: string;
  marketingGoals: string;
  timeline: string;
  images: File[];
  documents: File[];
}

interface ProductFormProps {
  onComplete: (data: ProductFormData, feedback: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onComplete }) => {
  const { addProduct } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    description: '',
    targetAudience: '',
    keyFeatures: '',
    pricing: '',
    competition: '',
    marketingGoals: '',
    timeline: '',
    images: [],
    documents: []
  });
  const [feedback, setFeedback] = useState<any>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const steps = [
    { title: 'Basic Info', icon: FileText, description: 'Product name, category, description' },
    { title: 'Details', icon: Target, description: 'Audience, features, pricing' },
    { title: 'Media', icon: Eye, description: 'Images, documents, goals' },
    { title: 'Review', icon: Star, description: 'AI analysis and feedback' }
  ];

  // Auto-save functionality
  React.useEffect(() => {
    const autoSave = async () => {
      if (formData.name || formData.description) {
        setIsAutoSaving(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsAutoSaving(false);
        console.log('Auto-saved:', formData);
      }
    };

    const debounceTimer = setTimeout(autoSave, 2000);
    return () => clearTimeout(debounceTimer);
  }, [formData]);

  const generateFeedback = async () => {
    setLoadingFeedback(true);
    try {
      // Simulate AI feedback generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockFeedback = {
        overallScore: Math.floor(Math.random() * 30) + 70,
        strengths: [
          "Clear value proposition and target market definition",
          "Comprehensive feature set with competitive advantages",
          "Well-researched competitive landscape analysis",
          "Realistic timeline and achievable marketing goals"
        ],
        improvements: [
          "Consider adding more specific pricing tiers for different user segments",
          "Expand on unique selling points versus key competitors",
          "Include more detailed market analysis and size estimation",
          "Add customer acquisition cost projections"
        ],
        marketInsights: [
          `${formData.category} category is trending upward (+15% YoY growth)`,
          "Your target demographic shows high engagement with similar products",
          "Consider seasonal marketing opportunities in Q2 and Q4",
          "Mobile-first approach recommended for this audience"
        ],
        recommendations: [
          "Launch with freemium model to maximize user acquisition",
          "Focus on social media marketing for your target demographic",
          "Consider partnerships with complementary products",
          "Implement user feedback loop early in development"
        ]
      };
      
      setFeedback(mockFeedback);
      toast.success('AI analysis completed!');
    } catch (error) {
      toast.error('Failed to generate feedback');
    } finally {
      setLoadingFeedback(false);
    }
  };

  const updateFormData = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep === steps.length - 2) {
        generateFeedback();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const productData = {
      ...formData,
      score: feedback?.overallScore || 0,
      feedback,
      status: 'draft' as const
    };
    
    addProduct(productData);
    toast.success('Product created successfully!');
    onComplete(formData, feedback);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.name && formData.category && formData.description;
      case 1:
        return formData.targetAudience && formData.keyFeatures;
      case 2:
        return true; // Media step is optional
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <DetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <MediaStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ReviewStep
            formData={formData}
            feedback={feedback}
            loadingFeedback={loadingFeedback}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Header */}
      <Card>
        <div className="space-y-6">
          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
                    ${index < currentStep 
                      ? 'bg-green-500 text-white' 
                      : index === currentStep
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-gray-200 relative overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500"
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: index < currentStep ? '100%' : '0%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${((currentStep + 1) / steps.length) * 100}%`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </Card>

      {/* Form Content */}
      <Card className="min-h-[600px]">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Save className="w-4 h-4 mr-1" />
              {isAutoSaving ? 'Saving...' : 'Auto-saved'}
            </div>

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleComplete}
                disabled={!feedback}
                icon={<Star className="w-4 h-4" />}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Complete & Save
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                icon={<ChevronRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductForm;