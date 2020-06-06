import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'roth-webapp';
    public counter: number = 0;
    public isTop: boolean = true;

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
    }

    public countUp(event: Event) {
        console.log(JSON.stringify(event));
        this.counter++;
        this.cdr.markForCheck();
    }

    ngOnDestroy(): void {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isTop = window.scrollY === 0;
    }
}
