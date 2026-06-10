'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'white' | 'blue' | 'green' | 'orange' | 'purple';
}

const colorMap = {
  white: 'bg-white',
  blue: 'bg-blue-50',
  green: 'bg-green-50',
  orange: 'bg-orange-50',
  purple: 'bg-purple-50',
};

export default function Card({ children, className = '', color = 'white' }: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-sm border border-gray-100 p-4 ${colorMap[color]} ${className}`}
    >
      {children}
    </div>
  );
}
