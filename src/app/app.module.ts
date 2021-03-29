import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NotFound404Component} from './error-pages/not-found-404/not-found-404.component';
import {SandboxComponent} from './sandbox/sandbox.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        FooterComponent,
        LandingPageComponent,
        NotFound404Component,
        SandboxComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        FontAwesomeModule,
        MatTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
