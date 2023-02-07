import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { PartQuickLinksDumbComponent } from './part-quick-links-dumb/part-quick-links-dumb.component';
import { PartQuickLinksSmartComponent } from './part-quick-links-smart/part-quick-links-smart.component';

const allComponents = [
  PartQuickLinksSmartComponent,
  PartQuickLinksDumbComponent,
];

@NgModule({
  imports: [AtomsModule, CommonModule, MoleculesModule, PipesModule],
  declarations: allComponents,
  exports: allComponents,
})
export class PartQuickLinksModule {}
