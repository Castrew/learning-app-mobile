import { PortalProvider, ScrollView, Text } from "tamagui";
import { LinearGradient } from "./expo/LinearGradient";
import { MemberCard } from "./MemberCard";
import { useGetAllStaff } from "@/core/react-query/staff/hooks/useGetAllStaff";

const MemberScreen = () => {
  const { data, isLoading } = useGetAllStaff();

  if (isLoading) {
    return <Text></Text>;
  }

  return (
    <LinearGradient>
      <PortalProvider shouldAddRootHost>
        <ScrollView gap={2} flex={1}>
          {data.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </ScrollView>
      </PortalProvider>
    </LinearGradient>
  );
};

export default MemberScreen;
