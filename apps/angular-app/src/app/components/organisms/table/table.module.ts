import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '../../../core/directives/directives.module';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { TableDumbComponent } from './table-dumb/table-dumb.component';
import { TableSmartComponent } from './table-smart/table-smart.component';

const allComponents = [TableSmartComponent, TableDumbComponent];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    DirectivesModule,
    DragDropModule,
    PipesModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class TableModule {}
