package com.alan.universalpetcare.service.token;

import com.alan.universalpetcare.model.User;
import com.alan.universalpetcare.model.VerificationToken;

import java.util.Optional;

public interface IVerificationTokenService {
    String validateToken(String token);
    void saveVerificationTokenForUser(String token, User user );
    VerificationToken generateNewVerificationToken(String oldToken);
    Optional<VerificationToken> findByToken(String token);
    void deleteVerificationToken(Long tokenId);
    boolean isTokenExpired(String token);
}
