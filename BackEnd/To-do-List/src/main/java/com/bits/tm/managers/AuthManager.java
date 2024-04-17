package com.bits.tm.managers;

import com.bits.tm.Dtos.AuthDto;
import com.bits.tm.Dtos.RequestDto;
import com.bits.tm.Dtos.ResponseDto;
import com.bits.tm.Dtos.UserRegistrationDto;
import com.bits.tm.configurations.security.TodoUserDetailsService;
import com.bits.tm.mappers.UserMapper;
import com.bits.tm.models.User;
import com.bits.tm.services.AuthService;
import com.bits.tm.services.UserService;
import com.bits.tm.utils.JwtUtils;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthManager implements AuthService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private TodoUserDetailsService todoUserDetailsService;

    @Override
    public ResponseDto signUp(UserRegistrationDto userRegistrationDto) {
        ResponseDto response = new ResponseDto();
        try{
            if(userService.findByEmail(userRegistrationDto.getEmail())==null) {
                User user = userMapper.mapToUser(userRegistrationDto);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user = userService.saveUser(user);

//            Set the response
                response.setResponse("Success");
                response.setStatusCode(200);
            }else {
                response.setResponse("Error");
                response.setError("Account already exists");
                response.setStatusCode(500);
            }
        }catch (Exception e){
//            Set the response
            response.setResponse("Error");
            response.setError(e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public ResponseDto signIn(AuthDto authDto) {
        ResponseDto response = new ResponseDto();
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authDto.getEmail(),
                            authDto.getPassword()));

            var user = todoUserDetailsService.loadUserByUsername(authDto.getEmail());
            if(user==null){
                throw new UsernameNotFoundException("Invalid details");
            }

            String jwt = jwtUtils.generateKey(user);
            String refreshToken = jwtUtils.generateRefreshKey(new HashMap<>(), user);


//            Set the response
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setResponse("Successfully Signed in");
        }catch (Exception e){
//            Set the response
            response.setResponse("Error");
            response.setError(e.getMessage());
            response.setStatusCode(500);
        }
        return response;
    }

    @Override
    public ResponseDto refreshToken(RequestDto requestDto) {
        ResponseDto response = new ResponseDto();
        String email = jwtUtils.extractUserName(requestDto.getToken());
        var user = todoUserDetailsService.loadUserByUsername(email);

        if(jwtUtils.isTokenValid(requestDto.getToken(), user)){
            var jwt = jwtUtils.generateKey(user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(response.getToken());
            response.setExpirationTime("24Hrs");
            response.setResponse("Successfully Signed in");
        }else{
            response.setStatusCode(500);
        }
        return response;
    }

    /**Validate token
     * @param token
     * @return
     * */
    @Override
    public ResponseDto validateAuthToken(String token) {
        ResponseDto response = new ResponseDto();
        if (token!=null){
            try{
                String authHeader = token.substring(7);
                String email = jwtUtils.extractUserName(authHeader);
                var user = todoUserDetailsService.loadUserByUsername(email);

                if(jwtUtils.isTokenValid(authHeader, user)){
                    response.setResponse("True");
                }else{
                    response.setResponse("False");
                }
                response.setStatusCode(200);
            } catch (Exception e){
                response.setResponse("False");
            }
        }else {
            response.setStatusCode(200);
            response.setResponse("False");
        }
        return response;
    }


}
