package com.zyrabackend.Zyra.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zyrabackend.Zyra.entity.*;
import com.zyrabackend.Zyra.repository.OrderRepository;
import com.zyrabackend.Zyra.repository.ProductRepository;
import com.zyrabackend.Zyra.repository.UserRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    @Transactional
    public Order createOrder(Long userId, String shippingAddress, String billingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.getOrCreateCart(userId);
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.SHIPPED);
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            BigDecimal subtotal = BigDecimal.valueOf(cartItem.getSubtotal());
            orderItem.setSubtotal(subtotal);
            order.getItems().add(orderItem);
            total = total.add(subtotal);

            // Update product stock
            Product product = cartItem.getProduct();
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);
        }

        // Set the total amount before saving
        order.setTotalAmount(total.doubleValue());
        
        // Save the order
        Order savedOrder = orderRepository.save(order);

        // Clear the cart after successful order
        cartService.clearCart(userId);

        return savedOrder;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }
} 