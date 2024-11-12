package com.ssafy.edu.jwt.model.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafy.edu.jwt.model.User;
import com.ssafy.edu.jwt.model.UserExample;
import com.ssafy.edu.jwt.model.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class UserServiceImp implements UserService {

	private UserMapper userMapper;
	
	public UserServiceImp(UserMapper userMapper) {
		super();
		this.userMapper = userMapper;
	}

	@Override
	public Optional<User> findByUsername(String username) {
		UserExample uex=new UserExample();
		uex.createCriteria().andUsernameEqualTo(username);
		//uex.createCriteria().andi 로그인 상태인가를 확인할것.
		//log.debug("findByUsername({})----------------",username);
		List<User> user=userMapper.selectByExample(uex);
		//log.debug("findByUsername({})----------------",user.size());
		if(user!=null && user.size()>0) {
			return Optional.ofNullable(user.get(0));
		}else {
			return Optional.ofNullable(null);
		}
	}

	@Override
	public User save(User user) {
		UserExample uex=new UserExample();
		user.setId(null);
		userMapper.insertSelective(user);
		return userMapper.selectByPrimaryKey(user.getId());
	}

}
