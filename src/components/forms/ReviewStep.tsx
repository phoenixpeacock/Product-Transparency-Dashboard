import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Lightbulb, 
  BarChart3, 
  Star, 
  CheckCircle,
  AlertCircle,
  Target,
  Sparkles
} from 'lucide-react';

interface ReviewStepProps {
  formData: any;
  feedback: any;
  loadingFeedback: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, feedback, loadingFeedback }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 80) return 'from-blue-500 to-cyan-500';
    if (score >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

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
          className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Star className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Analysis & Review</h2>
        <p className="text-gray-600">Get intelligent insights about your product</p>
      </div>

      {/* Product Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          Product Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Basic Info</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.name || 'Not specified'}</span></p>
              <p><span className="text-gray-600">Category:</span> <span className="font-medium">{formData.category || 'Not specified'}</span></p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Market Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">Audience:</span> <span className="font-medium">{formData.targetAudience || 'Not specified'}</span></p>
              <p><span className="text-gray-600">Pricing:</span> <span className="font-medium">{formData.pricing || 'Not specified'}</span></p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Timeline</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">Duration:</span> <span className="font-medium">{formData.timeline || 'Not specified'}</span></p>
              <p><span className="text-gray-600">Competition:</span> <span className="font-medium">{formData.competition || 'Not specified'}</span></p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border-2 border-purple-200 rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            animate={{ rotate: loadingFeedback ? 360 : 0 }}
            transition={{ repeat: loadingFeedback ? Infinity : 0, duration: 2 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center"
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">AI Analysis</h3>
            <p className="text-gray-600">Powered by advanced machine learning</p>
          </div>
        </div>

        {loadingFeedback ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"
            />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-800">Analyzing your product...</p>
              <p className="text-gray-600">This may take a few moments</p>
            </div>
            <div className="flex justify-center space-x-1 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ) : feedback ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Overall Score */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`bg-gradient-to-r ${getScoreColor(feedback.overallScore)} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <span className="text-3xl font-bold text-white">{feedback.overallScore}</span>
              </motion.div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                {getScoreLabel(feedback.overallScore)}
              </h4>
              <p className="text-gray-600">Overall Product Score</p>
            </div>

            {/* Feedback Sections */}
            <div className="grid gap-8">
              {/* Strengths */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6"
              >
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                  <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
                  Strengths
                </h4>
                <ul className="space-y-3">
                  {feedback.strengths.map((strength: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Improvements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6"
              >
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                  <Lightbulb className="w-6 h-6 text-orange-500 mr-3" />
                  Improvement Suggestions
                </h4>
                <ul className="space-y-3">
                  {feedback.improvements.map((improvement: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{improvement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Market Insights */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6"
              >
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                  <BarChart3 className="w-6 h-6 text-blue-500 mr-3" />
                  Market Insights
                </h4>
                <ul className="space-y-3">
                  {feedback.marketInsights.map((insight: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{insight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Recommendations */}
              {feedback.recommendations && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6"
                >
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                    <Sparkles className="w-6 h-6 text-purple-500 mr-3" />
                    AI Recommendations
                  </h4>
                  <ul className="space-y-3">
                    {feedback.recommendations.map((recommendation: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{recommendation}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Complete all steps to receive AI feedback</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ReviewStep;