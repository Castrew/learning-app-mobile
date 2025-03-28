export interface RequestTypes {
  getAllAppointments: {
    id?: string;
    selectedMember?: string;
    selectedTreatmentsIds?: string[];
    selectedDate?: string;
    selectedTime?: string;
    selectedDuration?: string;
  };

  getUserAppointments: {
    userId: string;
  };

  deleteAppointment: {
    id: string;
  };

  updateAppointment: {
    apptId: string;
    groupId: string;
    treatmentId: string;
  };

  createAppointment: {
    staffId: string;
    treatmentIds: string[];
    date: string;
    start: string;
    userId: string;
  };
  paginatedAppointments: {
    page: string;
    pageSize: string;
  };
  deleteAppointmentGroup: {
    apptId: string;
  };
}
