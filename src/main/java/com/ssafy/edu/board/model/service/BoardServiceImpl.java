package com.ssafy.edu.board.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ssafy.edu.board.model.Board;
import com.ssafy.edu.board.model.BoardExample;
import com.ssafy.edu.board.model.mapper.BoardMapper;
import com.ssafy.edu.common.util.PageRequest;
import com.ssafy.edu.common.util.ToLike;

@Service
public class BoardServiceImpl implements BoardService {

	private final BoardMapper boardDao;
	
	public BoardServiceImpl(BoardMapper boardDao) {
		this.boardDao = boardDao;
	}

	@Override
	public PageInfo<Board> selectAllBoards(PageRequest preq) {
		
		BoardExample empcriteria=new BoardExample();
		if(preq.getKeyword()!=null && preq.getKeyword().equals("title")) {
			empcriteria.or().andTitleLike(ToLike.toLike(preq.getSearch()));
		}else if(preq.getKeyword()!=null && preq.getKeyword().equals("boardcontent")) {
			empcriteria.or().andBoardcontentLike(ToLike.toLike(preq.getSearch()));
		}
		PageHelper.startPage(preq.getPageNum(), preq.getPageSize());
		
		List<Board> list= boardDao.selectByExample(empcriteria);
	    PageInfo<Board> page = new PageInfo<Board>(list);
		return page;
	}

	@Override
	public void addBoards(Board board) {
		board.setBoardId(null);
		board.setHit(null);
		board.setWritedate(null);
		boardDao.insertSelective(board);
	}

}
