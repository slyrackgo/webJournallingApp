// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { PostService } from '../../Service/post.service';

// @Component({
//   selector: 'app-search-by-name',
//   standalone: true,
//   templateUrl: './search-by-name.component.html',
//   styleUrls: ['./search-by-name.component.scss'],
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule,
//   ],
// })
// export class SearchByNameComponent {
//   name: string = ''; // Two-way binding variable
//   searchResults: any[] = []; // To store search results
// result: any;

//   constructor(private postService: PostService) {}

//   /**
//    * Search posts by name
//    */
//   searchByName(): void {
//     if (!this.name.trim()) {
//       console.error('Search name is empty');
//       return;
//     }

//     this.postService.searchByName(this.name).subscribe(
//       (results) => {
//         this.searchResults = results;
//         console.log('Search Results:', this.searchResults);
//       },
//       (error) => {
//         console.error('Error searching by name:', error);
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PostService } from '../../Service/post.service';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class SearchByNameComponent {
  name: string = ''; // Two-way binding variable
  result: any[] = []; // To store search results

  constructor(private postService: PostService) {}

  /**
   * Search posts by name
   */
  searchByName(): void {
    if (!this.name.trim()) {
      console.error('Search name is empty');
      return;
    }

    this.postService.searchByName(this.name).subscribe(
      (results) => {
        this.result = results;
        console.log('Search Results:', this.result);
      },
      (error) => {
        console.error('Error searching by name:', error);
      }
    );
  }
}