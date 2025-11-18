import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})
export class DoneComponent {
  readonly correct = signal(3);

  readonly total = signal(8);

  readonly score = computed(() => this.correct() / this.total());
}
