package com.aicontentstudio.backend.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final PasswordEncoder passwordEncoder;

    public TestController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/test")
    public String test() {
        return "AI Content Studio Backend is Running!";
    }

    @GetMapping("/api/test-password")
    public String testPassword() {
        return passwordEncoder.encode("test123");
    }
}