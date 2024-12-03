import {
  YStack,
  XStack,
  Card,
  Text,
  ScrollView,
  Image,
  Input,
  Button,
  View,
} from "tamagui";
import { Controller, useFormContext } from "react-hook-form";
import { useGetAllStaff } from "@/core/react-query/staff/hooks/useGetAllStaff";
import { useRouter } from "expo-router";

const StaffList = ({ navigation }) => {
  const { control } = useFormContext();
  const { data, isLoading } = useGetAllStaff();
  const router = useRouter();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      backgroundColor="pink"
      style={{ flex: 1, paddingHorizontal: 16 }}
      showsHorizontalScrollIndicator={false}
    >
      <YStack alignItems="center">
        {data?.map((member) => {
          return (
            <Controller
              key={member.id}
              name="staffId"
              control={control}
              render={({ field }) => (
                <Card
                  key={member.id}
                  mt={20}
                  width="100%"
                  maxWidth={350}
                  borderRadius={15}
                  elevate={true}
                  backgroundColor={field.value === member.id ? "pink" : "gray"}
                  onPress={() => {
                    const JSONmember = JSON.stringify(member);
                    field.onChange(member.id);
                    router.push({
                      pathname: "/(drawer)/(stack)/TreatmentList",
                      params: { member: JSON.stringify(member) },
                    });
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: 350,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}
                    source={
                      // treatment.image
                      //   ? { uri: treatment.image }:
                      require("../../../../assets/images/not-available.jpg")
                    }
                    resizeMode="cover"
                  />
                  <Card.Footer
                    height={50}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text color="white">{member.name}</Text>
                  </Card.Footer>
                </Card>
              )}
            />
          );
        })}
      </YStack>
    </ScrollView>
  );
};

export default StaffList;
