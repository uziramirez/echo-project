import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { guestGuard } from './core/auth/guest.guard';


export const routes: Routes = [
{ path: 'login', loadComponent: () => import('./features/auth/login.page').then(m => m.LoginPageComponent), canActivate: [guestGuard] },
{ path: 'signup', loadComponent: () => import('./features/auth/signup.page').then(m => m.SignupPageComponent), canActivate: [guestGuard] },


{ path: '', loadComponent: () => import('./features/feed/feed.page').then(m => m.FeedPageComponent), canActivate: [authGuard] },
{ path: 'echo/:id', loadComponent: () => import('./features/echo-detail/echo-detail.page').then(m => m.EchoDetailPageComponent), canActivate: [authGuard] },
{ path: 'profile/:username', loadComponent: () => import('./features/profile/profile.page').then(m => m.ProfilePageComponent), canActivate: [authGuard] },
{ path: 'liked', loadComponent: () => import('./features/liked/liked.page').then(m => m.LikedPageComponent), canActivate: [authGuard] },


{ path: '**', redirectTo: '' }
];