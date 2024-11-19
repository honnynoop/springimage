package com.ssafy.edu.jwt.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("message")
    private String message;
    @JsonProperty("user")
    private User user;
    public AuthenticationResponse(String accessToken, String refreshToken, String message) {
        this.accessToken = accessToken;
        this.message = message;
        this.refreshToken = refreshToken;
    }

    public AuthenticationResponse(User loginUser, String accessToken, String refreshToken, String string) {
    	this.accessToken = accessToken;
        this.message = message;
        this.refreshToken = refreshToken;
        this.user=loginUser;
	}

	public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getMessage() {
        return message;
    }


}
