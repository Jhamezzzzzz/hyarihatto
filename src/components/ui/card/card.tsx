// src/components/ui/card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-xl shadow-md bg-white dark:bg-gray-800 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = ""}: CardProps) => (
  <div className={`${className} border-b-1 p-4`}>
    {children}
  </div>
)

export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`mt-2 ${className} p-4`}>
    {children}
  </div>
);

