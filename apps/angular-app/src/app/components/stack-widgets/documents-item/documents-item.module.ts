import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { DocumentsItemDumbComponent } from './documents-item-dumb/documents-item-dumb.component';
import { DocumentsItemSmartComponent } from './documents-item-smart/documents-item-smart.component';

const allComponents = [DocumentsItemSmartComponent, DocumentsItemDumbComponent];

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
export class DocumentsItemModule {}
