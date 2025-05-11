package com.zyrabackend.Zyra.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String size;
    private String color;
    private String material;
    private String imageUrl;
    private Long categoryId;
} 