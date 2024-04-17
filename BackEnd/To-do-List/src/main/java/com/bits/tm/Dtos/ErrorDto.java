package com.bits.tm.Dtos;

import lombok.*;

@NoArgsConstructor
@Builder
@Getter
@Setter
public class ErrorDto {
    private String message;
    public ErrorDto(String message) {
        this.message = message;
    }
}
