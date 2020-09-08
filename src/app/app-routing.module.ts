import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
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
