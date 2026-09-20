package com.aicontentstudio.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aicontentstudio.backend.entity.BlogPost;

public interface BlogPostRepository
        extends JpaRepository<BlogPost, Long> {
}