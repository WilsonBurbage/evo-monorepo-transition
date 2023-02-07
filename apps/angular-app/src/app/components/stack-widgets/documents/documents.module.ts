import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { DocumentsDumbComponent } from './documents-dumb/documents-dumb.component';
import { DocumentsSmartComponent } from './documents-smart/documents-smart.component';

const allComponents = [DocumentsSmartComponent, DocumentsDumbComponent];

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
export class DocumentsModule {}
