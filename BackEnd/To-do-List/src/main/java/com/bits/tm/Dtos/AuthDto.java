package com.bits.tm.Dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Setter
@Getter
public class AuthDto {
    private String password;
    private String email;
}
