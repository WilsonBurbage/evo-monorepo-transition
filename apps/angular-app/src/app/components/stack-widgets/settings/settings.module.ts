import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { SettingsDumbComponent } from './settings-dumb/settings-dumb.component';
import { SettingsSmartComponent } from './settings-smart/settings-smart.component';

const allComponents = [SettingsSmartComponent, SettingsDumbComponent];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    MoleculesModule,
    PipesModule,
    StackWidgetWrapperModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class SettingsModule {}
