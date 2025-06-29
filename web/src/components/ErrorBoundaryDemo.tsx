'use client';

/**
 * ErrorBoundaryDemo Component
 * A development utility component for testing error boundaries
 * This component provides buttons to trigger different types of errors
 * Only visible in development mode
 */

import React, { useState } from 'react';
import { useErrorHandler } from './ErrorBoundary';

const ErrorBoundaryDemo: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const throwError = useErrorHandler();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const triggerRenderError = () => {
    throw new Error('Test render error - This is intentional for testing error boundaries');
  };

  const triggerAsyncError = async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    throw new Error('Test async error - This is intentional for testing error boundaries');
  };

  const triggerPromiseRejection = () => {
    Promise.reject(new Error('Test promise rejection - This is intentional for testing global error handlers'));
  };

  const triggerEventHandlerError = () => {
    throwError(new Error('Test event handler error - This is intentional for testing error boundaries'));
  };

  const triggerTypeError = () => {
    // @ts-expect-error - Intentionally trigger a TypeError
    const obj: { property?: { that?: { does?: { not?: { exist: string } } } } } = null;
    console.log(obj.property?.that?.does?.not?.exist);
  };

  const triggerNetworkError = async () => {
    try {
      await fetch('/api/nonexistent-endpoint', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      });
    } catch {
      throwError(new Error('Test network error - This is intentional for testing error boundaries'));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-100 border-2 border-red-300 rounded-lg p-4 max-w-sm">
      <div className="text-sm font-semibold text-red-800 mb-3">
        🧪 Error Boundary Testing (Dev Only)
      </div>
      
      <div className="space-y-2">
        <button
          onClick={triggerRenderError}
          className="w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
        >
          Trigger Render Error
        </button>
        
        <button
          onClick={triggerAsyncError}
          className="w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
        >
          Trigger Async Error
        </button>
        
        <button
          onClick={triggerPromiseRejection}
          className="w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
        >
          Trigger Promise Rejection
        </button>
        
        <button
          onClick={triggerEventHandlerError}
          className="w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
        >
          Trigger Event Handler Error
        </button>
        
        <button
          onClick={triggerTypeError}
          className="w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
        >
          Trigger Type Error
        </button>
        
        <button
          onClick={triggerNetworkError}
          className="w-full text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
        >
          Trigger Network Error
        </button>
        
        <div className="text-xs text-red-700 mt-2">
          Counter: {counter}
          <button
            onClick={() => setCounter(c => c + 1)}
            className="ml-2 bg-red-200 px-2 py-1 rounded text-red-800 hover:bg-red-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryDemo; 