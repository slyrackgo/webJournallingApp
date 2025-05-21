package com.socialApp.blogServer.Service;

import com.socialApp.blogServer.Entity.Post;
import java.util.List;

public interface PostService {
    Post savePost(Post post);
    List<Post> getAllPosts();
    Post getPostById(Long postId);
    void likePost(Long postId);
    List<Post> searchByName(String name);

    Post updatePost(Long id, Post postDetails);

    void deletePost(Long id);
}


