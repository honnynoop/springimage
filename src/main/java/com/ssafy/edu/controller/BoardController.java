package com.ssafy.edu.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.ssafy.edu.board.model.Board;
import com.ssafy.edu.board.model.service.BoardService;
import com.ssafy.edu.common.util.PageRequest;

import lombok.extern.slf4j.Slf4j;

@RestController
//@CrossOrigin("*")
@Slf4j
@RequestMapping("/board")
public class BoardController {

	private final BoardService boardService;
	
	public BoardController(BoardService boardService) {
		super();
		this.boardService = boardService;
	}

	@PostMapping("/page")
    public PageInfo<Board> selectBoard(@RequestBody PageRequest preq ) throws Exception {
      return boardService.selectAllBoards(preq);
    }
	@PostMapping("/add")
    public ResponseEntity<?> addBoard(@RequestBody Board board ) throws Exception {
       boardService.addBoards(board);
       return new ResponseEntity<String>("add Suceess", HttpStatusCode.valueOf(200));
    }
	
}
/*
http://localhost:8080/login
{
"username":"kal@naver.com",
"password":"123456"
}

{
"access_token": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJrYWxAbmF2ZXIuY29tIiwiaWF0IjoxNzMwOTg4MDAwLCJleHAiOjE3MzEwNzQ0MDB9.JfIyhC7pHu0_RzTZanlrBgSeAng1fSGNnXZWwCxhoMT-h3sxjU9AGuXHDNDk6VN2",
"refresh_token": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJrYWxAbmF2ZXIuY29tIiwiaWF0IjoxNzMwOTg4MDAwLCJleHAiOjE3MzE1OTI4MDB9.ghLm5iY13LOjiI5yU742sd89pAPQvDfyQhfwZAbhSStpEF3mEPpS77tPPT3Nk2w6",
"message": "User login was successful"
}
post
http://localhost:8080/board/page
Authorization
Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJrYWxAbmF2ZXIuY29tIiwiaWF0IjoxNzMwOTg4MDAwLCJleHAiOjE3MzEwNzQ0MDB9.JfIyhC7pHu0_RzTZanlrBgSeAng1fSGNnXZWwCxhoMT-h3sxjU9AGuXHDNDk6VN2

	private int pageNum;
	private int pageSize;
	private String keyword;
    private String search;
{
	"pageNum":"1",
	"pageSize":"20",
	"keyword":"title",
	"search":"안녕"
}    
    
    
    
*/