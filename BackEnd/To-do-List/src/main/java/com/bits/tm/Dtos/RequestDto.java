package com.bits.tm.Dtos;

import lombok.Data;

@Data
public class RequestDto {
    private String token;
    private String refreshToken;
}
