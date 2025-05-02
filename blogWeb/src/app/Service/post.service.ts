
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class PostService {
//   private readonly API_BASE_URL = 'http://localhost:8080/api/posts'; // Ensure this is initialized

//   constructor(private http: HttpClient) {}

//   /**
//    * Fetch a post by ID
//    * @param postId - The ID of the post to fetch
//    */
//   getPostById(postId: number): Observable<any> {
//     const url = `${this.API_BASE_URL}/${postId}`;
//     return this.http.get(url).pipe(catchError(this.handleError));
//   }

//   /**
//    * Like a post
//    * @param postId - The ID of the post to like
//    */
//   likePost(postId: number): Observable<any> {
//     const url = `${this.API_BASE_URL}/${postId}/like`; // Ensure a `/` is added between the base URL and postId
//     return this.http.put(url, {}).pipe( // Pass an empty object as the body
//       catchError(this.handleError)
//     );
//   }

//   /**
//    * Create a new post
//    * @param data - The post data to be sent to the server
//    */
//   createNewPost(data: any): Observable<any> {
//     const url = `${this.API_BASE_URL}`;
//     return this.http.post(url, data).pipe(
//       catchError(this.handleError)
//     );
//   }

//   /**
//    * Fetch all posts
//    * @returns Observable of the list of posts
//    */
//   getAllPosts(): Observable<any> {
//     const url = `${this.API_BASE_URL}`;
//     return this.http.get(url).pipe(
//       catchError(this.handleError)
//     );
//   }


//   searchByName(name: string): Observable<any> {
//     const url = `${this.API_BASE_URL}/search/${name}`; // Ensure the URL is correct
//     return this.http.get(url).pipe(catchError(this.handleError));
//   }
//   /**
//    * Handle HTTP errors
//    * @param error - The error response
//    */
//   private handleError(error: any): Observable<never> {
//     console.error('Error occurred:', error);
//     return throwError(() => new Error('Something went wrong; please try again later.'));
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_BASE_URL = 'http://localhost:8080/api/posts'; // Ensure this matches the backend

  constructor(private http: HttpClient) {}

  /**
   * Fetch a post by ID
   * @param postId - The ID of the post to fetch
   * @returns Observable containing the post data
   */
  getPostById(postId: number): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/${postId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Like a post
   * @param postId - The ID of the post to like
   * @returns Observable containing the response
   */
  likePost(postId: number): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}/${postId}/like`, {}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Create a new post
   * @param data - The post data to be sent to the server
   * @returns Observable containing the created post
   */
  createNewPost(data: any): Observable<any> {
    return this.http.post(this.API_BASE_URL, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch all posts
   * @returns Observable containing the list of posts
   */
  getAllPosts(): Observable<any> {
    return this.http.get(this.API_BASE_URL).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Search posts by name
   * @param name - The name to search for
   * @returns Observable containing the search results
   */
  searchByName(name: string): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/search/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   * @param error - The error response
   * @returns Observable that throws an error
   */
  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);

    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Client-side error: ${error.error.message}`
        : `Server error (${error.status}): ${error.message || error.statusText}`;

    return throwError(() => new Error(errorMessage));
  }
}