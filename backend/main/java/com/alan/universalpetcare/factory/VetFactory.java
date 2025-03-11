package com.alan.universalpetcare.factory;

import com.alan.universalpetcare.repository.VetRepository;
import com.alan.universalpetcare.request.RegistrationRequest;
import com.alan.universalpetcare.service.user.UserAttributesMapper;
import com.alan.universalpetcare.model.Vet;
import com.alan.universalpetcare.service.role.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VetFactory {
    private final VetRepository vetRepository;
    private final UserAttributesMapper userAttributesMapper;
    private final IRoleService roleService;

    public Vet createVeterinarian(RegistrationRequest request) {
        Vet vet = new Vet();
        vet.setRoles(roleService.setUserRole("VET"));
        userAttributesMapper.setCommonAttributes(request, vet);
        vet.setSpecialization(request.getSpecialization());
        return vetRepository.save(vet);
    }
}
