import { Component, input, Input } from '@angular/core';

@Component({
standalone: true,
selector: 'ui-button',
template: `
<button [attr.type]="type" [disabled]="disabled" class="btn">
<ng-content></ng-content>
</button>
`,
styleUrls: ['./button.component.css']
})
export class ButtonComponent {
@Input() type: 'button' | 'submit' = 'button';
@Input() disabled = false;
@Input() variant: 'primary' | 'secondary' = 'primary';
}