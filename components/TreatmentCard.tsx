import { useGetAllTreatments } from "@/core/react-query/treatments/hooks/useGetAllTreatmets";
import {
  ScrollView,
  Text,
  Card,
  Image,
  YStack,
  XStack,
  View,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
} from "tamagui";
import { LinearGradient } from "./expo/LinearGradient";
import { usePathname } from "expo-router";
import { Button } from "./tamagui/Button";
import { EllipsisVertical } from "@tamagui/lucide-icons";
import { useDeleteTreatment } from "@/core/react-query/treatments/hooks/useDeleteTreatment";
import { useRouter } from "expo-router";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

export const TreatmentCard = () => {
  const { data, isLoading } = useGetAllTreatments();
  const deleteTreatment = useDeleteTreatment();
  const { width } = useWindowDimensions();

  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient>
      {pathname === "/admin" && (
        <View p={10} mt={10}>
          <Button
            onPress={() => router.push("/admin/(adminTabs)/treatments/create")}
          >
            Create new treatment
          </Button>
        </View>
      )}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        <YStack space={20} alignItems="center" mt={10} mb={10}>
          {data.map((treatment) => (
            <Card
              key={treatment.id}
              width="100%"
              maxWidth={350}
              borderRadius={15}
              elevate={true}
              bg="#fff"
            >
              <Card.Header
                padding={16}
                borderBottomWidth={1}
                borderBottomColor="#e0e0e0"
              >
                <XStack justifyContent="space-between">
                  <Text fontWeight="700" fontSize={18}>
                    {treatment.title}
                  </Text>
                  {pathname === "/admin" && (
                    <Popover>
                      <PopoverTrigger>
                        <EllipsisVertical maxHeight={20} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <YStack
                          // width={100}
                          // padding="$3"
                          borderRadius="$4"
                          backgroundColor="$background"
                        >
                          <Stack
                            padding="$1"
                            borderBottomWidth={1}
                            borderColor="$borderColor"
                            onPress={() => {
                              router.push(
                                `/(drawer)/admin/(adminTabs)/treatments/${treatment.id}`
                              );
                            }}
                          >
                            <Text mb={10}>Edit</Text>
                          </Stack>
                          <Stack
                            onPress={() =>
                              deleteTreatment.mutate(
                                {
                                  treatmentId: treatment.id,
                                }
                                // {
                                //   onSuccess(data, variables, context) {
                                //     console.log("gj");
                                //   },
                                // }
                              )
                            }
                          >
                            <Text mt={10}>Delete</Text>
                          </Stack>
                        </YStack>
                      </PopoverContent>
                    </Popover>
                  )}
                </XStack>
              </Card.Header>

              <Image
                style={{
                  width: "100%",
                  height: 200,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
                source={
                  // treatment.image
                  //   ? { uri: treatment.image }:
                  require("../assets/images/not-available.jpg")
                }
                resizeMode="cover"
              />

              <View padding={16}>
                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  mb={10}
                >
                  <Text color="#999" fontSize={14}>
                    Duration: {treatment.duration} mins
                  </Text>
                  <Text color="#333" fontSize={16} fontWeight="600">
                    ${treatment.price}
                  </Text>
                </XStack>
                <View>
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: treatment.description }}
                  />
                </View>
              </View>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
};
