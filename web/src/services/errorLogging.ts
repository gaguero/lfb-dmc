/**
 * Error Logging Service
 * Provides centralized error logging for the application
 * Handles both development and production error tracking
 */

import { ErrorInfo } from 'react';

/**
 * Interface for error context information
 */
export interface ErrorContext {
  /** Component stack trace */
  componentStack?: string;
  /** Error boundary name */
  errorBoundary?: string;
  /** Additional context information */
  context?: Record<string, unknown>;
  /** User agent information */
  userAgent?: string;
  /** URL where error occurred */
  url?: string;
  /** Timestamp of error */
  timestamp?: string;
}

/**
 * Enhanced error information combining Error and React ErrorInfo
 */
export interface EnhancedErrorInfo extends ErrorContext {
  /** Original error object */
  error: Error;
  /** React error info */
  errorInfo?: ErrorInfo;
}

/**
 * Log error to console in development environment
 * @param error - The error object
 * @param context - Additional error context
 */
const logToDevelopment = (error: Error, context: ErrorContext) => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🚨 Error Boundary Caught an Error');
    console.error('Error:', error);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    if (context.componentStack) {
      console.error('Component Stack:', context.componentStack);
    }
    
    if (context.errorBoundary) {
      console.error('Error Boundary:', context.errorBoundary);
    }
    
    if (context.context) {
      console.error('Additional Context:', context.context);
    }
    
    console.error('URL:', context.url || window.location.href);
    console.error('User Agent:', context.userAgent || navigator.userAgent);
    console.error('Timestamp:', context.timestamp || new Date().toISOString());
    console.groupEnd();
  }
};

/**
 * Log error to production error tracking service
 * In a real application, this would integrate with services like Sentry, LogRocket, etc.
 * @param error - The error object
 * @param context - Additional error context
 */
const logToProduction = (error: Error, context: ErrorContext) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, you would send to an error tracking service
    // Example with Sentry:
    // Sentry.captureException(error, {
    //   tags: {
    //     errorBoundary: context.errorBoundary,
    //   },
    //   extra: {
    //     componentStack: context.componentStack,
    //     context: context.context,
    //     url: context.url,
    //     userAgent: context.userAgent,
    //     timestamp: context.timestamp,
    //   },
    // });
    
    // For now, we'll use a structured console.error that can be captured by log aggregators
    console.error('PRODUCTION_ERROR', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...context,
    });
  }
};

/**
 * Main error logging function
 * Logs errors appropriately based on environment
 * @param error - The error object
 * @param errorInfo - React error info (optional)
 * @param context - Additional context (optional)
 */
export const logError = (
  error: Error, 
  errorInfo?: ErrorInfo, 
  context: Partial<ErrorContext> = {}
): void => {
  const enhancedContext: ErrorContext = {
    componentStack: errorInfo?.componentStack ?? undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
    timestamp: new Date().toISOString(),
    ...context,
  };

  // Log to development console
  logToDevelopment(error, enhancedContext);
  
  // Log to production service
  logToProduction(error, enhancedContext);
};

/**
 * Track error for analytics
 * @param error - The error object
 * @param context - Additional context
 */
export const trackError = (error: Error, context: Partial<ErrorContext> = {}): void => {
  // This would integrate with your analytics service
  // For now, we'll log it for tracking purposes
  const gtag = (window as Window & typeof globalThis & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof window !== 'undefined' && typeof gtag === 'function') {
    gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      error_boundary: context.errorBoundary || 'unknown',
    });
  }
  
  // Could also integrate with other analytics services
  console.log('Error tracked for analytics:', {
    message: error.message,
    errorBoundary: context.errorBoundary,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Create a standardized error logging function for specific error boundaries
 * @param errorBoundaryName - Name of the error boundary
 * @returns A configured error logging function
 */
export const createErrorLogger = (errorBoundaryName: string) => {
  return (error: Error, errorInfo?: ErrorInfo, additionalContext?: Record<string, unknown>) => {
    logError(error, errorInfo, {
      errorBoundary: errorBoundaryName,
      context: additionalContext,
    });
    
    trackError(error, {
      errorBoundary: errorBoundaryName,
      context: additionalContext,
    });
  };
};

/**
 * Global error handlers for unhandled errors and promise rejections
 */
export const setupGlobalErrorHandlers = (): void => {
  // Handle unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), undefined, {
      errorBoundary: 'GlobalErrorHandler',
      context: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    logError(error, undefined, {
      errorBoundary: 'GlobalPromiseRejectionHandler',
      context: {
        type: 'unhandledrejection',
        reason: event.reason,
      },
    });
  });
}; 