package com.alan.universalpetcare.service.role;

import com.alan.universalpetcare.exception.ResourceNotFoundException;
import com.alan.universalpetcare.repository.RoleRepository;
import com.alan.universalpetcare.utils.FeedBackMessage;
import com.alan.universalpetcare.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;


    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public Role getRoleByName(String roleName) {
        return roleRepository.findByName(roleName).orElse(null);
    }

    @Override
    public void saveRole(Role role) {
        roleRepository.save(role);

    }

    @Override
    public Set<Role> setUserRole(String userType) {
        Set<Role> userRoles = new HashSet<>();
        roleRepository.findByName("ROLE_"+userType)
                .ifPresentOrElse(userRoles::add, () -> {
                    //throw new ResourceNotFoundException(FeedBackMessage.ROLE_NOT_FOUND);
                });
        return userRoles;
    }
}
