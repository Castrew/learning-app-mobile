import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";

export const LinearGradient = (props) => (
  <ExpoLinearGradient
    colors={["#F9D1D1", "#E0A1E0", "#D1E0F9"]}
    style={{ flex: 1, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
    {...props}
  />
);
