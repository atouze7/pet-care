package com.alan.universalpetcare.service.patient;

import com.alan.universalpetcare.dto.UserDto;

import java.util.List;

public interface IPatientService {
    List<UserDto> getPatients();
}
