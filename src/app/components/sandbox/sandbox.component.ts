import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Song} from '../../interfaces/song';
import {FlaskService} from '../../services/flask.service';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

    songs: Song[];
    selectedSong: Song;
    displayedColumns: string[] = ['id', 'songName', 'artist', 'album']; // mat-table columns
    errorMessage: string;
    flaskServiceLoading: boolean = true;
    addingNewSong: boolean = false;

    songForm = this.formBuilder.group({
        songName: '',
        artist: '',
        album: ''
    });

    constructor(
        private flaskService: FlaskService,
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.flaskService.getSongList().subscribe(json => {
            console.log('JSON RESPONSE (songlist):', json);
            this.songs = json?.songs;
            this.flaskServiceLoading = false;
            this.changeDetectorRef.detectChanges();
        }, error => {
            this.errorMessage = JSON.stringify(error); // TODO read proper error msg
            this.flaskServiceLoading = false;
        });
    }

    selectRow(row: Song): void {
        this.selectedSong = row;
        this.addingNewSong = false;
    }

    addSong() {
        this.selectedSong = undefined;
        this.addingNewSong = true;
    }

    addSongFormSubmit(value: any) {
        console.log('ADDSONG_SUBMIT:', value);
        this.flaskService.addSong(this.selectedSong).subscribe(val => {
                // this.songs.
            }, error => {
                console.log('');
            }
        );
    }

    updateSong() {
        this.flaskService.updateSong(this.selectedSong).subscribe(value => {
                // this.songs.
            }, error => {
                console.log('');
            }
        );
    }
}
