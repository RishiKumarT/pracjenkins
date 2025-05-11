package com.zyrabackend.Zyra.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"orders", "cart"})
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("order")
    private List<OrderItem> items = new ArrayList<>();

    @Column(name = "order_date")
    private LocalDateTime orderDate = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "billing_address")
    private String billingAddress;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @PrePersist
    public void prePersist() {
        if (this.totalAmount == null) {
            this.totalAmount = 0.0;
        }
    }

    public void setTotal(double total) {
        this.totalAmount = total;
    }

    public double getTotal() {
        return this.totalAmount != null ? this.totalAmount : 0.0;
    }
} 