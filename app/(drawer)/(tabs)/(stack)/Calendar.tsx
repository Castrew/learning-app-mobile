import { YStack, XStack, Text, View, Stack } from "tamagui";
import { Button } from "../../../../components/tamagui/Button";
import { useEffect, useState } from "react";
import moment from "moment";
import { useFormContext } from "react-hook-form";
import { useGetAllAppointments } from "@/core/react-query/appointments/hooks/useGetAllAppointments";
import { Treatment } from "@/core/react-query/treatments/types";
import { Appointment } from "@/core/react-query/appointments/types";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "@tamagui/lucide-icons";
import {
  WORKING_DAYS,
  WORKING_HOURS,
  DURATION_TIME,
} from "../../../../constants/schedule";
import { useCreateAppointment } from "@/core/react-query/appointments/hooks/useCreateAppointment";
import { FormValues } from "./_layout";
import { useLocalSearchParams } from "expo-router";

const Calendar = ({ route }) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [currentDay, setCurrentDay] = useState(moment());
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("week"));

  const createAppointment = useCreateAppointment();
  const { data, isLoading } = useGetAllAppointments();
  const { member } = useLocalSearchParams();
  const parsedMember = JSON.parse(member as string);
  const { watch, setValue, handleSubmit } = useFormContext<FormValues>();
  const appt = watch();

  const memberAppointments = data?.filter((appt: Appointment) => {
    return appt.staffId === parsedMember.id;
  });

  const totalDuration = parsedMember.treatments
    ?.filter((treatment: Treatment) => appt.treatmentIds.includes(treatment.id))
    .map((treatment: Treatment) => treatment.duration)
    .reduce((sum: number, duration: string) => sum + parseInt(duration), 0);

  const getDateTime = (date: string, start: string) =>
    moment(date, "MM-DD-YYYY")
      .hour(Number(start.split(":")[0]))
      .minute(Number(start.split(":")[1]));

  const checkIfFits = (slotStartTime: string) => {
    const slotStart = currentWeek
      .day(currentDay.format("dddd"))
      .hour(Number(slotStartTime.split(":")[0]))
      .minute(Number(slotStartTime.split(":")[1]));

    const afterDurationSlotEnd = slotStart.clone().add(totalDuration, "minute");

    return !memberAppointments?.find((appt: Appointment) => {
      const existingStart = getDateTime(appt.date, appt.start);
      const existingEnd = existingStart
        .clone()
        .add(appt.treatmentDuration, "minute");

      return (
        slotStart.isBetween(existingStart, existingEnd) ||
        afterDurationSlotEnd.isBetween(existingStart, existingEnd) ||
        existingStart.isBetween(slotStart, afterDurationSlotEnd)
      );
    });
  };

  const nextOrPreviousDay = (n: number) => {
    const newDay = currentDay.clone().add(n, "day");
    setSelectedSlot("");
    setCurrentDay(newDay);
  };

  const nextOrPreviousWeek = (w: number) => {
    const newWeek = currentWeek.clone().add(w, "week");
    setCurrentWeek(newWeek);
    setCurrentDay(newWeek.startOf("week"));
    if (newWeek.startOf("week").isBefore(moment())) {
      setCurrentDay(moment());
    } else {
      setCurrentDay(newWeek.startOf("week"));
    }
    setSelectedSlot("");
    setValue("date", currentDay.format("MM-DD-YYYY"));
    setValue("start", "");
  };

  const isSlotBooked = (time: string) =>
    !!memberAppointments?.find((appt: Appointment) => {
      const startDateTime = getDateTime(appt.date, appt.start);
      const endDateTime = startDateTime
        .clone()
        .add(appt.treatmentDuration, "minute");
      const slotDateTime = getDateTime(
        currentWeek.day(currentDay.format("dddd")).format("MM-DD-YYYY"),
        time
      );

      return (
        slotDateTime.isBetween(startDateTime, endDateTime) ||
        startDateTime.isSame(slotDateTime)
      );
    });

  const isSlotBeforeNow = (time: string) => {
    const slotStart = currentWeek
      .day(currentDay.format("dddd"))
      .hour(Number(time.split(":")[0]))
      .minute(Number(time.split(":")[1]));
    const now = moment();

    return slotStart.isBefore(now);
  };

  const isDayInPast = () => {
    const dayBeforeToday = moment().subtract(1, "day").startOf("D");
    return dayBeforeToday.isSame(
      currentDay.clone().subtract(1, "day").startOf("D")
    );
  };

  const onSubmit = handleSubmit((data) => {
    createAppointment.mutate(data, {
      onSuccess: () => {
        console.log("Appointment created successfully");
      },
      onError: () => {
        console.log("Error creating appointment");
      },
    });
  });

  useEffect(() => {
    setValue("date", moment().format("MM-DD-YYYY"));
  }, []);

  useEffect(() => {
    setValue("date", currentDay.format("MM-DD-YYYY"));
  }, [currentDay]);

  return (
    <View flexDirection="column" width="100%" padding={20}>
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={20}
      >
        <Button
          onPress={() => nextOrPreviousWeek(-1)}
          disabled={currentWeek.isSame(moment().startOf("week"), "week")}
          icon={ChevronsLeft}
        />
        <Button
          disabled={isDayInPast() || currentDay.format("dddd") === "Monday"}
          onPress={() => nextOrPreviousDay(-1)}
          icon={ChevronLeft}
        />
        <Text>
          {currentDay.format("dddd")}
          {currentWeek.day(currentDay.format("dddd")).format("MM-DD-YYYY")}
        </Text>
        <Button
          disabled={currentDay.format("dddd") === "Friday"}
          onPress={() => nextOrPreviousDay(1)}
          icon={ChevronRight}
        />
        <Button onPress={() => nextOrPreviousWeek(1)} icon={ChevronsRight} />
      </View>
      <Stack
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={10}
      >
        {WORKING_HOURS.map((time, index) => {
          const isBooked = isSlotBooked(time);
          const ifFits = checkIfFits(time);
          const isBeforeNow = isSlotBeforeNow(time);

          let bgcolor = "whitesmoke";
          if (selectedSlot === time) bgcolor = "lightgreen";
          if (isBooked) bgcolor = "#ff8a80";

          const isDisabled = isBooked || !ifFits || isBeforeNow;

          return (
            <Button
              backgroundColor={bgcolor}
              key={index}
              disabled={isDisabled}
              width="30%"
              height={50}
              borderRadius={10}
              variant={selectedSlot === time ? null : "outlined"}
              theme="active"
              onPress={() => {
                setValue("start", time);
                setSelectedSlot(time);
              }}
            >
              <Text fontSize={14} fontWeight="600">
                {time}
              </Text>
            </Button>
          );
        })}
      </Stack>
      <Button mt={20} onPress={onSubmit}>
        Set Appointment
      </Button>
    </View>
  );
};

export default Calendar;
