import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {faGithub, faLinkedinIn, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {FlaskService} from './services/flask.service';

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
    public faGithubIcon = faGithub;
    public faTwitterIcon = faTwitter;
    public faLinkedInIcon = faLinkedinIn;

    constructor(
        private flaskService: FlaskService
    ) {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isTop = window.scrollY === 0;

        if (this.isTop) {
            this.flaskService.postRequest();
            this.flaskService.getRequest();
        }
    }
}
