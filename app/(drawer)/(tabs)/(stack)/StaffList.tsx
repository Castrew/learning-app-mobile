import { YStack, Card, Text, ScrollView, Image } from "tamagui";
import { Controller, useFormContext } from "react-hook-form";
import { useGetAllStaff } from "@/core/react-query/staff/hooks/useGetAllStaff";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { LinearGradient } from "@/components/expo/LinearGradient";

const StaffList = () => {
  const { control } = useFormContext();
  const { data: staff, isLoading } = useGetAllStaff();
  const router = useRouter();
  const navigation = useNavigation();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  useEffect(() => navigation.setOptions({ headerShown: true }), []);

  return (
    <LinearGradient>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      >
        <YStack alignItems="center">
          {staff?.map((member) => {
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
                    backgroundColor={
                      field.value === member.id ? "pink" : "gray"
                    }
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
    </LinearGradient>
  );
};

export default StaffList;
