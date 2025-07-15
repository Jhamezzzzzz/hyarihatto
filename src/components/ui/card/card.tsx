// src/components/ui/card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-xl shadow-md bg-white p-4 dark:bg-gray-800 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`mt-2 ${className}`}>
    {children}
  </div>
);

