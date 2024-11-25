import { Checkbox, YStack, XStack, Label, View, Button } from "tamagui";
import { Controller, useFormContext } from "react-hook-form";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Treatment } from "@/core/react-query/treatments/types";

const TreatmentsList = ({ route, navigation }) => {
  const { control } = useFormContext();
  const { member } = route.params || [];
  const treatment: Treatment[] = member.treatments;

  return (
    <View>
      <YStack space="sm">
        {treatment?.map((treatment) => (
          <Controller
            key={treatment.id}
            name="treatmentIds"
            control={control}
            render={({ field }) => (
              <XStack alignItems="center" space="sm">
                <Checkbox
                  checked={field.value.includes(treatment.id)}
                  onCheckedChange={(checked) => {
                    const newValues = checked
                      ? [...field.value, treatment.id]
                      : field.value.filter((id) => id !== treatment.id);
                    field.onChange(newValues);
                  }}
                />
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
                <Label>{treatment.title}</Label>
              </XStack>
            )}
          />
        ))}
      </YStack>
      <Button
        onPress={() => navigation.navigate("Select date and time", { member })}
      >
        asd
      </Button>
    </View>
  );
};

export default TreatmentsList;
