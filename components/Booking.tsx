import { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  H3,
  XStack,
  YStack,
  Card,
  Separator,
  ScrollView,
  Text,
  Spinner,
} from "tamagui";
import { useForm, FormProvider } from "react-hook-form";
import { useGetAllStaff } from "@/core/react-query/staff/hooks/useGetAllStaff";
import { useCreateAppointment } from "@/core/react-query/appointments/hooks/useCreateAppointment";
import StaffList from "./StaffList";
import TreatmentsList from "./TreatmentList";
import Calendar from "./Calendar";

export interface FormValues {
  staffId: string;
  treatmentIds: string[];
  date: string;
  start: string;
}

const Booking = () => {
  const createAppointment = useCreateAppointment();
  const { data: staffMembers, isLoading: isLoadingAllStaff } = useGetAllStaff();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberTreatments, setMemberTreatments] = useState([]);
  const formContext = useForm<FormValues>({
    defaultValues: {
      staffId: "",
      treatmentIds: [],
      date: "",
      start: "",
    },
  });

  const handleMemberChange = (member) => {
    formContext.reset();
    setMemberTreatments(member.treatments);
    setMemberName(member.name);
    formContext.setValue("staffId", member.id);
  };

  const totalDuration = () => {
    const appt = formContext.watch();
    return memberTreatments
      .filter((t) => appt.treatmentIds.includes(t.id))
      .reduce((sum, t) => sum + parseInt(t.duration), 0);
  };

  const selectedTreatments = formContext.watch().treatmentIds;

  const onSubmit = formContext.handleSubmit((data) => {
    createAppointment.mutate(data, {
      onSuccess: () => {
        // toasts.Success("Your appointment has been set!");
        setIsDialogOpen(false);
      },
      onError: () => {
        // toasts.Error("Something went wrong");
      },
    });
  });

  if (isLoadingAllStaff) return <Spinner size="large" />;

  return (
    <FormProvider {...formContext}>
      <YStack padding="md" space="sm">
        <StaffList
          staffMembers={staffMembers}
          handleMemberChange={handleMemberChange}
        />

        <TreatmentsList
          treatments={memberTreatments}
          control={formContext.control}
        />

        <Calendar
          totalDuration={totalDuration}
          selectedMemberId={formContext.watch("staffId")}
        />

        <Button
          // theme="pink"
          disabled={!(selectedTreatments.length && formContext.watch("start"))}
          onPress={() => setIsDialogOpen(true)}
        >
          Set Appointment
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger />
          <YStack backgroundColor="white" padding="lg" borderRadius="$4">
            <H3>Confirmation</H3>
            <Text>{`Set appointment with ${memberName}?`}</Text>
            <Text>Selected treatments:</Text>
            {memberTreatments
              .filter((t) => selectedTreatments.includes(t.id))
              .map((t) => (
                <Text key={t.id}>• {t.title}</Text>
              ))}
            <Button onPress={onSubmit}>Confirm</Button>
          </YStack>
        </Dialog>
      </YStack>
    </FormProvider>
  );
};

export default Booking;
