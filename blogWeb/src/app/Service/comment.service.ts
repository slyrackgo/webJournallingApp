// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// const BASE_URL = 'http://localhost:8080/api/comments'; // Correct base URL

// @Injectable({
//   providedIn: 'root',
// })
// export class CommentService {
//   constructor(private http: HttpClient) {}

//   /**
//    * Fetch all comments for a specific post
//    * @param postId - The ID of the post
//    */
//   getAllCommentsByPost(postId: number): Observable<any> {
//     const url = `${BASE_URL}/${postId}`; // Correct URL
//     return this.http.get<any>(url);
//   }

//   /**
//    * Create a new comment
//    * @param postId - The ID of the post
//    * @param postedBy - The name of the commenter
//    * @param content - The content of the comment
//    */
//   createComment(postId: number, postedBy: string, content: string): Observable<any> {
//     const url = `${BASE_URL}/create`; // Correct URL for creating a comment
//     const body = { postId, postedBy, content };
//     return this.http.post<any>(url, body);
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  /**
   * Create a new comment
   * @param postId - The ID of the post
   * @param postedBy - The name of the commenter
   * @param content - The content of the comment
   */
  getAllCommentsByPost(postId: number): Observable<any> {
    const url = `${BASIC_URL}api/comments/${postId}`; // Ensure the URL is correct
    return this.http.get<any>(url);
  }
  createComment(postId: number, postedBy: string, content: string): Observable<any> {
    const url = `${BASIC_URL}api/comments/create`; // Correct URL for creating a comment

    // Use HttpParams to pass parameters
    const params = new HttpParams()
      .set('postId', postId.toString())
      .set('postedBy', postedBy)
      .set('content', content);

    return this.http.post<any>(url, null, { params }); // Send the request with parameters
  }
}