import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Button, View } from "tamagui";
import { AlignLeft, LogOut } from "@tamagui/lucide-icons";
import { useSession } from "@/session/SessionProvier";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import moment from "moment";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, logout, expires } = useSession();
  const condition = moment().isAfter(moment(expires));

  useEffect(() => {
    if (condition) {
      logout();
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Home",
          headerTintColor: "pink",
          // headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => {
            {
              return (
                <View>
                  {user ? (
                    <LogOut
                      marginRight={20}
                      color={"red"}
                      onPress={logout}
                    ></LogOut>
                  ) : (
                    <LoginWithGoogle />
                  )}
                </View>
              );
            }
          },
          headerLeft: () => (
            <Button onPress={() => navigation.toggleDrawer()}>
              <AlignLeft />
            </Button>
          ),
        })}
      />
      <Tabs.Screen
        name="Treatments"
        options={{
          title: "Treatments",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(stack)"
        options={{
          title: "Booking",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
