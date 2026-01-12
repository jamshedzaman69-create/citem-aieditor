import React, { useState, useEffect } from 'react';

const messages = [
  'Finding studies',
  'Checking accessibility',
  'Understanding nuance',
  'Supporting user claims',
  'Cross referencing studies',
  'Checking results',
  'Generating citation',
  'Formatting citation',
  'Nearly ready'
];

export default function LoadingMessage() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      <p className="text-purple-400 animate-pulse">
        {messages[messageIndex]}...
      </p>
    </div>
  );
}