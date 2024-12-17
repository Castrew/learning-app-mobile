import { Drawer } from "expo-router/drawer";
import { Home, LayoutDashboard } from "@tamagui/lucide-icons";

export default function DrawerLayout() {
  return (
    <Drawer initialRouteName="">
      <Drawer.Screen
        name="(appTabs)" // This is the name of the page and must match the url from root
        options={{
          headerShown: false,
          drawerLabel: "Home",
          swipeEnabled: false,
          drawerIcon(props) {
            return <Home {...props} />;
          },
        }}
      />
      <Drawer.Screen
        name="admin/(adminTabs)" // This is the name of the page and must match the url from root
        options={{
          headerShown: false,
          drawerLabel: "Admin panel",
          swipeEnabled: false,
          drawerIcon(props) {
            return <LayoutDashboard {...props} />;
          },
        }}
      />
    </Drawer>
  );
}
