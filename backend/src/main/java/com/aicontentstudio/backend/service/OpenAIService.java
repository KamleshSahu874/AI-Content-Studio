package com.aicontentstudio.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class OpenAIService {

    private final RestClient restClient;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    public OpenAIService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .build();
    }

    public String generateContent(String topic, String platform) {

        String prompt = """
                Create content for the following topic:

                Topic: %s
                Platform: %s

                If the platform is BLOG:
                - Create an engaging title
                - Write a well-structured article
                - Include an introduction, main sections and conclusion

                If the platform is LINKEDIN:
                - Create a professional LinkedIn post
                - Include a strong opening
                - Include relevant hashtags

                If the platform is INSTAGRAM:
                - Create an engaging Instagram caption
                - Include relevant hashtags

                If the platform is TWITTER:
                - Create a concise social media post
                - Keep it engaging and easy to read

                Return only the generated content.
                """.formatted(topic, platform);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "input", prompt
        );

        Map<?, ?> response = restClient.post()
                .uri("/responses")
                .header(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + apiKey
                )
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(Map.class);

        if (response == null) {
            throw new RuntimeException("Empty response from OpenAI");
        }

        return extractOutputText(response);
    }

    private String extractOutputText(Map<?, ?> response) {

        Object outputObject = response.get("output");

        if (!(outputObject instanceof List<?> outputList)) {
            throw new RuntimeException(
                    "No output found in OpenAI response"
            );
        }

        StringBuilder result = new StringBuilder();

        for (Object outputItem : outputList) {

            if (!(outputItem instanceof Map<?, ?> item)) {
                continue;
            }

            Object contentObject = item.get("content");

            if (!(contentObject instanceof List<?> contentList)) {
                continue;
            }

            for (Object contentItem : contentList) {

                if (!(contentItem instanceof Map<?, ?> content)) {
                    continue;
                }

                Object text = content.get("text");

                if (text != null) {
                    result.append(text);
                }
            }
        }

        if (result.length() == 0) {
            throw new RuntimeException(
                    "No generated text found in OpenAI response"
            );
        }

        return result.toString();
    }
}