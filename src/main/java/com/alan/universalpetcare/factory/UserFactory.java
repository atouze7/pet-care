package com.alan.universalpetcare.factory;

import com.alan.universalpetcare.model.User;
import com.alan.universalpetcare.request.RegistrationRequest;

public interface UserFactory {
    public User createUser(RegistrationRequest registrationRequest);
}
