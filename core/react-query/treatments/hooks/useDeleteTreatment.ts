import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { treatmentsKeys, treatmentsMutationsKeys } from "../treatmentsKeys";
import { Treatment } from "../types";

export const useDeleteTreatment = () => {
  const queryClient = useQueryClient();

  return useMutation<Treatment, string, RequestTypes["deleteTreatment"]>({
    ...treatmentsMutationsKeys.deleteTreatment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: treatmentsKeys.allTreatments().queryKey,
      });
    },
  });
};
