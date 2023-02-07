import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '../../../core/directives/directives.module';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { JumpToLinksDumbComponent } from './jump-to-links-dumb/jump-to-links-dumb.component';
import { JumpToLinksSmartComponent } from './jump-to-links-smart/jump-to-links-smart.component';

const allComponents = [JumpToLinksSmartComponent, JumpToLinksDumbComponent];

@NgModule({
  imports: [
    AtomsModule,
    CommonModule,
    DirectivesModule,
    MoleculesModule,
    PipesModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class JumpToLinksModule {}
