package com.alan.universalpetcare.service.password;

import com.alan.universalpetcare.exception.ResourceNotFoundException;
import com.alan.universalpetcare.model.User;
import com.alan.universalpetcare.repository.UserRepository;
import com.alan.universalpetcare.request.ChangePasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChangePasswordService implements IChangePasswordService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void changePassword(Long userId, ChangePasswordRequest request ) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
         if(Objects.equals(request.getCurrentPassword(), "")
                 || Objects.equals(request.getNewPassword(), "")) {
             throw new IllegalArgumentException("All fields are required");
         }
         if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
             throw new IllegalArgumentException("Current password does not match");
         }
         if(!request.getNewPassword().equals(request.getConfirmNewPassword())) {
             throw new IllegalArgumentException("Password confirmation mis-match ");
         }
         user.setPassword(passwordEncoder.encode(request.getNewPassword()));
         userRepository.save(user);

    }
}
