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

export const enrollInDeal = async (dealId: string): Promise<void> => {
  try {
    await axios.post(
      `${DEALS_ENDPOINTS.ENROLL}/${dealId}`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to enroll in deal");
  }
};

export const createDeal = async (dealData: IDeal): Promise<void> => {
  try {
    await axios.post(`${DEALS_ENDPOINTS.CREATE}`, dealData, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to enroll in deal");
  }
};

export const updateDeal = async (dealData: IDeal): Promise<void> => {
  try {
    console.log(dealData);
    await axios.put(`${DEALS_ENDPOINTS.UPDATE}?id=${dealData.id}`, dealData, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to enroll in deal");
  }
};
