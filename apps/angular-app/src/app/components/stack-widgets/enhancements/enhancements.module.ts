import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { EnhancementsDumbComponent } from './enhancements-dumb/enhancements-dumb.component';
import { EnhancementsSmartComponent } from './enhancements-smart/enhancements-smart.component';

const allComponents = [EnhancementsSmartComponent, EnhancementsDumbComponent];

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
export class EnhancementsModule {}
