package com.childcare.facilities.controllers;

import com.childcare.facilities.dto.request.LoginRequest;
import com.childcare.facilities.dto.request.SignupRequest;
import com.childcare.facilities.dto.response.MessageResponse;
import com.childcare.facilities.dto.response.UserInfoResponse;
import com.childcare.facilities.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        UserInfoResponse userInfoResponse = userService.authenticateUser(loginRequest);

        return ResponseEntity.ok()
                .body(userInfoResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        String message = userService.createUser(signUpRequest);

        return ResponseEntity
                    .ok(new MessageResponse(message));
    }
}
