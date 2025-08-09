import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, DollarSign, Target, Zap } from 'lucide-react';
import Input from '../ui/Input';

interface DetailsStepProps {
  formData: any;
  updateFormData: (field: string, value: string) => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ formData, updateFormData }) => {
  const pricingOptions = [
    { value: '', label: 'Select pricing model' },
    { value: 'free', label: 'Free', description: 'No cost to users' },
    { value: 'freemium', label: 'Freemium', description: 'Free basic, paid premium' },
    { value: 'subscription', label: 'Subscription', description: 'Recurring payments' },
    { value: 'one-time', label: 'One-time Purchase', description: 'Single payment' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Target className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Product Details</h2>
        <p className="text-gray-600">Define your audience, features, and competitive landscape</p>
      </div>

      <div className="grid gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            label="Target Audience"
            type="text"
            value={formData.targetAudience}
            onChange={(e) => updateFormData('targetAudience', e.target.value)}
            placeholder="Who is your primary audience?"
            icon={<Users className="w-5 h-5" />}
          />
          <p className="mt-1 text-sm text-gray-500">
            Be specific: age range, profession, interests, etc.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
          <div className="relative">
            <Star className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              value={formData.keyFeatures}
              onChange={(e) => updateFormData('keyFeatures', e.target.value)}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="List your main features, benefits, and unique selling points..."
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Model</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.pricing}
                onChange={(e) => updateFormData('pricing', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                {pricingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {formData.pricing && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-gray-600"
              >
                {pricingOptions.find(opt => opt.value === formData.pricing)?.description}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Input
              label="Main Competitors"
              type="text"
              value={formData.competition}
              onChange={(e) => updateFormData('competition', e.target.value)}
              placeholder="List key competitors"
              icon={<Zap className="w-5 h-5" />}
            />
          </motion.div>
        </div>
      </div>

      {/* Interactive Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="w-5 h-5 text-indigo-600 mr-2" />
          Market Position Preview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <h4 className="font-medium text-gray-800">Audience</h4>
            <p className="text-sm text-gray-600 mt-1">
              {formData.targetAudience || 'Not specified'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <h4 className="font-medium text-gray-800">Pricing</h4>
            <p className="text-sm text-gray-600 mt-1">
              {pricingOptions.find(opt => opt.value === formData.pricing)?.label || 'Not selected'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <h4 className="font-medium text-gray-800">Competition</h4>
            <p className="text-sm text-gray-600 mt-1">
              {formData.competition || 'Not specified'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailsStep;