import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-button',
  template: `<button class="btn" [disabled]="disabled"><ng-content /></button>`,
})
export class ButtonComponent { @Input() disabled = false; }