'use client';

/**
 * ErrorBoundary Component
 * A comprehensive error boundary wrapper using react-error-boundary
 * Provides error logging, recovery mechanisms, and custom fallback UI
 */

import React, { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { createErrorLogger } from '../services/errorLogging';

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Name of this error boundary for logging purposes */
  name?: string;
  /** Custom fallback component */
  fallback?: React.ComponentType<any>;
  /** Custom error title */
  fallbackTitle?: string;
  /** Custom error message */
  fallbackMessage?: string;
  /** Whether to show technical details */
  showDetails?: boolean;
  /** Maximum retry attempts */
  maxRetries?: number;
  /** Custom reset handler */
  onReset?: () => void;
  /** Additional context for error logging */
  context?: Record<string, unknown>;
}

/**
 * ErrorBoundary Component
 * Wraps react-error-boundary with enhanced logging and customization
 */
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  name = 'ErrorBoundary',
  fallback,
  fallbackTitle,
  fallbackMessage,
  showDetails,
  maxRetries,
  onReset,
  context,
}) => {
  // Create error logger for this specific boundary
  const logError = createErrorLogger(name);

  /**
   * Handle error occurrence
   */
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log the error with context
    logError(error, errorInfo, context);
  };

  /**
   * Handle error boundary reset
   */
  const handleReset = () => {
    // Call custom reset handler if provided
    if (onReset) {
      onReset();
    }
    
    // Log recovery attempt
    console.log(`Error boundary "${name}" reset attempted`);
  };

  /**
   * Custom fallback component with props
   */
  const FallbackComponent = fallback || ((props: any) => (
    <ErrorFallback
      {...props}
      title={fallbackTitle}
      message={fallbackMessage}
      showDetails={showDetails}
      maxRetries={maxRetries}
    />
  ));

  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={handleError}
      onReset={handleReset}
      resetKeys={[name]} // Reset when name changes
    >
      {children}
    </ReactErrorBoundary>
  );
};

/**
 * Higher-Order Component for wrapping components with error boundaries
 * @param Component - Component to wrap
 * @param errorBoundaryProps - Props for the error boundary
 * @returns Wrapped component
 */
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...(props as P)} />
    </ErrorBoundary>
  ));

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

/**
 * Hook for programmatic error handling
 * Allows components to trigger error boundary from within
 */
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  // Throw error on next render if error is set
  if (error) {
    throw error;
  }

  // Return function to trigger error
  return (error: Error) => {
    setError(error);
  };
};

/**
 * Specialized Error Boundaries for different parts of the app
 */

/**
 * Layout Error Boundary - For wrapping the entire layout
 */
export const LayoutErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary
    name="LayoutErrorBoundary"
    fallbackTitle="Application Error"
    fallbackMessage="The application encountered an unexpected error. We're working to fix this issue."
    context={{ area: 'layout' }}
  >
    {children}
  </ErrorBoundary>
);

/**
 * Component Error Boundary - For wrapping individual components
 */
export const ComponentErrorBoundary: React.FC<{ 
  children: ReactNode;
  componentName: string;
}> = ({ children, componentName }) => (
  <ErrorBoundary
    name={`ComponentErrorBoundary_${componentName}`}
    fallbackTitle="Component Error"
    fallbackMessage="This component encountered an error, but the rest of the page should still work."
    context={{ area: 'component', componentName }}
    maxRetries={2}
  >
    {children}
  </ErrorBoundary>
);

/**
 * Route Error Boundary - For wrapping page routes
 */
export const RouteErrorBoundary: React.FC<{ 
  children: ReactNode;
  route: string;
}> = ({ children, route }) => (
  <ErrorBoundary
    name={`RouteErrorBoundary_${route}`}
    fallbackTitle="Page Error"
    fallbackMessage="This page encountered an error. You can try refreshing or navigate to another page."
    context={{ area: 'route', route }}
  >
    {children}
  </ErrorBoundary>
);

/**
 * Feature Error Boundary - For wrapping specific features
 */
export const FeatureErrorBoundary: React.FC<{ 
  children: ReactNode;
  featureName: string;
}> = ({ children, featureName }) => (
  <ErrorBoundary
    name={`FeatureErrorBoundary_${featureName}`}
    fallbackTitle="Feature Unavailable"
    fallbackMessage="This feature is temporarily unavailable due to an error. The rest of the application should continue to work normally."
    context={{ area: 'feature', featureName }}
    maxRetries={1}
  >
    {children}
  </ErrorBoundary>
);

export default ErrorBoundary; 