import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { RateGroupDumbComponent } from './rate-group-dumb/rate-group-dumb.component';
import { RateGroupSmartComponent } from './rate-group-smart/rate-group-smart.component';

const allComponents = [RateGroupSmartComponent, RateGroupDumbComponent];

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
export class RateGroupModule {}
