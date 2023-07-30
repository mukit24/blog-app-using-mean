import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  @Output() postCreated = new EventEmitter<Post>();
  postId: string;
  post: Post;
  form: FormGroup;
  mode = 'create';
  constructor(private postService: PostsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required]}),
      content: new FormControl(null, { validators: [Validators.required]})
    })
    this.route.params.subscribe( params => {
      this.postId = params['postId'];
      if(this.postId) {
        this.mode = 'edit';
        this.postService.getPost(this.postId).subscribe(data => {
          this.post = data.post;
          this.form.setValue({ title: this.post.title, content: this.post.content });
        })
      }
    })
  }

  onSavePost() {
    const newPost: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content,
    }

    if (this.mode === 'create') {
      this.postService.addPost(newPost).subscribe((result) => {
        console.log(result.message);
        // newPost.id = data.postId;
        // this.postCreated.emit(newPost);
        this.router.navigate(['/']);
      })
    } else if (this.mode === 'edit') {
      this.postService.editPost(this.postId, newPost).subscribe( result => {
        this.router.navigate(['/']);
      })
    }
    
    this.form.reset();
  }
}
