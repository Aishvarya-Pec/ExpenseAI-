import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl'
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  animated = false
}) => {
  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden ${className} border border-yellow-400/20`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>

      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="w-4/5 h-4/5 text-black relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 6C8 5.44772 8.44772 5 9 5H23C23.5523 5 24 5.44772 24 6C24 6.55228 23.5523 7 23 7H10V14H20C20.5523 14 21 14.4477 21 15C21 15.5523 20.5523 16 20 16H10V24H23C23.5523 24 24 24.4477 24 25C24 25.5523 23.5523 26 23 26H9C8.44772 26 8 25.5523 8 25V6Z"
          fill="currentColor"
          strokeWidth="1"
        />
        <circle cx="26" cy="8" r="1.5" fill="currentColor" opacity="0.8" />
        <circle cx="26" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
        <circle cx="26" cy="22" r="1.5" fill="currentColor" opacity="0.8" />
        <path
          d="M24 7L26 8M24 15L26 15M24 24L26 22"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {animated && (
        <>
          <motion.div
            className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute bottom-1 left-1 w-1 h-1 bg-black rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.div
            className="absolute top-1/3 right-0 w-0.5 h-0.5 bg-black rounded-full"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          />
        </>
      )}
    </div>
  );

  const content = animated ? (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <LogoIcon />
    </motion.div>
  ) : (
    <LogoIcon />
  );

  return showText ? (
    <div className={`flex items-center space-x-3 ${className}`}>
      {content}
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          ExpenseAI
        </span>
        {(size === 'lg' || size === 'xl') && (
          <span className="text-xs text-gray-400 font-medium">
            Smart Finance
          </span>
        )}
      </div>
    </div>
  ) : (
    content
  );
};

export const LogoCircular: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  animated = false
}) => {
  const CircularIcon = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden ${className} border-2 border-yellow-400/30`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10 rounded-full"></div>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-3/5 h-3/5 text-black relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 5H17V7H9V11H15V13H9V17H17V19H7V5Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="19" cy="6" r="1" fill="currentColor" opacity="0.8" />
        <circle cx="19" cy="12" r="1" fill="currentColor" opacity="0.8" />
        <circle cx="19" cy="18" r="1" fill="currentColor" opacity="0.8" />
      </svg>

      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-black/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );

  const content = animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <CircularIcon />
    </motion.div>
  ) : (
    <CircularIcon />
  );

  return showText ? (
    <div className={`flex items-center space-x-3 ${className}`}>
      {content}
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          ExpenseAI
        </span>
        {(size === 'lg' || size === 'xl') && (
          <span className="text-xs text-gray-400 font-medium">
            Smart Finance
          </span>
        )}
      </div>
    </div>
  ) : (
    content
  );
};


