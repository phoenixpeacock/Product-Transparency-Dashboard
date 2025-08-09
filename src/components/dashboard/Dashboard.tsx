import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  TrendingUp, 
  BarChart3, 
  Star, 
  FileText,
  Activity,
  Calendar,
  Users
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProductCard from './ProductCard';
import Header from './Header';

interface DashboardProps {
  onNewProduct: () => void;
  onViewHistory: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNewProduct, onViewHistory }) => {
  const { products } = useApp();
  const [filter, setFilter] = useState<'all' | 'draft' | 'active' | 'published'>('all');

  const stats = {
    total: products.length,
    avgScore: products.length ? Math.round(products.reduce((acc, p) => acc + (p.score || 0), 0) / products.length) : 0,
    published: products.filter(p => p.status === 'published').length,
    thisMonth: products.filter(p => {
      const now = new Date();
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      return p.createdAt > monthAgo;
    }).length
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.status === filter);

  const statsCards = [
    {
      title: 'Total Products',
      value: stats.total,
      icon: FileText,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Average Score',
      value: stats.avgScore,
      icon: TrendingUp,
      color: 'green',
      change: '+5.2%'
    },
    {
      title: 'Published',
      value: stats.published,
      icon: Star,
      color: 'purple',
      change: '+8%'
    },
    {
      title: 'This Month',
      value: stats.thisMonth,
      icon: Calendar,
      color: 'orange',
      change: '+15%'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewProduct={onNewProduct} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your products</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={onViewHistory}
                variant="outline"
                icon={<Activity className="w-4 h-4" />}
              >
                View Activity
              </Button>
              <Button
                onClick={onNewProduct}
                icon={<PlusCircle className="w-4 h-4" />}
              >
                New Product
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card hover className="relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-50 to-transparent opacity-50`}></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Section */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
            <div className="flex items-center space-x-2">
              {(['all', 'draft', 'active', 'published'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first product</p>
              <Button onClick={onNewProduct} icon={<PlusCircle className="w-4 h-4" />}>
                Create Product
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;