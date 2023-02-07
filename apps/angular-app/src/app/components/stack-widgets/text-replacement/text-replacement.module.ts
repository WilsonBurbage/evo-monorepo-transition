import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TextReplacementDumbComponent } from './text-replacement-dumb/text-replacement-dumb.component';
import { TextReplacementSmartComponent } from './text-replacement-smart/text-replacement-smart.component';

const allComponents = [
  TextReplacementSmartComponent,
  TextReplacementDumbComponent,
];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    MoleculesModule,
    StackWidgetWrapperModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class TextReplacementModule {}
