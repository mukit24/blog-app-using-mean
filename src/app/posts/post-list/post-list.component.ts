import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  posts: Post[];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data.posts;
    })
  }
  
}
