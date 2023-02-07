import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { PartiesDumbComponent } from './parties-dumb/parties-dumb.component';
import { PartiesSmartComponent } from './parties-smart/parties-smart.component';

const allComponents = [PartiesSmartComponent, PartiesDumbComponent];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    MoleculesModule,
    StackWidgetWrapperModule,
    TableModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class PartiesModule {}
