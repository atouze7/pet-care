package com.alan.universalpetcare.service.vet;

import com.alan.universalpetcare.exception.ResourceNotFoundException;
import com.alan.universalpetcare.model.Vet;
import com.alan.universalpetcare.repository.AppointmentRepository;
import com.alan.universalpetcare.repository.ReviewRepository;
import com.alan.universalpetcare.repository.VetRepository;
import com.alan.universalpetcare.dto.EntityConverter;
import com.alan.universalpetcare.dto.UserDto;
import com.alan.universalpetcare.model.Appointment;
import com.alan.universalpetcare.repository.UserRepository;
import com.alan.universalpetcare.service.photo.PhotoService;
import com.alan.universalpetcare.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class VetService implements IVetService {
    private final VetRepository vetRepository;
    private final EntityConverter<Vet, UserDto> entityConverter;
    private final ReviewService reviewService;
    private final ReviewRepository reviewRepository;
    private final PhotoService photoService;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;


    @Override
    public List<UserDto> getAllVeterinariansWithDetails(){
           List<Vet> vets = userRepository.findAllByUserType("VET");
           return vets.stream()
                   .map(this ::mapVeterinarianToUserDto)
                   .toList();
       }

    @Override
    public List<String> getSpecializations() {
        return vetRepository.getSpecializations();
    }

    @Override
    public List<UserDto> findAvailableVetsForAppointment(String specialization, LocalDate date, LocalTime time){
        List<Vet> filteredVets = getAvailableVeterinarians(specialization, date, time);
        return  filteredVets.stream()
                .map(this ::mapVeterinarianToUserDto)
                .toList();
    }

    @Override
    public List<Vet> getVeterinariansBySpecialization(String specialization) {
        if(!vetRepository.existsBySpecialization(specialization)){
            throw new ResourceNotFoundException("No veterinarian found with" +specialization +" in the system");
        }
        return vetRepository.findBySpecialization(specialization);

    }


    private UserDto mapVeterinarianToUserDto(Vet vet) {
        UserDto userDto = entityConverter.mapEntityToDto(vet, UserDto.class);
        double averageRating = reviewService.getAverageRatingForVet(vet.getId());
        Long totalReviewer = reviewRepository.countByVeterinarianId(vet.getId());
        userDto.setAverageRating(averageRating);
        userDto.setTotalReviewers(totalReviewer);
        if(vet.getPhoto() != null){
            try {
                byte[] photoBytes = photoService.getImageData(vet.getPhoto().getId());
                userDto.setPhoto(photoBytes);
            } catch (SQLException e){
                throw new RuntimeException(e.getMessage());
            }
        }

        return userDto;
    }


    private List<Vet> getAvailableVeterinarians(String specialization, LocalDate date, LocalTime time){
        List<Vet> vets = getVeterinariansBySpecialization(specialization);
        return vets.stream()
                .filter(vet -> isVetAvailable(vet, date, time))
                .toList();

    }

      private boolean isVetAvailable(Vet vet, LocalDate requestedDate, LocalTime requestedTime){
          if(requestedDate != null && requestedTime != null){
              LocalTime requestedEndTime = requestedTime.plusHours(2);
              return appointmentRepository.findByVeterinarianAndAppointmentDate(vet, requestedDate)
                      .stream()
                      .noneMatch(existingAppointment -> doesAppointmentOverLap(existingAppointment, requestedTime, requestedEndTime));
          }
          return true;
      }

    private boolean doesAppointmentOverLap(Appointment existingAppointment, LocalTime requestedStartTime, LocalTime requestedEndTime){
        LocalTime existingStartTime = existingAppointment.getAppointmentTime();
        LocalTime existingEndTime = existingStartTime.plusHours(2);
        LocalTime unavailableStartTime = existingStartTime.minusHours(1);
        LocalTime unavailableEndTime = existingEndTime.plusMinutes(170);
        return !requestedStartTime.isBefore(unavailableStartTime) && !requestedEndTime.isAfter(unavailableEndTime);
    }

    @Override
    public   List<Map<String, Object>> aggregateVetsBySpecialization(){
        List<Object[]> results = vetRepository.countVetsBySpecialization();
        return results.stream()
                .map(result -> Map.of("specialization", result[0], "count", result[1]))
                .collect(Collectors.toList());
    }

}
