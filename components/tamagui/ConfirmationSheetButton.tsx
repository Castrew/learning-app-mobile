import { useState } from "react";
import { Button, Sheet, View, Text, XStack, ButtonProps } from "tamagui";

export const ConfirmationSheetButton = (
  props: ButtonProps & {
    label: string;
    message: string;
    onSubmit: () => void;
  }
) => {
  const { label, message, onSubmit } = props;
  const [open, setOpen] = useState(false);

  return (
    <View justifyContent="center" alignItems="center">
      <Button {...props} onPress={() => setOpen(true)}>
        {label}
      </Button>
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPointsMode="fit"
        dismissOnSnapToBottom
        animation="medium"
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4" gap="$4">
          <Text fontWeight="bold" fontSize="$6">
            Confirmation
          </Text>
          <Text>{message}</Text>
          <XStack justifyContent="space-between" gap="$3">
            <Button flex={1} onPress={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              flex={1}
              themeInverse
              onPress={() => {
                onSubmit();
              }}
            >
              Confirm
            </Button>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
};
