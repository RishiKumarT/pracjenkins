package com.zyrabackend.Zyra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.zyrabackend.Zyra.entity.Cart;
import com.zyrabackend.Zyra.security.UserPrincipal;
import com.zyrabackend.Zyra.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart() {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(cartService.getOrCreateCart(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<Cart> addItemToCart(
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(cartService.addItemToCart(userId, productId, quantity));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<Cart> updateCartItem(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(cartService.updateCartItem(userId, productId, quantity));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long productId) {
        Long userId = getCurrentUserId();
        return ResponseEntity.ok(cartService.removeItemFromCart(userId, productId));
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart() {
        Long userId = getCurrentUserId();
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getId();
    }
} 