import React from 'react';
import { motion } from 'framer-motion';
import { 
  MoreHorizontal, 
  TrendingUp, 
  Calendar, 
  Tag,
  Star,
  Eye,
  Edit3
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Card from '../ui/Card';
import { useApp } from '../../contexts/AppContext';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  score?: number;
  status: 'draft' | 'active' | 'published';
  updatedAt: Date;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setCurrentProduct } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card hover className="group cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Tag className="w-3 h-3 mr-1" />
                {product.category}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>
          
          <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Score */}
        {product.score && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">AI Score</span>
            </div>
            <span className={`text-lg font-bold ${getScoreColor(product.score)}`}>
              {product.score}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDistanceToNow(product.updatedAt, { addSuffix: true })}
          </div>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setCurrentProduct(product)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors" title="Edit">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;