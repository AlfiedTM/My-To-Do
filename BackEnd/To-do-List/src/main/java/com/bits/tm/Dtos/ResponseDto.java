package com.bits.tm.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)

public class ResponseDto {
    private int statusCode;
    private String response;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String username;
    private Object resource;
    private String error;
}
