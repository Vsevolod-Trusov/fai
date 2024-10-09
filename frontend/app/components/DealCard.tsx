import { enrollInDealWithEmail, deleteDeal } from "@/app/services/dealService";
import { Deal } from "@/app/types/deal";
import { auth } from "@/lib/firebase";
import { FC, useContext } from "react";
import { UpdateDealContext } from "../dashboard/context";

interface DealCardProps {
  deal: Deal;
  onShowNotification: (message: string) => void;
  onDeleteDeal: (dealId: string) => void;
  isMerchant: boolean;
}

const DealCard: FC<DealCardProps> = ({
  deal,
  onShowNotification,
  onDeleteDeal,
  isMerchant,
}) => {
  let dealDate: string;
  const { selectDeal } = useContext(UpdateDealContext);

  if (deal.date instanceof Date) {
    dealDate = deal.date.toLocaleDateString();
  } else if (
    deal.date &&
    typeof deal.date === "object" &&
    "_seconds" in deal.date
  ) {
    const { _seconds } = deal.date as {
      _seconds: number;
      _nanoseconds: number;
    };
    dealDate = new Date(_seconds * 1000).toLocaleDateString();
  } else {
    dealDate = "Invalid Date";
  }

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

  const handleDiscontinue = async () => {
    try {
      await deleteDeal(deal.id);
      onShowNotification("Deal discontinued successfully.");
      onDeleteDeal(deal.id);
    } catch (error) {
      console.error("Failed to discontinue the deal:", error);
      onShowNotification("Failed to discontinue the deal. Please try again.");
    }
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-md w-full max-w-md">
      <h3 className="text-xl font-bold mb-2">{deal?.title || "EMPTY"}</h3>
      <p className="text-gray-700 mb-2">
        Description: {deal?.description || "EMPTY"}
      </p>
      <p className="text-gray-600 mb-2">Status: {deal?.status || "EMPTY"}</p>
      <p className="text-gray-600 mb-2">Date: {dealDate}</p>
      <div className="flex justify-between">
        <button
          onClick={handleEnroll}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Enroll
        </button>
        {isMerchant && (
          <>
            <button
              onClick={() => {
                selectDeal({
                  id: deal.id,
                  initialValues: {
                    id: deal.id,
                    title: deal.title,
                    description: deal.description,
                  },
                });
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={handleDiscontinue}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Discontinue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DealCard;
