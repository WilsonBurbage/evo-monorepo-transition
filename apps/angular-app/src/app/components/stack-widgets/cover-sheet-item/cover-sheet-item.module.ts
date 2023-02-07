import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { CoverSheetItemDumbComponent } from './cover-sheet-item-dumb/cover-sheet-item-dumb.component';
import { CoverSheetItemSmartComponent } from './cover-sheet-item-smart/cover-sheet-item-smart.component';

const allComponents = [
  CoverSheetItemSmartComponent,
  CoverSheetItemDumbComponent,
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
export class CoverSheetItemModule {}
