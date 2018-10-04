import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

// Models
import { Question } from '../question/question.model';
import { Answer } from './answer.model';
// import { User } from '../auth/user.model';

// Services
import { QuestionService } from './../question/question.service';
import SweetScroll from 'sweet-scroll';
import { AuthService } from '../auth/auth.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-from.component.html',
    styles: [`
    form {
        margin-top: 20px;
    }
    `],
    providers: [QuestionService]
})
export class AnswerFormComponent {
    @Input() question: Question;
    sweetScroll: SweetScroll;

    constructor(
        private _questionService: QuestionService,
        private _authService: AuthService,
        private router: Router) {
            this.sweetScroll = new SweetScroll();
        }

    onSubmit(form: NgForm) {

        if (!this._authService.isLoggedIn()) {
            this.router.navigateByUrl('/signin');
        }

        const answer = new Answer(
            form.value.description,
            this.question
        );
        this._questionService
        .addAnswer(answer)
        .subscribe(
            a => {
                this.question.answers.unshift(a);
                this.sweetScroll.to('#title');
            },
            this._authService.handleError
        );
        form.reset();
    }
}
