import {Component, OnInit} from '@angular/core';
import {faGithub, faLinkedinIn, faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public faGithubIcon = faGithub;
    public faTwitterIcon = faTwitter;
    public faLinkedInIcon = faLinkedinIn;

    constructor() {
    }

    ngOnInit(): void {
    }

}
