package com.aicontentstudio.backend.dto;

public class AIContentRequest {

    private String topic;
    private String platform;

    public AIContentRequest() {
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }
}