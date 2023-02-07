import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseInputClass } from './../../../core/classes/base-input.class';

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss'],
})
export class InputTextAreaComponent extends BaseInputClass implements OnInit {
  @ViewChild('htmlTextInput') public htmlTextInput: ElementRef | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.parentHtmlTextInput = this.htmlTextInput;
    });
  }
}
