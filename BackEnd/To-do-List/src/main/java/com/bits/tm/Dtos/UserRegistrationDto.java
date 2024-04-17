package com.bits.tm.Dtos;

import com.bits.tm.models.Task;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Setter
@Getter
public class UserRegistrationDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
