import { createContext, Dispatch, SetStateAction } from "react";
import { ICurrentDeal } from "./types";

interface IUpdateContext {
  selectDeal: Dispatch<SetStateAction<ICurrentDeal>>;
}
export const UpdateDealContext = createContext<IUpdateContext>({
  selectDeal: () => {},
});
