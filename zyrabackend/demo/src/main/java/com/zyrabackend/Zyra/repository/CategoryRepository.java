package com.zyrabackend.Zyra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zyrabackend.Zyra.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Basic CRUD operations are automatically provided by JpaRepository
    // You can add custom query methods here if needed
} 