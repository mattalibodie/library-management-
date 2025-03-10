package com.ebook.ebookproject.controller;


import com.ebook.ebookproject.model.ApiResponse;
import com.ebook.ebookproject.model.Authentication;
import com.ebook.ebookproject.model.ValidateToken;
import com.ebook.ebookproject.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class authenticationController {

    AuthenticationService authenticationService;


    @PostMapping("/login")
    ApiResponse<Authentication> authRequest(@RequestBody Authentication request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<Authentication>builder()
                .result(Authentication.builder()
                        .token(result.getToken())
                        .authenticated(true)
                        .build())
                .build();
    }

    @PostMapping("/token/verify")
    ApiResponse<Authentication> authVerify(@RequestBody ValidateToken request) throws ParseException, JOSEException {
        var result = authenticationService.isValidate(request.getToken());
        return ApiResponse.<Authentication>builder()
                .result(Authentication.builder()
                        .authenticated(result)
                        .build())
                .build();
    }
    @PostMapping("/logout")
    ApiResponse<Void> authLogout(@RequestBody Authentication request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .code(200)
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<Object> refreshToken(@RequestBody Authentication request) throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.builder()
                .code(200)
                .result(result)
                .build();
    }
}
