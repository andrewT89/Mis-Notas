import { Component, OnInit, Input } from '@angular/core';
// Models
import { Question } from './question.model';
// services
import { QuestionService } from './question.service';
// const q = new Question(
//     '¿Como reutilizo un componente en Angular?',
//     'Miren, esta es mi pregunta....',
//     new Date(),
//     'none'
// );

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styles: [`
    i {
        font-size: 48px;
     }
     i.help {
         width: 48px !important;
         height: 48px !important;
         padding: 0 !important;
         font-size: 48px !important;
     }
    `],
    providers: [QuestionService]
})
export class QuestionListComponent implements OnInit {

    constructor(private _questionService: QuestionService) {}

    @Input() sort = '-createdAt';
    questions: Question[];
    loading = true;

    ngOnInit() {
        this._questionService
            .getQuestions(this.sort)
            .then((questions: Question[]) => {
                this.questions = questions;
                this.loading = false;
            });
    }

}
