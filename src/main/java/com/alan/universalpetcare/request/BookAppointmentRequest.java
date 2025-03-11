package com.alan.universalpetcare.request;

import com.alan.universalpetcare.model.Appointment;
import com.alan.universalpetcare.model.Pet;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookAppointmentRequest {
    private Appointment appointment;
    private List<Pet> pets;
}
