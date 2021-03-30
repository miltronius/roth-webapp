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
    displayedColumns: string[] = ['song', 'artist', 'album', 'delete']; // mat-table columns
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
        this.songForm = this.formBuilder.group({
            id: row.id,
            song: row.song,
            artist: row.artist,
            album: row.album
        });

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

    addSongFormSubmit(newSong: Song): void {
        this.flaskService.addSong(newSong).subscribe((response: AddSongResponseJson) => {
                newSong.id = response.id;
                this.songs = [...this.songs, newSong];
                this.removeForm();
                this.changeDetectorRef.detectChanges();
            }, error => {
                console.log('error in add song:', error);
                this.errorMessage = JSON.stringify(error); // TODO read proper error msg
            }
        );
    }

    updateSongFormSubmit(updatedSong: Song): void {
        this.flaskService.updateSong(updatedSong).subscribe(val => {
                this.songs = this.songs.map(oldSong => oldSong.id === updatedSong.id ? updatedSong : oldSong);
                this.removeForm();
                this.changeDetectorRef.detectChanges();
            }, error => {
                console.log('error in update:', error);
            }
        );
    }

    deleteSong(songToBeDeleted: Song, event: Event): void {
        event.stopPropagation();
        this.flaskService.deleteSong(songToBeDeleted).subscribe(val => {
                this.songs = this.songs.filter(song => song.id !== songToBeDeleted.id);
                this.removeForm();
                this.changeDetectorRef.detectChanges();
            }, error => {
                console.log('error in delete:', error);
            }
        );
    }
}
