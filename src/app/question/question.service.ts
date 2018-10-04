import { throwError } from 'concurrently/node_modules/rxjs';
import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from './../answer/answer.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {

private _questionsUrl: string;

    constructor(private http: Http) {
        this._questionsUrl = urljoin(environment.apiUrl, 'questions');
    }

    getQuestions(sort = '-createdAt'): Promise<void | Question[]> {
        return this.http.get(`${this._questionsUrl}?sort=${sort}`)
        .toPromise()
        .then(response => response.json() as Question[])
        .catch(this.handleError);
    }

    getQuestion(id): Promise<void | Question> {
        const url = urljoin(this._questionsUrl, id);
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Question)
        .catch(this.handleError);
    }

    addQuestion(question: Question) {
        const body = JSON.stringify(question);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token');
        const url = `${this._questionsUrl}?token=${token}`;

        return this.http.post(url, body, {headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => throwError(error.json()));
    }

    addAnswer(answer: Answer) {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        };
        const body = JSON.stringify(a);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        // const url = urljoin(this._questionsUrl, answer.question._id, 'answers');
        const token = localStorage.getItem('token');
        const url = `${this._questionsUrl}/${answer.question._id}/answers?token=${token}`;

        return this.http.post(url, body, {headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => throwError(error.json()));
    }

    handleError(error: any) {
        const errMesage = error.message ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.log(errMesage);
    }
}
