"use client";

import DealList from "@/app/components/DealList";
import Notification from "@/app/components/Notification";
import { enrollInDeal, getDeals } from "@/app/services/dealService";
import { Deal } from "@/app/types/deal";
import React, { useEffect, useState } from "react";

const DashboardPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const fetchedDeals = await getDeals();
        console.log(fetchDeals);
        setDeals(fetchedDeals);
      } catch (error) {
        console.log(error);
        setNotificationMessage(
          "Failed to fetch deals. Please try again later."
        );
        setShowNotification(true);
      }
    };

    fetchDeals();
  }, []);

  const handleEnroll = async (dealId: string) => {
    try {
      await enrollInDeal(dealId);
      setNotificationMessage("Successfully enrolled in the deal!");
      setShowNotification(true);
    } catch (error) {
      console.log(error);
      setNotificationMessage("Failed to enroll in the deal. Please try again.");
      setShowNotification(true);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {showNotification && <Notification message={notificationMessage} />}
      <h1 className="text-3xl font-bold mb-8">Available Deals</h1>
      <DealList deals={deals} onEnroll={handleEnroll} />
    </div>
  );
};

export default DashboardPage;
