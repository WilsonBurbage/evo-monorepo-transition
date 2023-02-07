import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoleculesModule } from '../../molecules/molecules.module';
import { ActiveElementSelectorDumbComponent } from './active-element-selector-dumb/active-element-selector-dumb.component';
import { ActiveElementSelectorSmartComponent } from './active-element-selector-smart/active-element-selector-smart.component';

const allComponents = [
  ActiveElementSelectorSmartComponent,
  ActiveElementSelectorDumbComponent,
];

@NgModule({
  imports: [CommonModule, MoleculesModule],
  declarations: allComponents,
  exports: allComponents,
})
export class ActiveElementSelectorModule {}
