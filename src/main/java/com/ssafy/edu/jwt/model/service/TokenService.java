package com.ssafy.edu.jwt.model.service;

import java.util.List;
import java.util.Optional;

import com.ssafy.edu.jwt.model.Token;

public interface TokenService {
	List<Token> findAllAccessTokensByUser(Integer userId);
	
    Optional<Token> findByAccessToken(String token);

    Optional<Token > findByRefreshToken(String token);

	void save(Token token);

	void saveAll(List<Token> validTokens);

	void updatgDsave(Token storedToken);
}
