import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {FlaskSongDictJson, Song} from '../interfaces/song';

@Injectable({
    providedIn: 'root'
})
export class FlaskService {

    private readonly FLASK_HOST: string = environment.endpoints.flask_heroku;
    private headers: Headers = new Headers();

    constructor(private http: HttpClient) {
    }

    getSongList(): Observable<FlaskSongDictJson> {
        return this.http.get<FlaskSongDictJson>(this.FLASK_HOST + 'getMusicDict');
    }

    // TODO ADD SONG
    addSong(song: Song): Observable<string> {
        console.log('>>> SONG:', song);
        return this.http.post<string>(this.FLASK_HOST + 'addSong', song);
    }

    // TODO UPDATE SONG
    updateSong(song: Song): Observable<boolean> {
        console.log('>>> UPDATE SONG:', song);
        this.headers.append('Content-Type', 'application/json');
        return this.http.post<boolean>(this.FLASK_HOST + 'updateSong', {headers: this.headers});
    }

    getRequest() {
        this.http.get(this.FLASK_HOST + 'getReq').subscribe(value => console.log('RESPONSE: ', value));
    }

    postRequest() {
        this.http.post(this.FLASK_HOST + 'ping', {name: 'Freddy Mercury'}).subscribe(value => console.log('RESPONSE: ', value));
    }
}
