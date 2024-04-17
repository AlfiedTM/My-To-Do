package com.bits.tm.mappers;

import com.bits.tm.Dtos.UserDto;
import com.bits.tm.Dtos.UserRegistrationDto;
import com.bits.tm.models.User;
import org.springframework.stereotype.Service;;

@Service
public class UserMapper {

    public User mapToUser(UserRegistrationDto userRegistrationDto){
        return User.builder()
                .firstName(userRegistrationDto.getFirstName())
                .lastName(userRegistrationDto.getLastName())
                .password(userRegistrationDto.getPassword())
                .email(userRegistrationDto.getEmail())
                .build();
    }

    public UserDto mapToUserDto(User user){
        return UserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}
