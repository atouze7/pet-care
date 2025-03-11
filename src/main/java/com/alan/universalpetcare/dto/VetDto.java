package com.alan.universalpetcare.dto;

import lombok.Data;

@Data
public class VetDto {
    private Long veterinarianId;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String phoneNumber;
    private String specialization;

}
