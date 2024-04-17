package com.bits.tm.services;


import com.bits.tm.Dtos.AuthDto;
import com.bits.tm.Dtos.RequestDto;
import com.bits.tm.Dtos.ResponseDto;
import com.bits.tm.Dtos.UserRegistrationDto;
import com.bits.tm.models.User;

public interface AuthService {
    /**
     * User registration
     *
     * @return
     * @Param userRegistrationDto
     */
    ResponseDto signUp(UserRegistrationDto userRegistrationDto);

    /**
     * User login service
     *
     * @param authDto
     * @return AuthDto
     */
    ResponseDto signIn(AuthDto authDto);

    /**
     * Refresh Auth Token
     *
     * @param requestDto
     * @return
     */
    ResponseDto refreshToken(RequestDto requestDto);


    /**
     * Validate Auth Token
     *
     * @param token
     * @return
     */
    ResponseDto validateAuthToken(String token);

}
