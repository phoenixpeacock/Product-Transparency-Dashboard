import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Image, Target, Calendar, Camera } from 'lucide-react';
import Input from '../ui/Input';

interface MediaStepProps {
  formData: any;
  updateFormData: (field: string, value: string) => void;
}

const MediaStep: React.FC<MediaStepProps> = ({ formData, updateFormData }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
  };

  const timelineOptions = [
    { value: '', label: 'Select timeline' },
    { value: '1-month', label: '1 Month', color: 'bg-red-100 text-red-800' },
    { value: '3-months', label: '3 Months', color: 'bg-yellow-100 text-yellow-800' },
    { value: '6-months', label: '6 Months', color: 'bg-blue-100 text-blue-800' },
    { value: '12-months', label: '12 Months', color: 'bg-green-100 text-green-800' },
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
          className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Camera className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Media & Goals</h2>
        <p className="text-gray-600">Add visuals and define your marketing objectives</p>
      </div>

      <div className="grid gap-8">
        {/* File Upload Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                dragOver 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <motion.div
                animate={{ scale: dragOver ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Upload product images</p>
                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                <button className="mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                  Choose Files
                </button>
              </motion.div>
            </div>
            {uploadedImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 grid grid-cols-3 gap-2"
              >
                {uploadedImages.map((img, index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Upload documents</p>
              <p className="text-sm text-gray-400 mt-1">PDF, DOC up to 25MB each</p>
              <button className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                Choose Files
              </button>
            </div>
          </motion.div>
        </div>

        {/* Marketing Goals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Marketing Goals</label>
          <div className="relative">
            <Target className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              value={formData.marketingGoals}
              onChange={(e) => updateFormData('marketingGoals', e.target.value)}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="What are your marketing objectives? E.g., increase brand awareness, acquire new customers, enter new markets..."
            />
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Timeline</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={formData.timeline}
              onChange={(e) => updateFormData('timeline', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {formData.timeline && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                timelineOptions.find(t => t.value === formData.timeline)?.color || 'bg-gray-100 text-gray-800'
              }`}>
                {timelineOptions.find(t => t.value === formData.timeline)?.label} Project
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Upload className="w-5 h-5 text-teal-600 mr-2" />
          Media & Timeline Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-teal-200">
            <h4 className="font-medium text-gray-800">Timeline</h4>
            <p className="text-sm text-gray-600 mt-1">
              {timelineOptions.find(t => t.value === formData.timeline)?.label || 'Not selected'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-teal-200">
            <h4 className="font-medium text-gray-800">Goals</h4>
            <p className="text-sm text-gray-600 mt-1">
              {formData.marketingGoals ? 'Defined' : 'Not specified'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaStep;