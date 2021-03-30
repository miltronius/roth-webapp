import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AddSongResponseJson, Song} from '../../interfaces/song';
import {FlaskService} from '../../services/flask.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxComponent implements OnInit {

    songs: Song[];
    selectedSong: Song;
    displayedColumns: string[] = ['id', 'song', 'artist', 'album']; // mat-table columns
    errorMessage: string;
    flaskServiceLoading: boolean = true;
    addingNewSong: boolean = false;
    songForm: FormGroup;

    constructor(
        private flaskService: FlaskService,
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.flaskService.getSongList().subscribe(json => {
            this.songs = json?.songs;
            this.flaskServiceLoading = false;
            this.changeDetectorRef.detectChanges();
        }, error => {
            this.errorMessage = JSON.stringify(error); // TODO read proper error msg
            this.flaskServiceLoading = false;
        });
    }

    removeForm(): void {
        this.selectedSong = undefined;
        this.addingNewSong = false;
    }

    selectRow(row: Song): void {
        this.selectedSong = row;
        this.addingNewSong = false;
    }

    createAddSongForm(): void {
        this.selectedSong = undefined;
        this.addingNewSong = true;
        this.songForm = this.formBuilder.group({
            song: '',
            artist: '',
            album: ''
        });
    }

    addSongFormSubmit(value: Song): void {
        this.flaskService.addSong(value).subscribe((response: AddSongResponseJson) => {
                value.id = response.id;
                this.songs = [...this.songs, value];
                this.removeForm();
                this.changeDetectorRef.detectChanges();
            }, error => {
                console.log('error', error);
                this.errorMessage = JSON.stringify(error); // TODO read proper error msg
            }
        );
    }

    // TODO
    updateSong(): void {
        this.flaskService.updateSong(this.selectedSong).subscribe(value => {
                // this.songs.
            }, error => {
                console.log('');
            }
        );
    }
}
