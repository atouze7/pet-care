package com.alan.universalpetcare.dto;

import lombok.Data;

@Data
public class PatientDto {
    private Long patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String phoneNumber;
}
