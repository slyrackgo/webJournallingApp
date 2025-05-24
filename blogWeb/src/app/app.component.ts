import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// ✅ Material and other modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from './AngularMaterialModule';

import { HttpClientModule } from '@angular/common/http'; // ✅ This is the correct module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,           
    MatToolbarModule,
    MatIconModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blogWeb';
}
