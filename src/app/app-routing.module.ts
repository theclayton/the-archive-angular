import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { LoginComponent } from './Login Components/login/login.component';
import { HomeComponent } from './Archive Projects Components/home/home.component';
import { ProjectsComponent } from './Archive Projects Components/projects/projects.component';
import { MyAccountComponent } from './Login Components/my-account/my-account.component';
import { AdminPanelComponent } from './Admin Panel Components/admin-panel/admin-panel.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard]},

  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
