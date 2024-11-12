package com.ssafy.edu.board.model.service;

import java.util.List;
import java.util.Optional;

import com.github.pagehelper.PageInfo;
import com.ssafy.edu.board.model.Board;
import com.ssafy.edu.common.util.PageRequest;

public interface BoardService {
	PageInfo<Board> selectAllBoards(PageRequest request);

	void addBoards(Board board);
}
