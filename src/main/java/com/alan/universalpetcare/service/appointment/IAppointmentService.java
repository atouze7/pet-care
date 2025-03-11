package com.alan.universalpetcare.service.appointment;

import com.alan.universalpetcare.dto.AppointmentDto;
import com.alan.universalpetcare.model.Appointment;
import com.alan.universalpetcare.request.AppointmentUpdateRequest;
import com.alan.universalpetcare.request.BookAppointmentRequest;

import java.util.List;
import java.util.Map;

public interface IAppointmentService {
    Appointment createAppointment(BookAppointmentRequest appointment, Long sender, Long recipient);
    List<Appointment> getAllAppointments();
    Appointment updateAppointment(Long id, AppointmentUpdateRequest request);


    void deleteAppointment(Long id);
    Appointment getAppointmentById(Long id);
    Appointment getAppointmentByNo(String appointmentNo);
    List<AppointmentDto> getUserAppointments(Long userId);
    Appointment cancelAppointment(Long appointmentId);

    Appointment approveAppointment(Long appointmentId);

    Appointment declineAppointment(Long appointmentId);

    long countAppointment();

    List<Map<String, Object>> getAppointmentSummary();

    List<Long> getAppointmentIds();

    void setAppointmentStatus(Long appointmentId);
}
