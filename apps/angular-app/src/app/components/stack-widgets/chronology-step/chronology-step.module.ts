import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { ChronologyStepDumbComponent } from './chronology-step-dumb/chronology-step-dumb.component';
import { ChronologyStepSmartComponent } from './chronology-step-smart/chronology-step-smart.component';

const allComponents = [
  ChronologyStepSmartComponent,
  ChronologyStepDumbComponent,
];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    MoleculesModule,
    PipesModule,
    StackWidgetWrapperModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class ChronologyStepModule {}
