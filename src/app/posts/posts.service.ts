import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<{message: String, posts: Post[]}>('http://localhost:3000/api/posts');
  }

  addPost(post: Post) {
    return this.http.post<{message: String}>('http://localhost:3000/api/posts', post);
  }
}
