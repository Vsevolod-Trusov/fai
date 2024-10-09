import { Deal } from "@/app/types/deal";
import React from "react";

interface DealCardProps {
  deal: Deal;
  onEnroll: (dealId: string) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onEnroll }) => {
  let dealDate: string;

  if (deal.date instanceof Date) {
    dealDate = deal.date.toLocaleDateString();
  } else if (deal.date && typeof deal.date === 'object' && '_seconds' in deal.date) {
    const { _seconds } = deal.date as { _seconds: number; _nanoseconds: number };
    dealDate = new Date(_seconds * 1000).toLocaleDateString();
  } else {
    dealDate = "Invalid Date";
  }

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-md w-full max-w-md">
      <h3 className="text-xl font-bold mb-2">{deal?.title || "EMPTY"}</h3>
      <p className="text-gray-700 mb-2">
        Description: {deal?.description || "EMPTY"}
      </p>
      <p className="text-gray-600 mb-2">Status: {deal?.status || "EMPTY"}</p>
      <p className="text-gray-600 mb-2">Date: {dealDate}</p>
      <button
        onClick={() => onEnroll(deal.id)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Enroll
      </button>
    </div>
  );
};

export default DealCard;
