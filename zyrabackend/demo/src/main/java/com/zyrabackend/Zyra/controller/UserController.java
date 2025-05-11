package com.zyrabackend.Zyra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.zyrabackend.Zyra.security.UserPrincipal;
import com.zyrabackend.Zyra.entity.User;
import com.zyrabackend.Zyra.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getId();
    }

    @GetMapping("/address")
    public ResponseEntity<?> getUserAddress() {
        Long userId = getCurrentUserId();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(Map.of(
            "shippingAddress", user.getShippingAddress(),
            "billingAddress", user.getBillingAddress()
        ));
    }

    @PutMapping("/address")
    public ResponseEntity<?> updateUserAddress(@RequestBody Map<String, String> addressRequest) {
        Long userId = getCurrentUserId();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setShippingAddress(addressRequest.getOrDefault("shippingAddress", user.getShippingAddress()));
        user.setBillingAddress(addressRequest.getOrDefault("billingAddress", user.getBillingAddress()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of(
            "shippingAddress", user.getShippingAddress(),
            "billingAddress", user.getBillingAddress()
        ));
    }
} 