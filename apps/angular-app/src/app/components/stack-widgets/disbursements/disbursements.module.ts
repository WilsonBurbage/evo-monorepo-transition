import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { DisbursementsDumbComponent } from './disbursements-dumb/disbursements-dumb.component';
import { DisbursementsSmartComponent } from './disbursements-smart/disbursements-smart.component';

const allComponents = [DisbursementsSmartComponent, DisbursementsDumbComponent];

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
export class DisbursementsModule {}
