import { Component, ElementRef, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, takeUntil, withLatestFrom } from 'rxjs';
import { TextReplacement } from '../models/text-replacement.model';
import { FormSchemaItem } from './../models/form-schema-item.model';
import * as textReplacementsSelectors from './../state/text-replacements/text-replacements.selectors';
import { BaseComponentClass } from './base-component.class';

@Component({ template: '' })
export abstract class BaseInputClass extends BaseComponentClass {
  @Input() form!: FormGroup;
  @Input() formSchemaItem!: FormSchemaItem;

  parentHtmlTextInput: ElementRef | undefined;

  textReplacements$!: Observable<TextReplacement[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    setTimeout(() => {
      if (this.formSchemaItem.textInputConfig?.textReplacementsDisabled) {
        return;
      }

      this.form.controls[this.formSchemaItem.controlName].valueChanges
        .pipe(
          withLatestFrom(
            this.store$.select(
              textReplacementsSelectors.entitySelectors.selectAll
            )
          ),
          takeUntil(this.destroyed$)
        )
        .subscribe(([oldValue, textReplacements]) => {
          if (!this.parentHtmlTextInput) {
            return;
          }

          const triggerCharacter = ' ';

          const htmlTextInput: HTMLInputElement | HTMLTextAreaElement =
            this.parentHtmlTextInput.nativeElement;

          const lastTypedCharacter = String(oldValue).substring(
            htmlTextInput.selectionStart! - 1,
            htmlTextInput.selectionStart!
          );

          if (lastTypedCharacter !== triggerCharacter) {
            return;
          }

          const newValue = textReplacements.reduce(
            (accumulator, textReplacement) =>
              accumulator.replaceAll(
                `${textReplacement.input} `,
                textReplacement.output
              ),
            String(oldValue)
          );

          if (newValue !== oldValue) {
            const lengthDifference = newValue.length - oldValue.length;
            const oldSelectionStart = htmlTextInput.selectionStart!;
            const newSelectionStart = oldSelectionStart + lengthDifference;

            this.form.patchValue({
              [this.formSchemaItem.controlName]: newValue,
            });

            htmlTextInput.setSelectionRange(
              newSelectionStart,
              newSelectionStart
            );
          }
        });
    });
  }
}
