import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService as AuthGuard} from '../app/auth/auth-guard.service';

import {FrontendLayoutComponent} from './_layout/frontend-layout/frontend-layout.component';
import {BackendLayoutComponent} from './_layout/backend-layout/backend-layout.component';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './frontend/home/home.component';
import {AboutComponent} from './frontend/about/about.component';
import {ContactComponent} from './frontend/contact/contact.component';


import {DashboardComponent} from './backend/dashboard/dashboard.component';
import {UserComponent} from './backend/user/user.component';
import {CategoryListComponent} from './backend/category/category-list/category-list.component';
import {AddCategoryComponent} from './backend/category/add-category/add-category.component';
import {EditCategoryComponent} from './backend/category/edit-category/edit-category.component';
import {PostListComponent} from './backend/post/post-list/post-list.component';
import {AddPostComponent} from './backend/post/add-post/add-post.component';
import {EditPostComponent} from './backend/post/edit-post/edit-post.component';


const routes: Routes = [
    /*
     @ frontend routes goes here
     */

    {
        path: '',
        component: FrontendLayoutComponent,
        children: [
            {path: '', component: HomeComponent, pathMatch: 'full', data: {title: 'Home'}},
            {path: 'about', component: AboutComponent, data: {title: 'About'}},
            {path: 'contact', component: ContactComponent, data: {title: 'Contact'}},
        ],
    },

    /*
     @ backend routes goes here
     */

    {
        path: '',
        component: BackendLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        component: UserComponent,
                        data: {title: 'Dashboard'}
                    }
                ],
            },

            {
                path: 'category',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        component: CategoryListComponent,
                        data: {title: 'Category List'}
                    },
                    {
                        path: 'add',
                        component: AddCategoryComponent,
                        data: {title: 'Add Category'}
                    },
                    {
                        path: 'edit/:id',
                        component: EditCategoryComponent,
                        data: {title: 'Edit Category'}
                    },
                ],
            },
            {
                path: 'post',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        component: PostListComponent,
                        data: {title: 'Post List'}
                    },
                    {
                        path: 'add',
                        component: AddPostComponent,
                        data: {title: 'Add Post'}
                    },
                    {
                        path: 'edit/:id',
                        component: EditPostComponent,
                        data: {title: 'Edit Post'}
                    },
                ],
            },

        ],
    },


     /*
     @ without layout routes
     */

    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    { path: 'register', component: RegisterComponent },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
