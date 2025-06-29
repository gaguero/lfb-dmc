'use client';

/**
 * GlobalErrorHandlerProvider Component
 * Sets up global error handlers for unhandled errors and promise rejections
 * Should be placed at the root of the application
 */

import React, { ReactNode, useEffect } from 'react';
import { setupGlobalErrorHandlers } from '../services/errorLogging';

/**
 * Props for GlobalErrorHandlerProvider
 */
interface GlobalErrorHandlerProviderProps {
  /** Child components */
  children: ReactNode;
}

/**
 * GlobalErrorHandlerProvider Component
 * Initializes global error handling on mount
 */
const GlobalErrorHandlerProvider: React.FC<GlobalErrorHandlerProviderProps> = ({ children }) => {
  useEffect(() => {
    // Set up global error handlers only on the client side
    if (typeof window !== 'undefined') {
      setupGlobalErrorHandlers();
      
      // Log that global error handlers are active
      console.log('🛡️ Global error handlers initialized');
    }
    
    // Cleanup function (though global handlers typically stay active)
    return () => {
      // In a real application, you might want to remove event listeners
      // but for global error handling, we typically want them to stay active
    };
  }, []);

  return <>{children}</>;
};

export default GlobalErrorHandlerProvider; 