import { useGetAllTreatments } from "@/core/react-query/treatments/hooks/useGetAllTreatmets";
import { ScrollView, Text, Card, Image, YStack, XStack, View } from "tamagui";

export const TreatmentCard = () => {
  const { data, isLoading } = useGetAllTreatments();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      backgroundColor="pink"
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
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
              <Text fontWeight="700" fontSize={18}>
                {treatment.title}
              </Text>
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
              <Text
                color="#666"
                fontSize={14}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {treatment.description}
              </Text>
            </View>
          </Card>
        ))}
      </YStack>
    </ScrollView>
  );
};
