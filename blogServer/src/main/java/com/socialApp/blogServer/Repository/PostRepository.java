package com.socialApp.blogServer.Repository;

import com.socialApp.blogServer.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByNameContaining(String name);

}
