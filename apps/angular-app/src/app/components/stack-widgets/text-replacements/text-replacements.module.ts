import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { TextReplacementsDumbComponent } from './text-replacements-dumb/text-replacements-dumb.component';
import { TextReplacementsSmartComponent } from './text-replacements-smart/text-replacements-smart.component';

const allComponents = [
  TextReplacementsSmartComponent,
  TextReplacementsDumbComponent,
];

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
export class TextReplacementsModule {}
