import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {FlaskSongDictJson} from '../interfaces/song';

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

    // TODO ADD SONG
    addSong(): Observable<boolean> {
        return this.http.get<boolean>(this.FLASK_HOST + 'addSong');
    }

    // TODO UPDATE SONG
    updateSong(): Observable<boolean> {
        return this.http.post<boolean>(this.FLASK_HOST + 'updateSong', {});
    }

    getRequest() {
        this.http.get(this.FLASK_HOST + 'getReq').subscribe(value => console.log('RESPONSE: ', value));
    }

    postRequest() {
        this.http.post(this.FLASK_HOST + 'ping', {name: 'Freddy Mercury'}).subscribe(value => console.log('RESPONSE: ', value));
    }
}
