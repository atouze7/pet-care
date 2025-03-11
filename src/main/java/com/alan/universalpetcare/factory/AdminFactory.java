package com.alan.universalpetcare.factory;

import com.alan.universalpetcare.repository.AdminRepository;
import com.alan.universalpetcare.request.RegistrationRequest;
import com.alan.universalpetcare.service.user.UserAttributesMapper;
import com.alan.universalpetcare.model.Admin;
import com.alan.universalpetcare.service.role.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminFactory {
    private final AdminRepository adminRepository;
    private final UserAttributesMapper userAttributesMapper;
    private final IRoleService roleService;


    public Admin createAdmin(RegistrationRequest request) {
        Admin admin = new Admin();
        admin.setRoles(roleService.setUserRole("ADMIN"));
        userAttributesMapper.setCommonAttributes(request, admin);
        return adminRepository.save(admin);
    }
}
