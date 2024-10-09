import React from "react";
import { Deal } from "@/app/types/deal";
import DealCard from "./DealCard";

interface DealListProps {
  deals: Deal[];
  onShowNotification: (message: string) => void;
  onDeleteDeal: (dealId: string) => void;
  isMerchant: boolean;
}

const DealList: React.FC<DealListProps> = ({
  deals,
  onShowNotification,
  onDeleteDeal,
  isMerchant,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          onShowNotification={onShowNotification}
          onDeleteDeal={onDeleteDeal}
          isMerchant={isMerchant}
        />
      ))}
    </div>
  );
};

export default DealList;
