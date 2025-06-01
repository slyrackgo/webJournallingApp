package com.socialApp.blogServer.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String name;

    @Column(length = 5000)
    private String content;

    private String postedBy;

    private String img;

    private Date date;

    private int likeCount;

    private int viewCount;

    private List<String> tags;}



//    public void setLikeCount(int i) {
//    }
//
//    public void setViewCount(int i) {
//    }

