import * as yup from 'yup';

// Product form validation schema
export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters'),
    
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['technology', 'healthcare', 'education', 'entertainment', 'finance', 'lifestyle']),
    
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
    
  targetAudience: yup
    .string()
    .required('Target audience is required')
    .min(5, 'Target audience must be at least 5 characters'),
    
  keyFeatures: yup
    .string()
    .required('Key features are required')
    .min(10, 'Key features must be at least 10 characters'),
    
  pricing: yup
    .string()
    .required('Pricing model is required')
    .oneOf(['free', 'freemium', 'subscription', 'one-time']),
    
  competition: yup
    .string()
    .max(200, 'Competition field must be less than 200 characters'),
    
  marketingGoals: yup
    .string()
    .max(300, 'Marketing goals must be less than 300 characters'),
    
  timeline: yup
    .string()
    .oneOf(['1-month', '3-months', '6-months', '12-months'])
});

// Auth validation schemas
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
    
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
    
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
    
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
    
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

// Validation helper functions
export const validateField = async (schema: yup.AnySchema, field: string, value: any) => {
  try {
    await schema.validateAt(field, { [field]: value });
    return null;
  } catch (error) {
    return error instanceof yup.ValidationError ? error.message : 'Validation error';
  }
};

export const validateForm = async (schema: yup.AnySchema, data: any) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.reduce((acc, err) => {
        if (err.path) {
          acc[err.path] = err.message;
        }
        return acc;
      }, {} as Record<string, string>);
      
      return { isValid: false, errors };
    }
    
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};