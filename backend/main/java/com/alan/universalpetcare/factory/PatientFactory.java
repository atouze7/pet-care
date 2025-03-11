package com.alan.universalpetcare.factory;

import com.alan.universalpetcare.repository.PatientRepository;
import com.alan.universalpetcare.request.RegistrationRequest;
import com.alan.universalpetcare.service.user.UserAttributesMapper;
import com.alan.universalpetcare.model.Patient;
import com.alan.universalpetcare.service.role.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientFactory {
    private final PatientRepository patientRepository;
    private final UserAttributesMapper userAttributesMapper;
    private final IRoleService roleService;

    public Patient createPatient(RegistrationRequest request) {
        Patient patient = new Patient();
        patient.setRoles(roleService.setUserRole("PATIENT"));
        userAttributesMapper.setCommonAttributes(request, patient);
        return patientRepository.save(patient);
    }
}
