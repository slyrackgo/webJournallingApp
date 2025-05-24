import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PostService } from '../../Service/post.service'; // Corrected import path
import { MatChipInputEvent } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http'; // Import HttpHeaders if needed
@Component({
  selector: 'app-create-post',
  standalone: true, // Mark as standalone component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatChipsModule,
    MatIconModule,
    MatButtonModule, 
    HttpClientModule,
  ],
  providers: [PostService], // Provide PostService here
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService // Angular will now be able to inject PostService
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      postedBy: [null, Validators.required],
    });
  }

  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createPost(): void {
    const data = this.postForm.value;
    data.tags = this.tags;
  
    console.log('Payload being sent to the backend:', data); // Debugging
  
    // Validate the payload before sending
    if (!data.name || !data.content || !data.img || !data.postedBy) {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
      return;
    }
  
    this.postService.createNewPost(data).subscribe({
      next: (res: any) => {
        this.snackBar.open('Post created successfully!', 'Ok', { duration: 3000 });
        this.router.navigateByUrl('/view-all'); // Navigate to the view-all page
      },
      error: (error: any) => {
        console.error('Error creating post:', error); // Log the error details
        const errorMessage = error.error?.message || 'Something went wrong!';
        this.snackBar.open(errorMessage, 'Ok!', { duration: 3000 });
      },
    });
  }
}