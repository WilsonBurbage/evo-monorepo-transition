import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseInputClass } from './../../../core/classes/base-input.class';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent extends BaseInputClass implements OnInit {
  @ViewChild('htmlTextInput') public htmlTextInput: ElementRef | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.parentHtmlTextInput = this.htmlTextInput;
    });
  }
}
