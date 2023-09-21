import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerComponent } from './server/server.component';
import { CreateServerComponent } from './create-server/create-server.component';

const routes: Routes = [
  { path: 'servers', component: ServerComponent },
  { path: 'create-server', component: CreateServerComponent },
  { path: '', redirectTo: '/servers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
