import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ToastrModule } from 'ngx-toastr';


import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../app/interceptors/auth.service';


import { FrontendHeaderComponent } from './_layout/frontend-header/frontend-header.component';
import { FrontendFooterComponent } from './_layout/frontend-footer/frontend-footer.component';
import { FrontendLayoutComponent } from './_layout/frontend-layout/frontend-layout.component';
import { HomeComponent } from './frontend/home/home.component';
import { AboutComponent } from './frontend/about/about.component';
import { ContactComponent } from './frontend/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { BackendHeaderComponent } from './_layout/backend-header/backend-header.component';
import { BackendLayoutComponent } from './_layout/backend-layout/backend-layout.component';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { UserComponent } from './backend/user/user.component';
import { CategoryListComponent } from './backend/category/category-list/category-list.component';
import { AddCategoryComponent } from './backend/category/add-category/add-category.component';
import { EditCategoryComponent } from './backend/category/edit-category/edit-category.component';
import { AddPostComponent } from './backend/post/add-post/add-post.component';
import { EditPostComponent } from './backend/post/edit-post/edit-post.component';
import { PostListComponent } from './backend/post/post-list/post-list.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontendHeaderComponent,
    FrontendFooterComponent,
    FrontendLayoutComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    BackendHeaderComponent,
    BackendLayoutComponent,
    DashboardComponent,
    UserComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddPostComponent,
    EditPostComponent,
    PostListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true
    })

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
