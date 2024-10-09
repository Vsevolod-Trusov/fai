"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, FC } from "react";

import DealList from "@/app/components/DealList";
import Notification from "@/app/components/Notification";
import { getDeals, createDeal, updateDeal } from "@/app/services/dealService";
import { Deal } from "@/app/types/deal";
import { getAuthTokenId } from "@/app/utils/cookie";
import { dealInitialValues } from "@/app/components/DealForm/constants";
import AbstractForm from "../components/AbstractForm";
import {
  dealUpdateValidationSchema,
  dealValidationSchema,
} from "../validation/dealFormValidation";
import { UpdateDealContext } from "./context";
import { ICurrentDeal } from "./types";
import { auth } from "@/lib/firebase";

const DashboardPage: FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [currentDeal, setCurrentDeal] = useState<ICurrentDeal>({
    id: "",
    initialValues: dealInitialValues,
  });
  const [isMerchant, setIsMerchant] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const tokenId = getAuthTokenId();

    if (!tokenId) {
      setNotificationMessage("Session expired. Please log in again.");
      setShowNotification(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
      return;
    }

    // Проверка роли пользователя
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const role = idTokenResult.claims.role;

        if (role === "merchant") {
          setIsMerchant(true);
        }
      }
    });

    const fetchDeals = async () => {
      try {
        const fetchedDeals = await getDeals();
        setDeals(fetchedDeals);
      } catch (error) {
        console.error("Failed to fetch deals:", error);
        setNotificationMessage(
          "Failed to fetch deals. Please try again later."
        );
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    };

    fetchDeals();
  }, [router]);

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter((deal) => deal.id !== dealId));
  };

  return (
    <div className="flex min-h-screen p-4 bg-gray-100">
      {isMerchant && (
        <div className="relative [flex:_1_1_33.3%]">
          <div className="sticky top-0 left-0 w-full">
            <AbstractForm
              initialValues={dealInitialValues}
              validationSchema={dealValidationSchema}
              onSubmit={createDeal}
              fields={[
                { name: "title", label: "Title", type: "text" },
                {
                  name: "description",
                  label: "Description",
                  type: "text-area",
                },
              ]}
              submitButtonText="Create"
            />
          </div>
        </div>
      )}
      <div className="flex [flex:_1_1_33.3%] flex-col items-center justify-center ">
        <UpdateDealContext.Provider
          value={{
            selectDeal: setCurrentDeal,
          }}
        >
          {showNotification && <Notification message={notificationMessage} />}
          <h1 className="text-3xl font-bold mb-8">Available Deals</h1>
          <DealList
            deals={deals}
            onShowNotification={(message) => {
              setNotificationMessage(message);
              setShowNotification(true);
              setTimeout(() => {
                setShowNotification(false);
              }, 3000);
            }}
            onDeleteDeal={handleDeleteDeal}
            isMerchant={isMerchant}
          />
        </UpdateDealContext.Provider>
      </div>
      {isMerchant && (
        <div className="relative [flex:_1_1_33.3%]">
          <div className="sticky top-0 right-0 w-full">
            <AbstractForm
              key={currentDeal.id}
              initialValues={currentDeal.initialValues}
              validationSchema={dealUpdateValidationSchema}
              onSubmit={updateDeal}
              fields={[
                { name: "title", label: "Title", type: "text" },
                {
                  name: "description",
                  label: "Description",
                  type: "text-area",
                },
              ]}
              submitButtonText="Update"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
