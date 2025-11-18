import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.scss'],
})
export class ProgressoComponent {
  readonly value = signal(4);

  readonly max = signal(9);

  readonly ratio = computed(() => this.value() / this.max());
}
