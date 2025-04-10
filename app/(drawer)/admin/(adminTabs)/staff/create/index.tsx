import CreateUpdateMember from "@/components/CreateUpdateMember";
import { useGetAllTreatments } from "@/core/react-query/treatments/hooks/useGetAllTreatmets";
import { Text, View } from "tamagui";

export default function AdminCreateTreatmentScreen() {
  const { data: treatments, isLoading: isLoadingAllTreatments } =
    useGetAllTreatments();

  if (isLoadingAllTreatments) {
    return "Loading...";
  }
  return <CreateUpdateMember treatments={treatments} />;
}
