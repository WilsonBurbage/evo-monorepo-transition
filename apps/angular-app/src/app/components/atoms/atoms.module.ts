import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../../core/pipes/pipes.module';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ButtonComponent } from './button/button.component';
import { CallOutComponent } from './call-out/call-out.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ErrorableComponent } from './errorable/errorable.component';
import { IconShowcaseComponent } from './icon-showcase/icon-showcase.component';
import { IconComponent } from './icon/icon.component';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { InputCurrencyComponent } from './input-currency/input-currency.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputTextAreaComponent } from './input-text-area/input-text-area.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTimeComponent } from './input-time/input-time.component';
import { LabelledTextComponent } from './labelled-text/labelled-text.component';
import { LinkComponent } from './link/link.component';
import { ProgressComponent } from './progress/progress.component';
import { ThrobberComponent } from './throbber/throbber.component';

const allAtoms = [
  AccordionComponent,
  AccordionItemComponent,
  ButtonComponent,
  CallOutComponent,
  ContentBoxComponent,
  ContextMenuComponent,
  ErrorableComponent,
  IconComponent,
  IconShowcaseComponent,
  InputCheckboxComponent,
  InputCurrencyComponent,
  InputDateComponent,
  InputNumberComponent,
  InputSelectComponent,
  InputTextAreaComponent,
  InputTextComponent,
  InputTimeComponent,
  LabelledTextComponent,
  LinkComponent,
  ProgressComponent,
  ThrobberComponent,
];

@NgModule({
  imports: [CommonModule, FontAwesomeModule, PipesModule, ReactiveFormsModule],
  declarations: allAtoms,
  exports: allAtoms,
})
export class AtomsModule {}
