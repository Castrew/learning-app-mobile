import { Button } from "@/components/tamagui/Button";
import {
  AlignLeft,
  Plus,
  Contact,
  Sparkles,
  ArrowLeft,
} from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useRouter } from "expo-router";

const AdminTabLayout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#F9D1D1" },
        tabBarStyle: { backgroundColor: "#D1E0F9" },
      }}
    >
      {/* Shown Tabs */}
      <Tabs.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Treatments",
          headerLeft: () => (
            <Button
              unstyled
              ml={10}
              icon={<AlignLeft size="$2" color="black" />}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <Button
              mb={10}
              mr={15}
              backgroundColor={"whitesmoke"}
              circular
              icon={<Plus size={20} />}
              onPress={() =>
                router.push("/(drawer)/admin/(adminTabs)/treatments/create")
              }
            />
          ),
          tabBarIcon: ({ color }) => <Sparkles color={color} />,
        })}
      />

      <Tabs.Screen
        name="MembersTab"
        options={({ navigation }) => ({
          title: "Staff",
          headerLeft: () => (
            <Button
              unstyled
              ml={10}
              icon={<AlignLeft size="$2" color="black" />}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <Button
              mb={10}
              mr={15}
              backgroundColor={"whitesmoke"}
              circular
              icon={<Plus size={20} />}
              onPress={() =>
                router.push("/(drawer)/admin/(adminTabs)/staff/create")
              }
            />
          ),
          tabBarIcon: () => <Contact />,
        })}
      />
      {/* Hidden Tabs */}
      <Tabs.Screen
        name="treatments/create/index"
        options={{
          title: "Create Treatment",
          href: null,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Button
              backgroundColor={"whitesmoke"}
              height={40}
              ml={10}
              mb={5}
              icon={<ArrowLeft size="$1" />}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="treatments/[treatmentId]/index"
        options={{
          title: "Create Treatment",
          href: null,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Button
              backgroundColor={"whitesmoke"}
              height={40}
              ml={10}
              mb={5}
              icon={<ArrowLeft size="$1" />}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="staff/[staffId]/index"
        options={{
          title: "Update Member",
          href: null,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Button
              backgroundColor={"whitesmoke"}
              height={40}
              ml={10}
              mb={5}
              icon={<ArrowLeft size="$1" />}
              onPress={() =>
                router.push("/(drawer)/admin/(adminTabs)/MembersTab")
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="staff/create/index"
        options={{
          title: "Add Member",
          href: null,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Button
              backgroundColor={"whitesmoke"}
              height={40}
              ml={10}
              mb={5}
              icon={<ArrowLeft size="$1" />}
              onPress={() =>
                router.push("/(drawer)/admin/(adminTabs)/MembersTab")
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AdminTabLayout;
