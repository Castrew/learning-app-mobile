import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LinearGradient } from "./expo/LinearGradient";
import { useRouter } from "expo-router";
import { useCreateStaff } from "@/core/react-query/staff/hooks/useCreateStaff";
import { useUpdateStaff } from "@/core/react-query/staff/hooks/useUpdateStaff";
import { Staff } from "@/core/react-query/staff/types";
import { Treatment } from "@/core/react-query/treatments/types";
import { useToast } from "./useToast";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import {
  Button,
  Card,
  Input,
  Label,
  View,
  XStack,
  YStack,
  Text,
  Checkbox,
} from "tamagui";

type CreateUpdateMemberProps = {
  member?: Staff;
  treatments?: Treatment[];
  memberTreatmentsIds?: string[];
};

interface FormValues {
  name: string;
  treatmentIds: string[];
}

const CreateUpdateMember: React.FC<CreateUpdateMemberProps> = ({
  member,
  treatments,
  memberTreatmentsIds,
}) => {
  const router = useRouter();
  const createMember = useCreateStaff();
  const updateMember = useUpdateStaff();
  const { SuccessToast, ErrorToast } = useToast();

  const defaultValues = {
    name: member?.name || "",
    treatmentIds: memberTreatmentsIds || [],
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (member?.id) {
      updateMember.mutate(
        { staffId: member.id, ...data },
        {
          onSuccess: () => {
            reset();
            SuccessToast("Member updated successfully");
            router.push("/(drawer)/admin/(adminTabs)/MembersTab");
          },
          onError: (error) => ErrorToast(error),
        }
      );
    } else {
      createMember.mutate(data, {
        onSuccess: () => {
          reset();
          SuccessToast("Member created successfully");
          router.push("/(drawer)/admin/(adminTabs)/MembersTab");
        },
        onError: (error) => ErrorToast(error),
      });
    }
  };

  return (
    <LinearGradient>
      <View>
        <YStack mt={20} alignItems="center" justifyContent="center">
          <Card
            width="80%"
            padding={20}
            borderRadius={20}
            backgroundColor="#ffe6ed"
            shadowColor="rgba(0,0,0,0.2)"
            shadowRadius={10}
          >
            <Text fontSize={24} fontWeight="700" textAlign="center">
              {member ? "Update Member" : "Add Member"}
            </Text>

            <YStack marginVertical={5}>
              <Label fontSize={16} marginBottom={5}>
                Name
              </Label>
              <Controller
                control={control}
                name="name"
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
            </YStack>

            <YStack marginVertical={5}>
              <Label fontSize={16} marginBottom={5}>
                Treatments
              </Label>
              {treatments?.map((treatment) => (
                <Controller
                  key={treatment.id}
                  name="treatmentIds"
                  control={control}
                  render={({ field }) => (
                    <XStack width={300} alignItems="center" gap="$2">
                      <Checkbox
                        size="$4"
                        checked={field.value.includes(treatment.id)}
                        onCheckedChange={(checked) => {
                          const newValues = checked
                            ? [...field.value, treatment.id]
                            : field.value.filter((id) => id !== treatment.id);
                          field.onChange(newValues);
                        }}
                      >
                        <Checkbox.Indicator>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox>
                      <Label>{treatment.title}</Label>
                    </XStack>
                  )}
                />
              ))}
            </YStack>

            <XStack justifyContent="space-between" marginVertical={45}>
              <Button
                backgroundColor="#ffb3c9"
                borderRadius={10}
                flex={1}
                marginHorizontal={5}
                onPress={() =>
                  router.push("/(drawer)/admin/(adminTabs)/MembersTab")
                }
              >
                Cancel
              </Button>
              <Button
                borderRadius={10}
                flex={1}
                marginHorizontal={5}
                onPress={handleSubmit(onSubmit)}
              >
                {member ? "Update" : "Add"}
              </Button>
            </XStack>
          </Card>
        </YStack>
      </View>
    </LinearGradient>
  );
};

export default CreateUpdateMember;
