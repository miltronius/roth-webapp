import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FlaskService {

    private readonly FLASK_HOST: string = environment.endpoints.flask_heroku;

    constructor(private http: HttpClient) {
    }


    getRequest() {
        this.http.get(this.FLASK_HOST + 'getReq').subscribe(value => console.log('RESPONSE: ', value));
    }

    postRequest() {
        this.http.post(this.FLASK_HOST + 'ping', {name: 'Freddy Mercury'}).subscribe(value => console.log('RESPONSE: ', value));
    }
}
