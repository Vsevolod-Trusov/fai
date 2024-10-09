import axios from 'axios';

import { Deal } from '@/app/types/deal';
import { DEALS_ENDPOINTS } from '@/app/constants/api';

export const getDeals = async (): Promise<Deal[]> => {
    try {
        const response = await axios.get<Deal[]>(DEALS_ENDPOINTS.DEALS, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch deals');
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
        throw new Error('Failed to enroll in deal');
    }
};
