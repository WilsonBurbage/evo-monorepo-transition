import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { NarrativeDumbComponent } from './narrative-dumb/narrative-dumb.component';
import { NarrativeSmartComponent } from './narrative-smart/narrative-smart.component';

const allComponents = [NarrativeSmartComponent, NarrativeDumbComponent];

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
export class NarrativeModule {}
