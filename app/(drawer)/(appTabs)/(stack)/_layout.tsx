import { View } from "tamagui";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/tamagui/Button";
import { Stack } from "expo-router";
import { useSession } from "@/session/SessionProvier";
import { ArrowLeft } from "@tamagui/lucide-icons";

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
    <View flex={1}>
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
                  backgroundColor={"whitesmoke"}
                  height={40}
                  ml={10}
                  mb={5}
                  icon={<ArrowLeft size="$1" />}
                  onPress={() => {
                    formContext.setValue("treatmentIds", []),
                      navigation.goBack();
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Calendar"
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <Button
                  backgroundColor={"whitesmoke"}
                  height={40}
                  ml={10}
                  mb={5}
                  icon={<ArrowLeft size="$1" />}
                  onPress={() => {
                    formContext.setValue("date", ""),
                      formContext.setValue("start", ""),
                      navigation.goBack();
                  }}
                />
              ),
            })}
          />
        </Stack>
      </FormProvider>
    </View>
  );
}
