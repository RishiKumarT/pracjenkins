package com.zyrabackend.Zyra.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
    private String contact;
} 