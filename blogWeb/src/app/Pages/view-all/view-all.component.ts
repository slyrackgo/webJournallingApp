import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PostService } from '../../Service/post.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
})
export class ViewAllComponent {
  allPosts: any[] = []; // Explicitly typed as an array for better clarity

  constructor(private postService: PostService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  /**
   * Fetch all posts from the server
   */
  // getAllPosts(): void {
  //   this.postService.getAllPosts().subscribe(
  //     (res: any) => {
  //       this.allPosts = res; // Assign the response to the allPosts array
  //     },
  //     (error: any) => {
  //       this.snackBar.open('Error fetching posts', 'Close', { duration: 3000 });
  //     }
  //   );
  // }
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (res: any) => {
        this.allPosts = res; // Assign the response to the allPosts array
      },
      (error: any) => {
        this.snackBar.open('Error fetching posts', 'Close', { duration: 3000 });
      }
    );
  }
}