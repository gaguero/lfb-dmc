'use client';

/**
 * ErrorFallback Component
 * Displays a user-friendly error message when an error boundary catches an error
 * Includes retry functionality and accessibility features
 */

import React, { useState, useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { RefreshCw, AlertTriangle, Home, MessageCircle } from 'lucide-react';

/**
 * Props for the ErrorFallback component
 */
interface ErrorFallbackProps extends FallbackProps {
  /** Optional custom title for the error */
  title?: string;
  /** Optional custom message for the error */
  message?: string;
  /** Whether to show technical error details */
  showDetails?: boolean;
  /** Maximum number of retry attempts */
  maxRetries?: number;
}

/**
 * ErrorFallback Component
 * Provides a comprehensive error fallback UI with retry functionality
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  title = "Oops! Something went wrong",
  message = "We&apos;re sorry, but something unexpected happened. Please try again or contact support if the problem persists.",
  showDetails = process.env.NODE_ENV === 'development',
  maxRetries = 3
}) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Reset retry count when error changes
  useEffect(() => {
    setRetryCount(0);
  }, [error.message]);

  /**
   * Handle retry attempt
   */
  const handleRetry = async () => {
    if (retryCount >= maxRetries) {
      return;
    }

    setIsRetrying(true);
    setRetryCount(prevCount => prevCount + 1);

    // Add a small delay to show loading state
    setTimeout(() => {
      setIsRetrying(false);
      resetErrorBoundary();
    }, 1000);
  };

  /**
   * Handle page refresh
   */
  const handleRefresh = () => {
    window.location.reload();
  };

  /**
   * Handle go to home
   */
  const handleGoHome = () => {
    window.location.href = '/';
  };

  /**
   * Handle contact support (opens WhatsApp)
   */
  const handleContactSupport = () => {
    const whatsappMessage = encodeURIComponent(
      `Hi! I encountered an error on your website: ${error.message}. Could you please help?`
    );
    window.open(`https://wa.me/50769545262?text=${whatsappMessage}`, '_blank');
  };

  // If max retries exceeded, show different UI
  if (retryCount >= maxRetries) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral-pink/10 to-ocean-blue/10 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-deep-cacao mb-4">
            We&apos;re having trouble recovering
          </h2>
          
          <p className="text-driftwood-brown mb-8">
            We&apos;ve tried to fix this several times but the problem persists. 
            Please refresh the page or contact our support team.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleRefresh}
              className="w-full bg-ocean-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-ocean-blue/90 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full bg-coral-pink text-white py-3 px-6 rounded-xl font-semibold hover:bg-coral-pink/90 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </button>
            
            <button
              onClick={handleContactSupport}
              className="w-full border-2 border-ocean-blue text-ocean-blue py-3 px-6 rounded-xl font-semibold hover:bg-ocean-blue hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </button>
          </div>
          
          {showDetails && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-driftwood-brown hover:text-deep-cacao">
                Technical Details
              </summary>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs font-mono text-gray-700 overflow-auto max-h-32">
                <div><strong>Error:</strong> {error.name}</div>
                <div><strong>Message:</strong> {error.message}</div>
                {error.stack && (
                  <div><strong>Stack:</strong> <pre className="whitespace-pre-wrap">{error.stack}</pre></div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }

  // Normal error fallback UI with retry option
  return (
    <div 
      role="alert" 
      aria-live="assertive"
      className="min-h-screen bg-gradient-to-br from-coral-pink/10 to-ocean-blue/10 flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-coral-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-coral-pink" />
        </div>
        
        <h2 className="text-2xl font-bold text-deep-cacao mb-4">
          {title}
        </h2>
        
        <p className="text-driftwood-brown mb-8">
          {message}
        </p>
        
        {retryCount > 0 && (
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Retry attempt {retryCount} of {maxRetries}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full bg-coral-pink text-white py-3 px-6 rounded-xl font-semibold hover:bg-coral-pink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full border-2 border-ocean-blue text-ocean-blue py-3 px-6 rounded-xl font-semibold hover:bg-ocean-blue hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </button>
        </div>
        
        {showDetails && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-driftwood-brown hover:text-deep-cacao">
              Technical Details
            </summary>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs font-mono text-gray-700 overflow-auto max-h-32">
              <div><strong>Error:</strong> {error.name}</div>
              <div><strong>Message:</strong> {error.message}</div>
              {error.stack && (
                <div><strong>Stack:</strong> <pre className="whitespace-pre-wrap">{error.stack}</pre></div>
              )}
            </div>
          </details>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-driftwood-brown">
            Need help? 
            <button
              onClick={handleContactSupport}
              className="ml-2 text-ocean-blue hover:underline"
            >
              Contact our support team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback; 