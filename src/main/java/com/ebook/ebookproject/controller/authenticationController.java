package com.ebook.ebookproject.controller;


import com.ebook.ebookproject.model.ApiResponse;
import com.ebook.ebookproject.model.Authentication;
import com.ebook.ebookproject.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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
    ApiResponse<Authentication> authVerify(@RequestBody Authentication request) {
        var result = authenticationService.ValidateToken(request.getToken());
        return ApiResponse.<Authentication>builder()
                .result(Authentication.builder()
                        .authenticated(result)
                        .build())
                .build();
    }
}
