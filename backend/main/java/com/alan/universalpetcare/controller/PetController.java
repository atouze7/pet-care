package com.alan.universalpetcare.controller;


import com.alan.universalpetcare.exception.ResourceNotFoundException;
import com.alan.universalpetcare.model.Pet;
import com.alan.universalpetcare.response.ApiResponse;

import com.alan.universalpetcare.service.pet.IPetService;
import com.alan.universalpetcare.utils.FeedBackMessage;
import com.alan.universalpetcare.utils.UrlMapping;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping(UrlMapping.PETS)
@RequiredArgsConstructor
public class PetController {
    private final IPetService petService;


    @PutMapping(UrlMapping.SAVE_PETS_FOR_APPOINTMENT)
    public ResponseEntity<ApiResponse> savePets(@RequestParam Long appointmentId, @RequestBody List<Pet> pets) {
        try {
            List<Pet> savedPets = petService.savePetsForAppointment(appointmentId, pets);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.PET_ADDED_SUCCESS, savedPets));
        } catch (RuntimeException e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping(UrlMapping.GET_PET_BY_ID)
    public ResponseEntity<ApiResponse> getPetById(@PathVariable Long petId) {
        try {
            Pet pet = petService.getPetById(petId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.PET_FOUND, pet));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping(UrlMapping.DELETE_PET_BY_ID)
    public ResponseEntity<ApiResponse> deletePetById(@PathVariable Long petId) {
        try {
            petService.deletePet(petId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.PET_DELETE_SUCCESS, null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PutMapping(UrlMapping.UPDATE_PET)
    public ResponseEntity<ApiResponse> updatePet(@PathVariable Long petId, @RequestBody Pet pet) {
        try {
            Pet thePet = petService.updatePet(pet, petId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.PET_UPDATE_SUCCESS, thePet));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping(UrlMapping.GET_PET_TYPES)
    public ResponseEntity<ApiResponse> getAllPetTypes(){
        return  ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, petService.getPetTypes()));
    }

    @GetMapping(UrlMapping.GET_PET_COLORS)
    public ResponseEntity<ApiResponse> getAllPetColors(){
        return  ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, petService.getPetColors()));
    }

    @GetMapping(UrlMapping.GET_PET_BREEDS)
    public ResponseEntity<ApiResponse> getAllPetBreeds(@RequestParam String petType){
        return  ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, petService.getPetBreeds(petType)));
    }
}


