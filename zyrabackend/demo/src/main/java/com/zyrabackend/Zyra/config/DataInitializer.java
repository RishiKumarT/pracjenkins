package com.zyrabackend.Zyra.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.zyrabackend.Zyra.entity.Role;
import com.zyrabackend.Zyra.entity.User;
import com.zyrabackend.Zyra.repository.UserRepository;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminConfig adminConfig;

    @Override
    public void run(String... args) {
        // Create admin user if not exists
        if (!userRepository.existsByEmail(adminConfig.getEmail())) {
            User admin = new User();
            admin.setName(adminConfig.getName());
            admin.setEmail(adminConfig.getEmail());
            admin.setPassword(passwordEncoder.encode(adminConfig.getPassword()));
            admin.setRole(Role.ADMIN);
            admin.setDateOfBirth(LocalDate.now()); // You might want to set a specific date
            admin.setContact("1234567890"); // You might want to set a specific contact

            userRepository.save(admin);
            System.out.println("Admin user created successfully!");
        }
    }
} 