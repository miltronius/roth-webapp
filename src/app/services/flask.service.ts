import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AddSongResponseJson, FlaskSongDictJson, Song} from '../interfaces/song';

@Injectable({
    providedIn: 'root'
})
export class FlaskService {

    private readonly FLASK_HOST: string = environment.endpoints.flask_heroku;

    constructor(private http: HttpClient) {
    }

    getSongList(): Observable<FlaskSongDictJson> {
        return this.http.get<FlaskSongDictJson>(this.FLASK_HOST + 'getMusicDict');
    }

    addSong(song: Song): Observable<AddSongResponseJson> {
        return this.http.post<AddSongResponseJson>(this.FLASK_HOST + 'addSong', song);
    }

    updateSong(song: Song): Observable<boolean> {
        return this.http.post<boolean>(this.FLASK_HOST + 'updateSong', song);
    }

    deleteSong(song: Song): Observable<boolean> {
        return this.http.post<boolean>(this.FLASK_HOST + 'deleteSong', song);
    }

    getRequest() {
        this.http.get(this.FLASK_HOST + 'getReq').subscribe(value => console.log('RESPONSE: ', value));
    }

    postRequest() {
        this.http.post(this.FLASK_HOST + 'ping', {name: 'Freddy Mercury'}).subscribe(value => console.log('RESPONSE: ', value));
    }
}
