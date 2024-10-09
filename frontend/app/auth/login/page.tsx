"use client";

import React, { useState } from "react";
import AbstractForm from "@/app/components/AbstractForm";
import Notification from "@/app/components/Notification";
import { LoginFormData } from "@/app/types/auth";
import { setAuthTokenId } from "@/app/utils/cookie";
import { loginValidationSchema } from "@/app/validation/loginValidation";
import { auth } from "@/lib/firebase";
import { AxiosError } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

interface BackendErrorResponse {
  message: string[];
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const initialValues: LoginFormData = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const tokenId = await user.getIdToken();
      if (!tokenId) {
        alert("token is wrong");
        return;
      }
      setAuthTokenId(tokenId);
      setNotificationMessage("Login successful! Redirecting to dashboard...");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      actions.setSubmitting(false);

      if (error instanceof AxiosError && error.response?.data) {
        const errorData: BackendErrorResponse = error.response.data;

        if (Array.isArray(errorData.message)) {
          errorData.message.forEach((errorMessage) => {
            if (errorMessage.includes("email")) {
              actions.setFieldError("email", errorMessage);
            } else if (errorMessage.includes("password")) {
              actions.setFieldError("password", errorMessage);
            }
          });
        }
      } else {
        console.log(error);
        actions.setStatus({ generalError: "Login failed. Please try again." });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {showNotification && <Notification message={notificationMessage} />}
      <AbstractForm
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={onSubmit}
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
        ]}
        submitButtonText="Sign In"
      />
    </div>
  );
};

export default LoginPage;
