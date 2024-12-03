import { Button as TamaguiButton, Text } from "tamagui";

export const Button = (props) => {
  return <TamaguiButton opacity={props?.disabled ? 0.5 : 1} {...props} />;
};
