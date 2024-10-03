import React, { ReactNode } from 'react';

interface CenteredCardProps {
  children: ReactNode;
}

const CenteredCard: React.FC<CenteredCardProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-secondary shadow-2xl rounded-lg overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CenteredCard;