import { Drawer } from "expo-router/drawer";
import { Home } from "@tamagui/lucide-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)" // This is the name of the page and must match the url from root
        options={{
          headerShown: false,
          drawerLabel: "Home",
          swipeEnabled: false,
          drawerIcon(props) {
            return <Home />;
          },
        }}
      />
    </Drawer>
  );
}
