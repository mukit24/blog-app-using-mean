import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<Post>();
  
  constructor(private postService: PostsService) {}

  onPostCreate(form: NgForm) {
    const newPost: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content,
    }

    this.postService.addPost(newPost).subscribe((data) => {
      console.log(data.message);
      newPost.id = data.postId;
      this.postCreated.emit(newPost);
    })
    
    form.reset();
  }
}
