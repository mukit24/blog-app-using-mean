import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnChanges {
  @Input() post: Post;
  posts: Post[];
  isLoading = true;
  first: number = 0;
  postPerPage: number = 2;
  currentPage: number = 1;
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getPosts(this.postPerPage, this.currentPage).subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.isLoading = false;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.post.currentValue) {
      console.log(changes.post.currentValue);
      this.posts.push(changes.post.currentValue);
    }
  }

  onDelete(id: string) {
    this.postService.deletePost(id).subscribe(data => {
      console.log(data.message);
      this.postService.getPosts(this.postPerPage, this.currentPage).subscribe((data) => {
        this.posts = data;
      })
    })
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.page + 1;
    this.postPerPage = event.rows;
    this.postService.getPosts(this.postPerPage, this.currentPage).subscribe((data) => {
      this.posts = data;
    })
  }
}
