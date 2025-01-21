import { View } from "tamagui";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/tamagui/Button";
import { Stack } from "expo-router";

export interface FormValues {
  staffId: string;
  treatmentIds: string[];
  date: string;
  start: string;
}

export default function TabTwoScreen() {
  const formContext = useForm<FormValues>({
    defaultValues: {
      staffId: "",
      treatmentIds: [],
      date: "",
      start: "",
    },
  });

  return (
    <View w="100vw" h="100%">
      <FormProvider {...formContext}>
        <Stack>
          <Stack.Screen
            name="StaffList"
            // component={StaffList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TreatmentList"
            // component={TreatmentsList}
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <Button
                  onPress={() => {
                    formContext.setValue("treatmentIds", []),
                      navigation.goBack();
                  }}
                >
                  Back
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name="Calendar"
            // component={Calendar}
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <Button
                  onPress={() => {
                    formContext.setValue("date", ""),
                      formContext.setValue("start", ""),
                      navigation.goBack();
                  }}
                >
                  Back
                </Button>
              ),
            })}
          />
        </Stack>
      </FormProvider>
    </View>
  );
}
