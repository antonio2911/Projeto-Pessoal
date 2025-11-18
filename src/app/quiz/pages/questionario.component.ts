import { Component, signal } from '@angular/core';
import { NomeCorPipe } from '../../shared/pipes/nome-cor.pipe';
import { Questionario } from '../../shared/pipes/models/questionario.model';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.scss'],
  imports: [NomeCorPipe],
})
export class QuestionarioComponent {
  readonly question = signal<Questionario>({
    legenda: ['Red', 'Green'],
    respostas: ['Red', 'Green', 'Blue', 'Yellow'],
    indiceCorreto: 3,
  });
}
