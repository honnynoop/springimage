package com.ssafy.edu.jwt.model.service;

import java.util.Optional;

import com.ssafy.edu.jwt.model.User;

public interface UserService {

	Optional<User> findByUsername(String username);

	User save(User user);

}
