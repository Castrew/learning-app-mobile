import { View } from "tamagui";

import StaffList from "@/components/StaffList";
import TreatmentsList from "@/components/TreatmentList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FormProvider, useForm } from "react-hook-form";
import Calendar from "@/components/Calendar";
import { Button } from "@/components/tamagui/Button";

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

  // console.log(formContext.watch());

  const Stack = createNativeStackNavigator();
  return (
    <View w="100vw" h="100%">
      <FormProvider {...formContext}>
        <Stack.Navigator>
          <Stack.Screen
            name="Select worker"
            component={StaffList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Select treatments"
            component={TreatmentsList}
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
            name="Select date and time"
            component={Calendar}
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
        </Stack.Navigator>
      </FormProvider>
    </View>
  );
}
