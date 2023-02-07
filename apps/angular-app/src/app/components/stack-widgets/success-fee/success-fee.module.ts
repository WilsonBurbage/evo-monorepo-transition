import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { SuccessFeeDumbComponent } from './success-fee-dumb/success-fee-dumb.component';
import { SuccessFeeSmartComponent } from './success-fee-smart/success-fee-smart.component';

const allComponents = [SuccessFeeSmartComponent, SuccessFeeDumbComponent];

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
export class SuccessFeeModule {}
