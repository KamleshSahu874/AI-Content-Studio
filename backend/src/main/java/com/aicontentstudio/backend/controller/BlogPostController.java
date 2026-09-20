package com.aicontentstudio.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aicontentstudio.backend.entity.BlogPost;
import com.aicontentstudio.backend.repository.BlogPostRepository;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogPostController {

    private final BlogPostRepository blogPostRepository;

    public BlogPostController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    // =========================
    // CREATE POST
    // =========================

    @PostMapping
    public ResponseEntity<BlogPost> createPost(
            @RequestBody BlogPost blogPost) {

        // Prevent duplicate content from being saved
        List<BlogPost> existingPosts =
                blogPostRepository.findAll();

        for (BlogPost post : existingPosts) {

            if (post.getTitle() != null
                    && post.getContent() != null
                    && post.getPlatform() != null
                    && post.getTitle().equals(blogPost.getTitle())
                    && post.getContent().equals(blogPost.getContent())
                    && post.getPlatform().equals(blogPost.getPlatform())) {

                return ResponseEntity.ok(post);
            }
        }

        BlogPost savedPost =
                blogPostRepository.save(blogPost);

        return ResponseEntity.ok(savedPost);
    }

    // =========================
    // GET ALL POSTS
    // =========================

    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllPosts() {

        return ResponseEntity.ok(
                blogPostRepository.findAll()
        );
    }

    // =========================
    // GET ONE POST
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getPost(
            @PathVariable Long id) {

        return blogPostRepository
                .findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // UPDATE POST
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updatePost(
            @PathVariable Long id,
            @RequestBody BlogPost updatedPost) {

        return blogPostRepository.findById(id)
                .map(post -> {

                    post.setTitle(updatedPost.getTitle());
                    post.setContent(updatedPost.getContent());
                    post.setPlatform(updatedPost.getPlatform());

                    return ResponseEntity.ok(
                            blogPostRepository.save(post)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // DELETE POST
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long id) {

        if (!blogPostRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        blogPostRepository.deleteById(id);

        return ResponseEntity.ok(
                "Post deleted successfully"
        );
    }
}