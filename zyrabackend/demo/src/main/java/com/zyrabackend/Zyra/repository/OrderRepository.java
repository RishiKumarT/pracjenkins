package com.zyrabackend.Zyra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zyrabackend.Zyra.entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
    List<Order> findAllByOrderByOrderDateDesc();
} 