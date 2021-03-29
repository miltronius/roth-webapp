import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {FlaskService} from './services/flask.service';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    public title = 'roth-webapp';
    public counter: number = 0;
    public isTop: boolean = true;

    constructor(
        private flaskService: FlaskService
    ) {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isTop = window.scrollY === 0;
    }
}
