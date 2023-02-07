import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '../../../core/directives/directives.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { StackWidgetWrapperDumbComponent } from './stack-widget-wrapper-dumb/stack-widget-wrapper-dumb.component';
import { StackWidgetWrapperSmartComponent } from './stack-widget-wrapper-smart/stack-widget-wrapper-smart.component';

const allComponents = [
  StackWidgetWrapperSmartComponent,
  StackWidgetWrapperDumbComponent,
];

@NgModule({
  imports: [AtomsModule, CommonModule, DirectivesModule],
  declarations: allComponents,
  exports: allComponents,
})
export class StackWidgetWrapperModule {}
