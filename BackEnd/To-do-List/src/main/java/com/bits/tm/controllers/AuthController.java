package com.bits.tm.controllers;

import com.bits.tm.Dtos.AuthDto;
import com.bits.tm.Dtos.RequestDto;
import com.bits.tm.Dtos.ResponseDto;
import com.bits.tm.Dtos.UserRegistrationDto;
import com.bits.tm.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    /**User registration controller
     * @param userRegistrationDto
     * @return ResponseEntity<ResponseDto>
     **/

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> signUp(@RequestBody UserRegistrationDto userRegistrationDto){
        return ResponseEntity.ok(authService.signUp(userRegistrationDto));
    }


    /**User sign in controller
     * @param authDto
     * @return ResponseEntity<ResponseDto>
     **/

    @PostMapping("/signIn")
    public ResponseEntity<ResponseDto> signIn(@RequestBody AuthDto authDto){
        return ResponseEntity.ok(authService.signIn(authDto));
    }
    /**User refresh token controller
     * @param authDto
     * @return ResponseEntity<ResponseDto>
     **/

    @PostMapping("/refreshToken")
    public ResponseEntity<ResponseDto> refreshToken(@RequestBody RequestDto requestDto){
        return ResponseEntity.ok(authService.refreshToken(requestDto));
    }

    /**Validate  token controller
     * @param request
     * @return ResponseEntity<ResponseDto>
     **/

    @PostMapping("/validateToken")
    public ResponseEntity<ResponseDto> validateToken(HttpServletRequest request){
        return ResponseEntity.ok(authService.validateAuthToken(request.getHeader("Authorization")));
    }

}
