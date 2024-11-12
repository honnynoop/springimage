package com.ssafy.edu.jwt.config;

import com.ssafy.edu.jwt.model.Token;
import com.ssafy.edu.jwt.model.service.TokenService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@Slf4j
public class CustomLogoutHandler implements LogoutHandler {

    private final TokenService tokenRepository;

    public CustomLogoutHandler(TokenService tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        String token = authHeader.substring(7);//Bearer  제거
        Token storedToken = tokenRepository.findByAccessToken(token).orElse(null);
        if(storedToken != null) {
            storedToken.setIsLoggedOut(true);
            tokenRepository.updatgDsave(storedToken);
        }
    }
}
