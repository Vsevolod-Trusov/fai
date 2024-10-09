import axios from "axios";

import { DEALS_ENDPOINTS } from "@/app/constants/api";
import { Deal } from "@/app/types/deal";
import { IDeal } from "@/components";

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const response = await axios.get<Deal[]>(DEALS_ENDPOINTS.DEALS, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch deals");
  }
};

export const enrollInDealWithEmail = async (
    email: string,
    dealId: string,
    dealTitle: string,
    dealDescription: string
  ): Promise<void> => {
    await axios.post(`${DEALS_ENDPOINTS.ENROLL}`, {
      email,
      dealId,
      dealTitle,
      dealDescription,
    }, {
      withCredentials: true,
    });
};
