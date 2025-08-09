import React from 'react';
import { motion } from 'framer-motion';
import { Package, Tag, FileText, Sparkles } from 'lucide-react';
import Input from '../ui/Input';

interface BasicInfoStepProps {
  formData: any;
  updateFormData: (field: string, value: string) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, updateFormData }) => {
  const categories = [
    { value: '', label: 'Select category' },
    { value: 'technology', label: 'Technology', color: 'bg-blue-100 text-blue-800' },
    { value: 'healthcare', label: 'Healthcare', color: 'bg-green-100 text-green-800' },
    { value: 'education', label: 'Education', color: 'bg-purple-100 text-purple-800' },
    { value: 'entertainment', label: 'Entertainment', color: 'bg-pink-100 text-pink-800' },
    { value: 'finance', label: 'Finance', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'lifestyle', label: 'Lifestyle', color: 'bg-indigo-100 text-indigo-800' },
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
          className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Let's start with the fundamentals of your product</p>
      </div>

      <div className="grid gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            label="Product Name"
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Enter your product name"
            icon={<Package className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          {formData.category && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                categories.find(c => c.value === formData.category)?.color || 'bg-gray-100 text-gray-800'
              }`}>
                {categories.find(c => c.value === formData.category)?.label}
              </span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Describe your product in detail..."
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">Tell us what makes your product special</p>
            <span className={`text-sm ${
              formData.description.length > 100 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {formData.description.length}/500
            </span>
          </div>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Completion Progress</span>
          <span className="text-sm text-purple-600 font-semibold">
            {[formData.name, formData.category, formData.description].filter(Boolean).length}/3
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${([formData.name, formData.category, formData.description].filter(Boolean).length / 3) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BasicInfoStep;