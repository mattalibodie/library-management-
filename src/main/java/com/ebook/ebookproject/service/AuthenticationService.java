package com.ebook.ebookproject.service;


import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.Authentication;
import com.ebook.ebookproject.model.ValidateToken;
import com.ebook.ebookproject.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    UserRepository userRepository;

    @NonFinal
    protected static final String signerKey = "7uIwNEXDLlI9ZiXchmaeFcIVXyx2LEQSvRGq128nCC3ESk39JWYPEgQcZ7PsCV6G";

    public Authentication authenticate(Authentication authentication) {
        var user = userRepository.findUserByUsername((authentication.getUsername())
                .describeConstable()
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND)));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        boolean isAuthenticated = passwordEncoder.matches(authentication.getPassword(), user.get().getPassword());
        if(!isAuthenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        var token = generateToken(authentication.getUsername());

        return Authentication.builder()
                .token(token)
                .build();
    }


    private String generateToken(String username) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issuer("luongb2110945@student.ctu.edu.vn")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("description", "description")
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try{
            jwsObject.sign(new MACSigner(signerKey));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean ValidateToken(String token){
        try{
            JWSVerifier verifier = new MACVerifier(signerKey.getBytes());
            SignedJWT signedJWT = SignedJWT.parse(token);
            var isVerify = signedJWT.verify(verifier);

            Date expireTime = signedJWT.getJWTClaimsSet().getExpirationTime();

            return isVerify && expireTime.after(new Date());
        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
    }


}
