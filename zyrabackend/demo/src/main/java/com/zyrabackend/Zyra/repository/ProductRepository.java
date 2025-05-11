package com.zyrabackend.Zyra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zyrabackend.Zyra.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByColor(String color);
    List<Product> findBySize(String size);
    List<Product> findByMaterial(String material);
} 