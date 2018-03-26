import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { TestMessageServiceComponent } from './test-message-service/test-message-service.component';

/* This script is responsible for the frontend routes for the different
   "views/pages" a user of the application can visit */
const ROUTES: Routes = [
	// { path: '', redirectTo: 'signin', pathMatch: 'full'},
	// { path: "signin", component: }
	{ path: "profile", component: ProfileComponent }, // Change path to profile/:id once profiles are handled
	{ path: "home", component: HomeComponent },
	{ path: "test", component: TestMessageServiceComponent }
];

// Registers the frontend routes in angular
export const appRoutes = RouterModule.forRoot(ROUTES);
