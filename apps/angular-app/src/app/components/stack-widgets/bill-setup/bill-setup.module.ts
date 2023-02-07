import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { BillSetupDumbComponent } from './bill-setup-dumb/bill-setup-dumb.component';
import { BillSetupSmartComponent } from './bill-setup-smart/bill-setup-smart.component';

const allComponents = [BillSetupSmartComponent, BillSetupDumbComponent];

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
export class BillSetupModule {}
