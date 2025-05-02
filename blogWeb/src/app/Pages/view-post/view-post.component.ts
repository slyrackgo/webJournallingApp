
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../Service/post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../Service/comment.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-post',
  standalone: true,
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    HttpClientModule, // Ensure this is included
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ViewPostComponent implements OnInit {
  postId: string | null = null; // Declare postId as string | null
  postData: any = null; // Initialize postData as null
  comments: any[] = []; // Initialize comments as an empty array
  commentForm!: FormGroup;
  snackBar: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id']; // Get the postId from the route
    console.log('Post ID:', this.postId);
    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required],
    });

    if (this.postId) {
      const postIdAsNumber = Number(this.postId); // Convert postId to a number
      if (!isNaN(postIdAsNumber)) {
        this.getPostById(postIdAsNumber); // Fetch post data
        this.getCommentByPost(postIdAsNumber); // Fetch comments
      } else {
        this.showSnackBar('Invalid post ID');
      }
    } else {
      this.showSnackBar('Post ID is missing');
    }
  }

  /**
   * Publish a comment
   */
  // publishComment(): void {
  //   const postIdAsNumber = this.postId ? Number(this.postId) : null; // Convert postId to a number
  //   if (postIdAsNumber !== null && !isNaN(postIdAsNumber)) {
  //     const postedBy = this.commentForm.get('postedBy')?.value;
  //     const content = this.commentForm.get('content')?.value;

  //     this.commentService.createComment(postIdAsNumber, postedBy, content).subscribe(
  //       (res) => {
  //         this.matSnackBar.open('Comment published successfully!', 'Close', { duration: 3000 });
  //         this.commentForm.reset(); // Reset the form after successful submission
  //         this.getCommentByPost(postIdAsNumber); // Refresh comments
  //       },
  //       (error) => {
  //         this.matSnackBar.open('Error publishing comment!', 'Close', { duration: 3000 });
  //       }
  //     );
  //   } else {
  //     this.showSnackBar('Invalid post ID');
  //   }
  // }
  publishComment(): void {
    const postIdAsNumber = this.postId ? Number(this.postId) : null;
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;
  
    console.log('Payload being sent to the backend:', { postId: postIdAsNumber, postedBy, content }); // Debugging
  
    if (!postIdAsNumber || isNaN(postIdAsNumber)) {
      this.matSnackBar.open('Invalid post ID', 'Close', { duration: 3000 });
      return;
    }
  
    if (!postedBy || !content) {
      this.matSnackBar.open('Please fill in all fields', 'Close', { duration: 3000 });
      return;
    }
  
    this.commentService.createComment(postIdAsNumber, postedBy, content).subscribe({
      next: (res) => {
        this.matSnackBar.open('Comment published successfully!', 'Close', { duration: 3000 });
        this.commentForm.reset();
        this.getCommentByPost(postIdAsNumber);
      },
      error: (error) => {
        console.error('Error publishing comment:', error);
        const errorMessage = error.error?.message || 'Something went wrong!';
        this.matSnackBar.open(errorMessage, 'Close', { duration: 3000 });
      },
    });
  }
  /**
   * Fetch comments for the post
   * @param postId - The ID of the post
   */
  // getCommentByPost(postId: number): void {
  //   this.commentService.getAllCommentsByPost(postId).subscribe(
  //     (res) => {
  //       this.comments = res || []; // Ensure comments is always an array
  //       console.log('Fetched Comments:', this.comments); // Debugging: Log the comments
  //     },
  //     (error) => {
  //       this.matSnackBar.open('Error fetching comments', 'Close', { duration: 3000 });
  //     }
  //   );
  // }
  getCommentByPost(postId: number): void {
    this.commentService.getAllCommentsByPost(postId).subscribe(
      (res: any) => {
        this.comments = res || []; // Ensure comments is always an array
        console.log('Fetched Comments:', this.comments); // Debugging: Log the comments
      },
      (error: any) => {
        console.error('Error fetching comments:', error);
        this.matSnackBar.open('Error fetching comments', 'Close', { duration: 3000 });
      }
    );
  }
  /**
   * Fetch post data by ID
   * @param postId - The ID of the post to fetch
   */
  getPostById(postId: number): void {
    this.postService.getPostById(postId).subscribe(
      (res) => {
        this.postData = res;
        console.log('Post Data:', res);
      },
      (error) => {
        this.showSnackBar('Error fetching post');
      }
    );
  }

  /**
   * Like the post
   */
  likePost(): void {
    const postIdAsNumber = this.postId ? Number(this.postId) : null;
    if (postIdAsNumber !== null && !isNaN(postIdAsNumber)) {
      this.postService.likePost(postIdAsNumber).subscribe(
        (response) => {
          this.matSnackBar.open('Post liked successfully', 'Close', { duration: 3000 });
          this.getPostById(postIdAsNumber); // Refresh the post data
        },
        (error) => {
          this.matSnackBar.open('Error liking post', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.showSnackBar('Invalid post ID');
    }
  }

  /**
   * Show a snackbar message
   * @param message - The message to display
   */
  private showSnackBar(message: string): void {
    this.matSnackBar.open(message, 'Close', { duration: 3000 });
  }
}