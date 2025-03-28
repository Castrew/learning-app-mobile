import { View } from "tamagui";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/tamagui/Button";
import { Stack } from "expo-router";
import { useSession } from "@/session/SessionProvier";

export interface FormValues {
  userId: string;
  staffId: string;
  treatmentIds: string[];
  date: string;
  start: string;
}

export default function TabTwoScreen() {
  const { user } = useSession();
  const formContext = useForm<FormValues>({
    defaultValues: {
      userId: user?.id,
      staffId: "",
      treatmentIds: [],
      date: "",
      start: "",
    },
  });

  return (
    <View w="100vw" h="100%">
      <FormProvider {...formContext}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#F9D1D1" },
          }}
        >
          <Stack.Screen name="StaffList" options={{ headerShown: false }} />
          <Stack.Screen
            name="TreatmentList"
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
