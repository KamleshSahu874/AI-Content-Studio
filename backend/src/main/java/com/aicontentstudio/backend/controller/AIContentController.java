package com.aicontentstudio.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aicontentstudio.backend.dto.AIContentRequest;
import com.aicontentstudio.backend.entity.BlogPost;
import com.aicontentstudio.backend.repository.BlogPostRepository;
import com.aicontentstudio.backend.service.OpenAIService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIContentController {

    private final OpenAIService openAIService;
    private final BlogPostRepository blogPostRepository;

    public AIContentController(
            OpenAIService openAIService,
            BlogPostRepository blogPostRepository) {

        this.openAIService = openAIService;
        this.blogPostRepository = blogPostRepository;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateContent(
            @RequestBody AIContentRequest request) {

        if (request.getTopic() == null ||
                request.getTopic().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Topic is required");
        }

        if (request.getPlatform() == null ||
                request.getPlatform().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Platform is required");
        }

        try {

            String content =
                    openAIService.generateContent(
                            request.getTopic(),
                            request.getPlatform()
                    );

            BlogPost blogPost = new BlogPost(
                    request.getTopic(),
                    content,
                    request.getPlatform()
            );

            BlogPost savedPost =
                    blogPostRepository.save(blogPost);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "AI content generated and saved successfully",

                            "id",
                            savedPost.getId(),

                            "topic",
                            request.getTopic(),

                            "platform",
                            request.getPlatform(),

                            "content",
                            savedPost.getContent(),

                            "createdAt",
                            savedPost.getCreatedAt()
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "message",
                                    "AI generation failed",

                                    "error",
                                    e.getMessage()
                            )
                    );
        }
    }
}