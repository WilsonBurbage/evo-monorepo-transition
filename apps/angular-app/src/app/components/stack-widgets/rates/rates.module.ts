import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { TableModule } from '../../organisms/table/table.module';
import { RatesDumbComponent } from './rates-dumb/rates-dumb.component';
import { RatesSmartComponent } from './rates-smart/rates-smart.component';

const allComponents = [RatesSmartComponent, RatesDumbComponent];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    MoleculesModule,
    PipesModule,
    StackWidgetWrapperModule,
    TableModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class RatesModule {}
