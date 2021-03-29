import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Song} from '../interfaces/song';
import {FlaskService} from '../services/flask.service';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

    songs: Song[];
    displayedColumns: string[] = ['id', 'songName', 'artist', 'album'];

    constructor(
        private flaskService: FlaskService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.flaskService.getSongList().subscribe(json => {
            console.log('JSON:', json);
            this.songs = json?.songs;
            this.changeDetectorRef.detectChanges();
        });
    }

}
