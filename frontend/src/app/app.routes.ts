import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HttpClientModule,
    ],
    exports: [RouterModule],
    providers: [Title]
})
export class AppRoutingModule { }
