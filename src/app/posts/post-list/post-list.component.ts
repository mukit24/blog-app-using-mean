import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnChanges{
  @Input() post: Post;
  posts: Post[];
  isLoading = true;
  first: number = 0;
  rows: number = 2;
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.isLoading = false;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.post.currentValue) {
      console.log(changes.post.currentValue);
      this.posts.push(changes.post.currentValue);
    }
  }

  onDelete(id: string){
    this.postService.deletePost(id).subscribe( data => {
      console.log(data.message);
      this.postService.getPosts().subscribe((data) => {
        this.posts = data;
      })
    })
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  
}
