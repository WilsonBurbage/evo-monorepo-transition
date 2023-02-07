import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { SuccessFeesDumbComponent } from './success-fees-dumb/success-fees-dumb.component';
import { SuccessFeesSmartComponent } from './success-fees-smart/success-fees-smart.component';

const allComponents = [SuccessFeesSmartComponent, SuccessFeesDumbComponent];

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
export class SuccessFeesModule {}
