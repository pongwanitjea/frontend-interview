import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtworksComponent} from "./pages/artworks/artworks.component";

const routes: Routes = [
  {path: 'artworks', component: ArtworksComponent},
  {path: '**', redirectTo: '/artworks'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
