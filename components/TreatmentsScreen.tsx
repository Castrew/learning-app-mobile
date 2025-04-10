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
  Select,
  Adapt,
  Sheet,
  PopoverAnchor,
} from "tamagui";
import { LinearGradient } from "./expo/LinearGradient";
import { usePathname } from "expo-router";
import { Button } from "./tamagui/Button";
import { EllipsisVertical } from "@tamagui/lucide-icons";
import { useDeleteTreatment } from "@/core/react-query/treatments/hooks/useDeleteTreatment";
import { useRouter } from "expo-router";
import RenderHtml from "react-native-render-html";
import { useToast } from "./useToast";

export const TreatmentsScreen = () => {
  const { data, isLoading } = useGetAllTreatments();
  const deleteTreatment = useDeleteTreatment();
  const { SuccessToast, ErrorToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const onDeletePress = (treatmentId) => {
    deleteTreatment.mutate(
      {
        treatmentId,
      },
      {
        onSuccess: () => {
          SuccessToast("Treatment deleted successfuly");
        },
        onError: (e) => {
          ErrorToast(`Error ${e}`);
        },
      }
    );
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View flex={1}>
      <LinearGradient>
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          <YStack space={20} alignItems="center" mt={10} mb={10}>
            {data?.map((treatment) => (
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
                      <Popover allowFlip stayInFrame offset={15}>
                        <PopoverAnchor>
                          <PopoverTrigger>
                            <EllipsisVertical maxHeight={20} />
                          </PopoverTrigger>
                        </PopoverAnchor>
                        <PopoverContent
                          borderRadius="$4"
                          backgroundColor="$background"
                        >
                          <Stack
                            padding="$1"
                            borderBottomWidth={1}
                            borderColor="black"
                            onPress={() => {
                              router.push(
                                `/(drawer)/admin/(adminTabs)/treatments/${treatment.id}`
                              );
                            }}
                          >
                            <Text mb={10}>Edit</Text>
                          </Stack>
                          <Stack onPress={() => onDeletePress(treatment.id)}>
                            <Text mt={10}>Delete</Text>
                          </Stack>
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
                    <RenderHtml source={{ html: treatment.description }} />
                  </View>
                </View>
              </Card>
            ))}
          </YStack>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};
