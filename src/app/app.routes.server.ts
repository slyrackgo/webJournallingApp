import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './Pages/create-post/create-post.component';
import { ViewAllComponent } from './Pages/view-all/view-all.component';
import { ViewPostComponent } from './Pages/view-post/view-post.component';
import { SearchByNameComponent } from './Pages/search-by-name/search-by-name.component';

export const serverRoutes: Routes = [
  { path: '', redirectTo: '/view-all', pathMatch: 'full' },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'search-by-name', component: SearchByNameComponent }, // Ensure this is correct
  { path: '**', redirectTo: '/view-all' },
];

@NgModule({
  imports: [
    ServerModule,
    RouterModule.forRoot(serverRoutes), // Use the server routes
  ],
  exports: [RouterModule],
})
export class AppServerModule {}

