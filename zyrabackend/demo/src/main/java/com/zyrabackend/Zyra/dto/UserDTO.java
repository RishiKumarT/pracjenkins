package com.zyrabackend.Zyra.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate dateOfBirth;
    private String contact;
    private String role;
} 