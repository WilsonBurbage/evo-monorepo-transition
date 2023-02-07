import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { DisbursementDumbComponent } from './disbursement-dumb/disbursement-dumb.component';
import { DisbursementSmartComponent } from './disbursement-smart/disbursement-smart.component';

const allComponents = [DisbursementSmartComponent, DisbursementDumbComponent];

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
export class DisbursementModule {}
