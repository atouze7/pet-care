package com.alan.universalpetcare.service.user;

import com.alan.universalpetcare.model.User;
import com.alan.universalpetcare.request.RegistrationRequest;
import org.springframework.stereotype.Component;

@Component
public class UserAttributesMapper {
    public void setCommonAttributes(RegistrationRequest source, User target) {
        target.setFirstName(source.getFirstName());
        target.setLastName(source.getLastName());
        target.setGender(source.getGender());
        target.setPhoneNumber(source.getPhoneNumber());
        target.setEmail(source.getEmail());
        target.setPassword(source.getPassword());
        target.setEnabled(source.isEnabled());
        target.setUserType(source.getUserType());
    }
}
