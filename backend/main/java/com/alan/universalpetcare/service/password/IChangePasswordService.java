package com.alan.universalpetcare.service.password;

import com.alan.universalpetcare.request.ChangePasswordRequest;

public interface IChangePasswordService {
    void changePassword(Long userId, ChangePasswordRequest request);
}
