"use client";

import React from 'react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50">
      <div className="bg-teal-600 text-white px-4 py-2 mt-4 rounded shadow-md animate-slide-down">
        {message}
      </div>
    </div>
  );
};

export default Notification;