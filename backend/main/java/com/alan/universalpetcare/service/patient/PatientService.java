package com.alan.universalpetcare.service.patient;

import com.alan.universalpetcare.repository.PatientRepository;
import com.alan.universalpetcare.dto.EntityConverter;
import com.alan.universalpetcare.dto.UserDto;
import com.alan.universalpetcare.model.Patient;
import com.alan.universalpetcare.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService implements IPatientService {
        private final PatientRepository patientRepository;
        private final EntityConverter<User, UserDto> entityConverter;


        @Override
        public List<UserDto> getPatients() {
            List<Patient> patients = patientRepository.findAll();
            return patients.stream()
                    .map(po -> entityConverter.mapEntityToDto(po, UserDto.class)).toList();
        }
}
