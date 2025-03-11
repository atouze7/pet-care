package com.alan.universalpetcare.controller;


import com.alan.universalpetcare.dto.UserDto;
import com.alan.universalpetcare.response.ApiResponse;
import com.alan.universalpetcare.service.patient.IPatientService;
import com.alan.universalpetcare.utils.FeedBackMessage;
import com.alan.universalpetcare.utils.UrlMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping(UrlMapping.PATIENTS)
public class PatientController {
    private final IPatientService patientService;

    @GetMapping(UrlMapping.GET_ALL_PATIENTS)
    public ResponseEntity<ApiResponse> getAllPatients() {
        List<UserDto> patients = patientService.getPatients();
        return ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, patients));
    }
}
