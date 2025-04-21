package com.socialApp.blogServer.Service;

import com.socialApp.blogServer.Entity.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Long postId, String postedBy, String content);
    List<Comment> getCommentByPostId(Long postId);

}
