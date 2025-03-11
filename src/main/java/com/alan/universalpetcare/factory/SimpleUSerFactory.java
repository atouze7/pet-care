package com.alan.universalpetcare.factory;

import com.alan.universalpetcare.exception.AlreadyExistsException;
import com.alan.universalpetcare.request.RegistrationRequest;
import com.alan.universalpetcare.model.User;
import com.alan.universalpetcare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SimpleUSerFactory implements UserFactory {
    private final UserRepository userRepository;
    private final VetFactory veterinarianFactory;
    private final PatientFactory patientFactory;
    private final AdminFactory adminFactory;
    private final PasswordEncoder passwordEncoder;



    @Override
    public User createUser(RegistrationRequest registrationRequest) {
        if(userRepository.existsByEmail(registrationRequest.getEmail())) {
            throw new AlreadyExistsException("Oops! "+registrationRequest.getEmail()+ " already exists!" );
        }
         registrationRequest.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

        switch (registrationRequest.getUserType()) {
            case "VET" ->{return veterinarianFactory.createVeterinarian(registrationRequest);
            }
            case "PATIENT" -> { return  patientFactory.createPatient(registrationRequest);
            }
            case "ADMIN" -> {return adminFactory.createAdmin(registrationRequest);
            }
            default -> {
                return null;
            }
        }


    }
}
