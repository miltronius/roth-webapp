import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {

    @Input()
    isTop: boolean = true;

    constructor() {
    }

}
