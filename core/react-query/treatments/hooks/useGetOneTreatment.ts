import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { treatmentsKeys } from "../treatmentsKeys";
import { Treatment } from "../types";

export const useGetOneTreatment = (
  payload: RequestTypes["getOneTreatment"]
) => {
  console.log(typeof payload.treatmentId);

  return useQuery<Treatment, string>({
    ...treatmentsKeys.oneTreatment(payload),
    enabled: !!payload?.treatmentId,
  });
};
