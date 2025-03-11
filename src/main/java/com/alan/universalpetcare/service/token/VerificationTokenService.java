package com.alan.universalpetcare.service.token;

import com.alan.universalpetcare.repository.VerificationTokenRepository;
import com.alan.universalpetcare.model.User;
import com.alan.universalpetcare.model.VerificationToken;
import com.alan.universalpetcare.repository.UserRepository;
import com.alan.universalpetcare.utils.FeedBackMessage;
import com.alan.universalpetcare.utils.SystemUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerificationTokenService implements IVerificationTokenService {
    private final UserRepository userRepository;
    private final VerificationTokenRepository tokenRepository;


    @Override
    public String validateToken(String token) {
        Optional<VerificationToken> theToken = findByToken(token);
        if (theToken.isEmpty()) {
            return FeedBackMessage.INVALID_TOKEN;
        }
        User user = theToken.get().getUser();
        if (user.isEnabled()){
            return FeedBackMessage.TOKEN_ALREADY_VERIFIED;
        }
        if (isTokenExpired(token)){
            return FeedBackMessage.EXPIRED_TOKEN;
        }
        user.setEnabled(true);
        userRepository.save(user);
        return FeedBackMessage.VALID_VERIFICATION_TOKEN;
    }

    @Override
    public void saveVerificationTokenForUser(String token, User user) {
        var verificationToken = new VerificationToken(token, user);
        tokenRepository.save(verificationToken);

    }

     @Transactional
    @Override
    public VerificationToken generateNewVerificationToken(String oldToken) {
        Optional<VerificationToken> theToken = findByToken(oldToken);
        if (theToken.isPresent()) {
           var verificationToken = theToken.get();
           verificationToken.setToken(UUID.randomUUID().toString());
           verificationToken.setExpirationDate(SystemUtils.getExpirationTime());
         return tokenRepository.save(verificationToken);
        }else {
            throw new IllegalArgumentException(FeedBackMessage.INVALID_VERIFICATION_TOKEN + oldToken);
        }

    }

    @Override
    public Optional<VerificationToken> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    @Override
    public void deleteVerificationToken(Long tokenId) {
        tokenRepository.deleteById(tokenId);

    }

    @Override
    public boolean isTokenExpired(String token) {
        Optional<VerificationToken> theToken = findByToken(token);
        if (theToken.isEmpty()) {
            return true;
        }
        VerificationToken verificationToken = theToken.get();
        return verificationToken.getExpirationDate().getTime() <= Calendar.getInstance().getTime().getTime();
    }
}
