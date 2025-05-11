package com.zyrabackend.Zyra.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zyrabackend.Zyra.entity.Cart;
import com.zyrabackend.Zyra.entity.CartItem;
import com.zyrabackend.Zyra.entity.Product;
import com.zyrabackend.Zyra.entity.User;
import com.zyrabackend.Zyra.repository.CartRepository;
import com.zyrabackend.Zyra.repository.ProductRepository;
import com.zyrabackend.Zyra.repository.UserRepository;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Cart getOrCreateCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = user.getCart() != null ? user.getCart() : createNewCart(user);

        // Adjust cart items if quantity > stock
        boolean changed = false;
        for (CartItem item : cart.getItems()) {
            int stock = item.getProduct().getStock();
            if (item.getQuantity() > stock) {
                item.setQuantity(stock);
                changed = true;
            }
        }
        if (changed) {
            cartRepository.save(cart);
        }
        return cart;
    }

    @Transactional
    public Cart addItemToCart(Long userId, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    @Transactional
    public Cart updateCartItem(Long userId, Long productId, Integer quantity) {
        try {
            if (quantity <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }

            Cart cart = getOrCreateCart(userId);
            if (cart == null) {
                throw new RuntimeException("Failed to get or create cart for user: " + userId);
            }

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

            if (product.getStock() < quantity) {
                throw new RuntimeException("Insufficient stock. Available: " + product.getStock() + ", Requested: " + quantity);
            }

            CartItem cartItem = cart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Product with ID " + productId + " not found in cart"));

            cartItem.setQuantity(quantity);
            return cartRepository.save(cart);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update cart item: " + e.getMessage(), e);
        }
    }

    @Transactional
    public Cart removeItemFromCart(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        return cartRepository.save(cart);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart createNewCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }
} 