package com.alan.universalpetcare.service.user;

import com.alan.universalpetcare.dto.UserDto;
import com.alan.universalpetcare.model.User;
import com.alan.universalpetcare.request.RegistrationRequest;
import com.alan.universalpetcare.request.UserUpdateRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IUserService {
    User register(RegistrationRequest request);

    User update(Long userId, UserUpdateRequest request);

    User findById(Long userId);

    void delete(Long userId);


    List<UserDto> getAllUsers();

    UserDto getUserWithDetails(Long userId) throws SQLException;

    long countVeterinarians();

    long countPatients();

    long countAllUsers();

    Map<String, Map<String,Long>> aggregateUsersByMonthAndType();



    Map<String, Map<String, Long>> aggregateUsersByEnabledStatusAndType();

}
