import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DevicesComponent } from './pages/devices/devices.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'about', component: AboutComponent }
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
