import { ButtonProps, Button as TamaguiButton } from "tamagui";

export const Button = (props: ButtonProps) => {
  return <TamaguiButton opacity={props?.disabled ? 0.5 : 1} {...props} />;
};
