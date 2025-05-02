import { Routes } from '@angular/router';
import { CreatePostComponent } from './Pages/create-post/create-post.component';
import { ViewAllComponent } from './Pages/view-all/view-all.component';
import { ViewPostComponent } from './Pages/view-post/view-post.component';
import { SearchByNameComponent } from './Pages/search-by-name/search-by-name.component';
import { LoginComponent } from './Pages/login/login.component'; // Import LoginComponent
import { AuthGuard } from './guards/auth.guard'; // Import AuthGuard

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route now redirects to login
  { path: 'login', component: LoginComponent }, // Public route for login
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'view-all', component: ViewAllComponent }, // Public route for viewing all posts
  { path: 'view-post/:id', component: ViewPostComponent }, // Public route for viewing a single post
  { path: 'search-by-name', component: SearchByNameComponent }, // Public route for searching posts
  { path: '**', redirectTo: '/login' }, // Redirect unknown routes to login
];