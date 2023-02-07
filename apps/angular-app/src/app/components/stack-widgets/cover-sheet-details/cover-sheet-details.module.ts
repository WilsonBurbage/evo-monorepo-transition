import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { CoverSheetDetailsDumbComponent } from './cover-sheet-details-dumb/cover-sheet-details-dumb.component';
import { CoverSheetDetailsSmartComponent } from './cover-sheet-details-smart/cover-sheet-details-smart.component';

const allComponents = [
  CoverSheetDetailsSmartComponent,
  CoverSheetDetailsDumbComponent,
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
export class CoverSheetDetailsModule {}
