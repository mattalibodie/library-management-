package com.ebook.ebookproject.service;


import com.ebook.ebookproject.entity.Roles;
import com.ebook.ebookproject.entity.User;
import com.ebook.ebookproject.exception.AppException;
import com.ebook.ebookproject.exception.ErrorCode;
import com.ebook.ebookproject.model.Authentication;
import com.ebook.ebookproject.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;

import java.time.temporal.ChronoUnit;
import java.util.Date;

import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    UserRepository userRepository;

    @Value("${signer_key}")
    private String signerKey = System.getProperty("signer_key");



    public Authentication authenticate(Authentication authentication) {
        var user = userRepository.findUserByUsername((authentication.getUsername())
                .describeConstable()
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND)));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if(user.isEmpty()){
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        boolean isAuthenticated = passwordEncoder.matches(authentication.getPassword(), user.get().getPassword());
        if(!isAuthenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        var token = generateToken(user.get());

        return Authentication.builder()
                .token(token)
                .build();
    }


    private String generateToken(User user) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        log.info("User: {}", user.getRoles().toString());
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("luongb2110945@student.ctu.edu.vn")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope",createScope(user))
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
    private String createScope(User user){
        String role = "";
        if(!CollectionUtils.isEmpty(user.getRoles())){
            role  = user.getRoles().stream().map(Roles::getName).collect(Collectors.joining(" "));
        }
        return role;
    }
}