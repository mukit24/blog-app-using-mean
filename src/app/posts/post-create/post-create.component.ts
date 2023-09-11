import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() postCreated = new EventEmitter<Post>();
  postId: string;
  post: Post;
  form: FormGroup;
  mode = 'create';
  imagePreview: string;
  constructor(private postService: PostsService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, RxwebValidators.required()],
      content: [null, RxwebValidators.required()],
      image: [null, [RxwebValidators.required(), RxwebValidators.extension({ extensions: ["jpeg", "jpg", "png"] })]
      ],
    })
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      if (this.postId) {
        this.mode = 'edit';
        this.postService.getPost(this.postId).subscribe(data => {
          this.post = data.post;
          this.imagePreview = this.post.imagePath;
          this.form.setValue({ title: this.post.title, content: this.post.content, image: this.post.imagePath });
        })
      }
    })
  }

  onPickImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSavePost() {
    const newPost: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content,
      image: this.form.value.image,
    }

    if (this.mode === 'create') {
      this.postService.addPost(newPost).subscribe((result) => {
        console.log(result.message);
        newPost.id = result.postId;
        this.router.navigate(['/']);
      })
    } else if (this.mode === 'edit') {
      this.postService.editPost(this.postId, newPost).subscribe(result => {
        this.router.navigate(['/']);
      })
    }

    this.form.reset();
  }
}
