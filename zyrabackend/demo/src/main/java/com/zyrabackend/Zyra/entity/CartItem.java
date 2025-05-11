package com.zyrabackend.Zyra.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnoreProperties({"items"})
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({"category"})
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    public double getSubtotal() {
        return product.getPrice().multiply(BigDecimal.valueOf(quantity)).doubleValue();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItem cartItem = (CartItem) o;
        return Objects.equals(id, cartItem.id) &&
               Objects.equals(cart, cartItem.cart) &&
               Objects.equals(product, cartItem.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cart, product);
    }
} 