import { Deal } from "@/app/types/deal";
import React from "react";
import DealCard from "./DealCard";

interface DealListProps {
  deals: Deal[];
  onEnroll: (dealId: string) => void;
}

const DealList: React.FC<DealListProps> = ({ deals, onEnroll }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} onEnroll={onEnroll} />
      ))}
    </div>
  );
};

export default DealList;
