"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAuthTokenId } from "@/app/utils/cookie";
import DealList from "@/app/components/DealList";
import Notification from "@/app/components/Notification";
import { getDeals } from "@/app/services/dealService";
import { Deal } from "@/app/types/deal";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  useEffect(() => {
    const tokenId = getAuthTokenId();

    if (!tokenId) {
      setNotificationMessage('Session expired. Please log in again.');
      setShowNotification(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
      return;
    }

    const fetchDeals = async () => {
      try {
        const fetchedDeals = await getDeals();
        setDeals(fetchedDeals);
      } catch (error) {
        console.error('Failed to fetch deals:', error);
        setNotificationMessage('Failed to fetch deals. Please try again later.');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    };

    fetchDeals();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {showNotification && <Notification message={notificationMessage} />}
      <h1 className="text-3xl font-bold mb-8">Available Deals</h1>
      <DealList deals={deals} onShowNotification={(message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }} />
    </div>
  );
};

export default DashboardPage;
