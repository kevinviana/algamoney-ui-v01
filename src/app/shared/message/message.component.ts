import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <p-message text="{{ text }}" *ngIf="temErro()" severity="error"></p-message>
  `,
  styles: [],
})
export class MessageComponent {
  @Input() error!: string;
  @Input() control?: AbstractControl | FormControl | null;
  @Input() text!: string;

  temErro(): boolean {
    return this.control
      ? this.control.hasError(this.error) && this.control.dirty
      : true;
  }
}
