import React from "react";
import { Deal } from "@/app/types/deal";
import DealCard from "./DealCard";

interface DealListProps {
  deals: Deal[];
  onShowNotification: (message: string) => void;
}

const DealList: React.FC<DealListProps> = ({ deals, onShowNotification }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} onShowNotification={onShowNotification} />
      ))}
    </div>
  );
};

export default DealList;
