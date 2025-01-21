import { Button } from "@/components/tamagui/Button";
import { AlignLeft } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";

const AdminTabLayout = () => {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Treatments",
          headerLeft: () => (
            <Button onPress={() => navigation.toggleDrawer()}>
              <AlignLeft />
            </Button>
          ),
        })}
      />
      <Tabs.Screen name="CreateTreatment" options={{ href: null }} />
      <Tabs.Screen
        name="treatments/create/index"
        options={{
          title: "Create Treatment",
          href: null,
          tabBarStyle: { display: "none" },
          headerLeft: () => <Button onPress={() => router.back()}>Back</Button>,
        }}
      />
      <Tabs.Screen
        name="treatments/[treatmentId]/index"
        options={{
          title: "Create Treatment",
          href: null,
          tabBarStyle: { display: "none" },
          headerLeft: () => <Button onPress={() => router.back()}>Back</Button>,
        }}
      />
    </Tabs>
  );
};

export default AdminTabLayout;
