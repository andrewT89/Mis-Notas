import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Question } from './question.model';
import { QuestionService } from './question.service';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css'],
    providers: [QuestionService]
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
    question?: Question;
    loading = true;
    sub: any;

    constructor(private _questionService: QuestionService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this._questionService.getQuestion(params.id).then((question: Question) => {
                this.question = question;
                this.loading = false;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
