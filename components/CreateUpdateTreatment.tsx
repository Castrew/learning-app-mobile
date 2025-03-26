import {
  YStack,
  XStack,
  Button,
  Input,
  Label,
  Select,
  Text,
  Card,
  ScrollView,
  Adapt,
  Sheet,
} from "tamagui";
import { LinearGradient } from "./expo/LinearGradient";
import { useEffect } from "react";
import { useCreateTreatment } from "@/core/react-query/treatments/hooks/useCreateTreatment";
import { useGetOneTreatment } from "@/core/react-query/treatments/hooks/useGetOneTreatment";
import { useUpdateTreatment } from "@/core/react-query/treatments/hooks/useUpdateTreatment";
import { Treatment } from "@/core/react-query/treatments/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DURATION_TIME } from "@/constants/schedule";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useToast } from "./useToast";

type LocalSearchParamsProps = {
  treatmentId: string;
};

export interface FormValues {
  userId: string;
  title: string;
  duration: string;
  price: string;
  description: string;
}

export const CreateUpdateTreatment = () => {
  const { treatmentId } = useLocalSearchParams<LocalSearchParamsProps>();
  const updateTreatment = useUpdateTreatment();
  const createTreatment = useCreateTreatment();

  const { data: treatment, isLoading } = useGetOneTreatment({ treatmentId });

  const router = useRouter();
  const { SuccessToast, ErrorToast } = useToast();

  const defaultValues = {
    title: treatment?.title || "",
    duration: treatment?.duration || "",
    price: treatment?.price || "",
    description: treatment?.description || "",
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset({
      title: treatment?.title,
      duration: treatment?.duration,
      price: treatment?.price,
      description: treatment?.description,
    });
  }, [
    treatment?.description,
    treatment?.duration,
    treatment?.price,
    treatment?.title,
  ]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (treatment?.id) {
      updateTreatment.mutate(
        { treatmentId: treatment?.id, ...data },
        {
          onSuccess: () => {
            SuccessToast("Treatment updated");
            router.back();
          },
          onError: (e) => {
            SuccessToast(`Error ${e}`);

            router.back();
          },
        }
      );
    } else {
      createTreatment.mutate(
        { ...data },
        {
          onSuccess: () => {
            SuccessToast("Treatment created");
            reset();
            router.back();
          },
          onError: (e) => {
            SuccessToast(`Error ${e}`);

            router.back();
          },
        }
      );
    }
  };

  if (isLoading) {
    return <Text>Please wait</Text>;
  }

  return (
    <LinearGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack mt={20} alignItems="center" justifyContent="center">
            <Card
              width="80%"
              padding={20}
              borderRadius={20}
              backgroundColor="#ffe6ed"
              shadowColor="rgba(0,0,0,0.2)"
              shadowRadius={10}
              height="90%"
            >
              <Text fontSize={24} fontWeight="700" textAlign="center">
                {treatment ? "Update Treatment" : "Create Treatment"}
              </Text>

              <YStack marginVertical={5}>
                <Label fontSize={16} marginBottom={5}>
                  Title
                </Label>
                <Controller
                  control={control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="Enter title"
                      backgroundColor="#fff"
                      borderColor="#ffb3c9"
                      borderWidth={1}
                      borderRadius={10}
                      padding={10}
                    />
                  )}
                />
                {errors.title && (
                  <Text color="red">{errors.title.message}</Text>
                )}
              </YStack>

              <YStack marginVertical={5}>
                <Label fontSize={16} marginBottom={5}>
                  Description
                </Label>
                <Controller
                  control={control}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="Enter Description"
                      multiline
                      numberOfLines={4}
                      backgroundColor="#fff"
                      borderColor="#ffb3c9"
                      borderWidth={1}
                      borderRadius={10}
                      padding={10}
                    />
                  )}
                />
                {errors.description && (
                  <Text color="red">{errors.description.message}</Text>
                )}
              </YStack>

              <YStack marginVertical={5}>
                <Label fontSize={16} marginBottom={5}>
                  Duration
                </Label>
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <Select.Trigger
                        zIndex={1}
                        padding={10}
                        borderWidth={1}
                        borderColor="#ffb3c9"
                        borderRadius={10}
                        backgroundColor="#fff"
                      >
                        <Select.Value placeholder="Select duration" />
                      </Select.Trigger>

                      <Adapt when="sm" platform="touch">
                        <Sheet modal dismissOnSnapToBottom>
                          <Sheet.Frame>
                            <Adapt.Contents />
                          </Sheet.Frame>
                          <Sheet.Overlay />
                        </Sheet>
                      </Adapt>

                      <Select.Content zIndex={100000}>
                        <Select.Viewport>
                          {DURATION_TIME.map((option, i) => (
                            <Select.Item index={i} key={option} value={option}>
                              <Select.ItemText>{`${option} minutes`}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select>
                  )}
                />
              </YStack>

              <YStack marginVertical={5}>
                <Label fontSize={16} marginBottom={5}>
                  Price
                </Label>
                <Controller
                  control={control}
                  name="price"
                  rules={{ required: "Please set a price" }}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="Enter price"
                      backgroundColor="#fff"
                      borderColor="#ffb3c9"
                      borderWidth={1}
                      borderRadius={10}
                      padding={10}
                    />
                  )}
                />
                {errors.title && (
                  <Text color="red">{errors.title.message}</Text>
                )}
              </YStack>

              <XStack justifyContent="space-between" marginVertical={45}>
                <Button
                  backgroundColor="#ffb3c9"
                  borderRadius={10}
                  flex={1}
                  marginHorizontal={5}
                  onPress={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius={10}
                  flex={1}
                  marginHorizontal={5}
                  onPress={handleSubmit(onSubmit)}
                >
                  {treatment ? "Update" : "Create"}
                </Button>
              </XStack>
            </Card>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};
