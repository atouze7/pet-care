package com.alan.universalpetcare.data;

import com.alan.universalpetcare.model.Vet;
import com.alan.universalpetcare.repository.*;
import com.alan.universalpetcare.model.Admin;
import com.alan.universalpetcare.model.Patient;
import com.alan.universalpetcare.model.Role;
import com.alan.universalpetcare.service.role.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
@Transactional
@RequiredArgsConstructor
public class DefaultDataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    private final UserRepository userRepository;
    private final VetRepository vetRepository;
   private final PatientRepository patientRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;
    private final RoleService roleService;


    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
          Set<String> defaultRoles =  Set.of("ROLE_ADMIN", "ROLE_PATIENT", "ROLE_VET");
        //createDefaultRoleIfNotExits(defaultRoles);

        createDefaultAdminIfNotExists();
       createDefaultVetIfNotExits();
       createDefaultPatientIfNotExits();
    }

    private void createDefaultVetIfNotExits(){
        Role vetRole = roleService.getRoleByName("ROLE_VET");
        for (int i = 1; i<=10; i++){
            String defaultEmail = "vet"+i+"@gmail.com";
            if (userRepository.existsByEmail(defaultEmail)){
                continue;
            }
            Vet vet = new Vet();
            vet.setFirstName("Vet");
            vet.setLastName("Number" + i);
            vet.setGender("Not Specified");
            vet.setPhoneNumber("1234567890");
            vet.setEmail(defaultEmail);
            vet.setPassword(passwordEncoder.encode("password"+i));
            vet.setUserType("VET");
            vet.setRoles(new HashSet<>(Collections.singletonList(vetRole)));
            vet.setSpecialization("Dermatologist");
            Vet theVet = vetRepository.save(vet);
            theVet.setEnabled(true);
            System.out.println("Default vet user " + i + " created successfully.");
        }
    }


    private void createDefaultPatientIfNotExits(){
        Role patientRole =  roleService.getRoleByName("ROLE_PATIENT");
        for (int i = 1; i<=10; i++){
            String defaultEmail = "pat"+i+"@gmail.com";
            if (userRepository.existsByEmail(defaultEmail)){
                continue;
            }
            Patient pat = new Patient();
            pat.setFirstName("Pat");
            pat.setLastName("Patient" + i);
            pat.setGender("Not Specified");
            pat.setPhoneNumber("1234567890");
            pat.setEmail(defaultEmail);
            pat.setPassword(passwordEncoder.encode("password"+i));
            pat.setUserType("PATIENT");
            pat.setRoles(new HashSet<>(Collections.singletonList(patientRole)));
            Patient thePatient = patientRepository.save(pat);
            thePatient.setEnabled(true);
            System.out.println("Default vet user " + i + " created successfully.");
        }
    }


    private void createDefaultAdminIfNotExists() {
        Role adminRole = roleService.getRoleByName("ROLE_ADMIN");
        final String defaultAdminEmail = "admin@email.com";
        if (userRepository.findByEmail(defaultAdminEmail).isPresent()) {
            return;
        }

        Admin admin = new Admin();
        admin.setFirstName("UPC");
        admin.setLastName("Admin 2");
        admin.setGender("Female");
        admin.setPhoneNumber("22222222");
        admin.setEmail(defaultAdminEmail);
        admin.setPassword(passwordEncoder.encode("00220033"));
        admin.setUserType("ADMIN");
        admin.setRoles(new HashSet<>(Collections.singletonList(adminRole)));
        Admin theAdmin = adminRepository.save(admin);
        theAdmin.setEnabled(true);
        System.out.println("Default admin user created successfully.");
    }


    private void createDefaultRoleIfNotExits(Set<String> roles){
        roles.stream()
                .filter(role -> roleRepository.findByName(role).isEmpty())
                .map(Role :: new).forEach(roleRepository::save);

    }
}
