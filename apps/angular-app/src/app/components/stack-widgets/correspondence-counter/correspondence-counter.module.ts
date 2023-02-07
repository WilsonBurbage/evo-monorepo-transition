import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { CorrespondenceCounterDumbComponent } from './correspondence-counter-dumb/correspondence-counter-dumb.component';
import { CorrespondenceCounterSmartComponent } from './correspondence-counter-smart/correspondence-counter-smart.component';

const allComponents = [
  CorrespondenceCounterSmartComponent,
  CorrespondenceCounterDumbComponent,
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
export class CorrespondenceCounterModule {}
