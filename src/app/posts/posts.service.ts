import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<{ message: String, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            imagePath: post.imagePath,
            id: post._id
          }
        })
      }))
  }

  getPost(id: String) {
    return this.http.get<{ message: String, post: Post}>('http://localhost:3000/api/posts/' + id);
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.image, post.title);
    return this.http.post<{ message: String, postId: string }>('http://localhost:3000/api/posts', postData);
  }

  deletePost(postId: String) {
    return this.http.delete<{ message: String }>('http://localhost:3000/api/posts/'+ postId);
  }

  editPost(id: String, post: Post) {
    let postData: any;
    if(typeof(post.image) ==='object') {
      postData = new FormData();
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', post.image, post.title);
    } else {
      postData = post;
    }
    return this.http.put<{ message: String}>('http://localhost:3000/api/posts/'+ id, postData);
  }
}
