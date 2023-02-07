import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../core/directives/directives.module';
import { PipesModule } from '../../core/pipes/pipes.module';
import { AtomsModule } from './../atoms/atoms.module';
import { ButtonSetComponent } from './button-set/button-set.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { ScreenBlockComponent } from './screen-block/screen-block.component';

const allMolecules = [
  ButtonSetComponent,
  FormComponent,
  FormFieldComponent,
  HeaderComponent,
  ScreenBlockComponent,
];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    DirectivesModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  declarations: allMolecules,
  exports: allMolecules,
})
export class MoleculesModule {}
