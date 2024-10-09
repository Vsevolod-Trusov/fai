import { Deal } from "@/app/types/deal";
import React from "react";
import { enrollInDealWithEmail } from "@/app/services/dealService";
import { auth } from "@/lib/firebase";

interface DealCardProps {
  deal: Deal;
  onShowNotification: (message: string) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onShowNotification }) => {
  const handleEnroll = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        onShowNotification("You need to be logged in to enroll in a deal.");
        return;
      }

      const email = user.email;

      if (!email) {
        onShowNotification("Failed to retrieve user email. Please try again.");
        return;
      }

      await enrollInDealWithEmail(email, deal.id, deal.title, deal.description);

      onShowNotification("Successfully enrolled in the deal!");
    } catch (error) {
      console.error("Failed to enroll in the deal:", error);
      onShowNotification("Failed to enroll in the deal. Please try again.");
    }
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-md w-full max-w-md">
      <h3 className="text-xl font-bold mb-2">{deal?.title || "EMPTY"}</h3>
      <p className="text-gray-700 mb-2">
        Description: {deal?.description || "EMPTY"}
      </p>
      <p className="text-gray-600 mb-2">Status: {deal?.status || "EMPTY"}</p>
      <button
        onClick={handleEnroll}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Enroll
      </button>
    </div>
  );
};

export default DealCard;
