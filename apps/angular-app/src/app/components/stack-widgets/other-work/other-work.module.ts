import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { OtherWorkDumbComponent } from './other-work-dumb/other-work-dumb.component';
import { OtherWorkSmartComponent } from './other-work-smart/other-work-smart.component';

const allComponents = [OtherWorkSmartComponent, OtherWorkDumbComponent];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    MoleculesModule,
    PipesModule,
    StackWidgetWrapperModule,
    TableModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class OtherWorkModule {}
