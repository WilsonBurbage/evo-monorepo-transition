import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { FeeEarnerDumbComponent } from './fee-earner-dumb/fee-earner-dumb.component';
import { FeeEarnerSmartComponent } from './fee-earner-smart/fee-earner-smart.component';

const allComponents = [FeeEarnerSmartComponent, FeeEarnerDumbComponent];

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
export class FeeEarnerModule {}
