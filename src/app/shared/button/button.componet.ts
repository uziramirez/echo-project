import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ui-button',
  template: `
    <button
      [attr.type]="type"
      [disabled]="disabled"
      class="btn"
      [ngClass]="variant"
    >
      <ng-content></ng-content>
    </button>
  `,
  imports: [CommonModule],
  styleUrls: ['./button.componet.css']
})
export class ButtonComponet {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
}
