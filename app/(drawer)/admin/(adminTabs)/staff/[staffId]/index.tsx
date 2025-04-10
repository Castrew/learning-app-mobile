import CreateUpdateMember from "@/components/CreateUpdateMember";
import { useGetOneStaff } from "@/core/react-query/staff/hooks/useGetOneStaff";
import { useGetAllTreatments } from "@/core/react-query/treatments/hooks/useGetAllTreatmets";
import { useLocalSearchParams } from "expo-router";

type LocalSearchParamsProps = {
  staffId: string;
};

const AdminUpdateMemberScreen = () => {
  const { staffId } = useLocalSearchParams<LocalSearchParamsProps>();
  const { data: member, isLoading: isOneMemeberLoading } = useGetOneStaff({
    staffId,
  });
  const { data: treatments, isLoading: isLoadingAllTreatments } =
    useGetAllTreatments();

  const memberTreatmentsIds = member?.treatments.map((treatment) => {
    return treatment.id;
  });

  if (isLoadingAllTreatments || isOneMemeberLoading) {
    return "Loading...";
  }
  return (
    <CreateUpdateMember
      member={member}
      treatments={treatments}
      memberTreatmentsIds={memberTreatmentsIds}
    />
  );
};

export default AdminUpdateMemberScreen;
