"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AbstractForm from '@/app/components/AbstractForm';
import { RegistrationFormData } from '@/app/types/auth';
import { FormikHelpers } from 'formik';
import { abstractFormValidationSchema } from '@/app/validation/abstractFormValidation';
import { signUp } from '@/app/services/authService';
import { AxiosError } from 'axios';
import Notification from '@/app/components/Notification';

interface BackendErrorResponse {
  message: string[];
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const initialValues: RegistrationFormData = {
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user',
  };

  const onSubmit = async (
    values: RegistrationFormData,
    actions: FormikHelpers<RegistrationFormData>
  ) => {
    try {
      await signUp(values);
      setNotificationMessage('Registration successful! Redirecting to dashboard...');
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        router.push('/auth/login');
      }, 1500);
    } catch (error) {
      actions.setSubmitting(false);

      if (error instanceof AxiosError && error.response?.data) {
        const errorData: BackendErrorResponse = error.response.data;

        if (Array.isArray(errorData.message)) {
          errorData.message.forEach((errorMessage) => {
            if (errorMessage.includes('email')) {
              actions.setFieldError('email', errorMessage);
            } else if (errorMessage.includes('password')) {
              actions.setFieldError('password', errorMessage);
            } else if (errorMessage.includes('phoneNumber')) {
              actions.setFieldError('phoneNumber', errorMessage);
            } else if (errorMessage.includes('role')) {
              actions.setFieldError('role', errorMessage);
            }
          });
        }
      } else {
        actions.setStatus({ generalError: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {showNotification && <Notification message={notificationMessage} />}
      <AbstractForm
        initialValues={initialValues}
        validationSchema={abstractFormValidationSchema}
        onSubmit={onSubmit}
        fields={[
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Password', type: 'password' },
          { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
          {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: [
              { label: 'User', value: 'user' },
              { label: 'Merchant', value: 'merchant' },
            ],
          },
        ]}
        submitButtonText="Register"
      />
    </div>
  );
};

export default RegisterPage;
