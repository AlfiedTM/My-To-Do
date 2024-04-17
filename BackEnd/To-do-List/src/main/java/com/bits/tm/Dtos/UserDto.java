package com.bits.tm.Dtos;

import com.bits.tm.models.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String firstName;
    private String lastName;
    private String email;
    private String login;
    private String token;


}
