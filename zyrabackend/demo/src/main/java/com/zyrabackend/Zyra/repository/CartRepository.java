package com.zyrabackend.Zyra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zyrabackend.Zyra.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
} 