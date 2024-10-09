import axios, { AxiosError } from "axios";

import { AUTH_ENDPOINTS } from "@/app/constants/api";
import {
  SignUpData,
  SignUpResponse,
} from "@/app/types/auth";

export const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<SignUpResponse>(
      AUTH_ENDPOINTS.SIGN_UP,
      data,
      {
        withCredentials: true,
      }
    );
    const { uid } = response.data;

    if (!uid) {
      throw new Error("Token is undefined. Please verify server response.");
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

