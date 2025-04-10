import { Staff } from "@/core/react-query/staff/types";
import { Button } from "./tamagui/Button";
import { Card, H3, XStack, Image, Paragraph } from "tamagui";
import dogImage from "@/assets/images/dog.png";
import { useDeleteStaff } from "@/core/react-query/staff/hooks/useDeleteStaff";
import { useToast } from "./useToast";
import { ConfirmationSheetButton } from "./tamagui/ConfirmationSheetButton";
import { router } from "expo-router";

type MemberCardProps = {
  member: Staff;
};

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const deleteMember = useDeleteStaff();
  const { SuccessToast, ErrorToast } = useToast();

  const onDeletePress = (staffId) =>
    deleteMember.mutate(
      { staffId },
      {
        onSuccess: () => SuccessToast("Member removed succesfully"),
        onError: () => ErrorToast("Something went wrong"),
      }
    );

  return (
    <Card
      key={member.id}
      elevate
      size="$10"
      bordered
      mb={5}
      mx={10}
      height={300}
    >
      <Card.Header padding={30}>
        <H3>{member.name}</H3>
        {member.treatments.map((treatment) => (
          <Paragraph key={treatment.id}>{treatment.title}</Paragraph>
        ))}
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button
          onPress={() =>
            router.push(`/(drawer)/admin/(adminTabs)/staff/${member.id}`)
          }
          borderRadius="$10"
        >
          Edit
        </Button>
        <ConfirmationSheetButton
          label="Delete"
          message="Do you want to delete this member?"
          onSubmit={() => onDeletePress(member.id)}
          themeInverse
          borderRadius="$10"
        />
      </Card.Footer>
      <Card.Background>
        <Image
          m={5}
          objectFit="contain"
          alignSelf="center"
          flex={1}
          source={dogImage}
        />
      </Card.Background>
    </Card>
  );
};
