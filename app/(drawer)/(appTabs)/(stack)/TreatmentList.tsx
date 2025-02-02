import { Checkbox, YStack, XStack, Label, View } from "tamagui";
import { Button } from "@/components/tamagui/Button";
import { Controller, useFormContext } from "react-hook-form";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Treatment } from "@/core/react-query/treatments/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "@/components/expo/LinearGradient";

const TreatmentsList = ({ route, navigation }) => {
  const router = useRouter();
  const { control, watch } = useFormContext();
  const { member } = useLocalSearchParams();
  const parsedMember = JSON.parse(member as string);
  const isTreatmentSelected = watch("treatmentIds").length;
  const treatment: Treatment[] = parsedMember.treatments;

  return (
    <LinearGradient>
      <View>
        <YStack width={300} alignItems="center" gap="$2">
          {treatment?.map((treatment) => (
            <Controller
              key={treatment.id}
              name="treatmentIds"
              control={control}
              render={({ field }) => (
                <XStack width={300} alignItems="center" gap="$2">
                  <Checkbox
                    size="$4"
                    checked={field.value.includes(treatment.id)}
                    onCheckedChange={(checked) => {
                      const newValues = checked
                        ? [...field.value, treatment.id]
                        : field.value.filter((id) => id !== treatment.id);
                      field.onChange(newValues);
                    }}
                  >
                    <Checkbox.Indicator>
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox>
                  <Label>{treatment.title}</Label>
                </XStack>
              )}
            />
          ))}
        </YStack>
        <Button
          disabled={isTreatmentSelected === 0}
          onPress={() =>
            router.push({
              pathname: "/(drawer)/(stack)/Calendar",
              params: { member },
            })
          }
        >
          asd
        </Button>
      </View>
    </LinearGradient>
  );
};

export default TreatmentsList;
