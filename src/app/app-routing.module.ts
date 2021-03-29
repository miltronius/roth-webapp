import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFound404Component} from './error-pages/not-found-404/not-found-404.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SandboxComponent} from './sandbox/sandbox.component';


const routes: Routes = [
    {
        path: 'sandbox',
        component: SandboxComponent
    },
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: '**',
        component: NotFound404Component
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
