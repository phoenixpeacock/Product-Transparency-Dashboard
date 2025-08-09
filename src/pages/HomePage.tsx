import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, BarChart3, Users, Star, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Get instant, intelligent feedback on your product ideas with advanced machine learning.'
    },
    {
      icon: Target,
      title: 'Smart Multi-Step Form',
      description: 'Guided product creation process that captures all essential details efficiently.'
    },
    {
      icon: BarChart3,
      title: 'Market Insights',
      description: 'Understand your competitive landscape and market opportunities.'
    },
    {
      icon: Users,
      title: 'Audience Analysis',
      description: 'Identify and understand your target customers with precision.'
    }
  ];

  const benefits = [
    'Reduce product development risks',
    'Get to market faster',
    'Make data-driven decisions',
    'Optimize for success'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Producer <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Turn your product ideas into market-ready winners with AI-powered insights, 
              smart analysis, and actionable recommendations.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="text-lg px-8 py-4"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Get Started Free
              </Button>
              
              <button className="text-white/80 hover:text-white transition-colors underline">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need 
              to validate, refine, and launch successful products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                Why choose Producer AI?
              </h2>
              <ul className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-lg text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Success Rate</h3>
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">94%</div>
                <p className="text-purple-200">
                  Of products analyzed with Producer AI achieve better market performance
                </p>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-gray-900 mb-2">10x</div>
                <p className="text-gray-600 text-sm">Faster insights</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to transform your product ideas?
            </h2>
            <p className="text-xl text-purple-100 mb-12">
              Join thousands of successful producers who trust our AI-powered platform
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              variant="secondary"
              className="text-lg px-12 py-4 bg-white text-purple-600 hover:bg-gray-100"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Start Your Free Analysis
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;