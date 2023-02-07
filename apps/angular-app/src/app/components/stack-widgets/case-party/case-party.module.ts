import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { CasePartyDumbComponent } from './case-party-dumb/case-party-dumb.component';
import { CasePartySmartComponent } from './case-party-smart/case-party-smart.component';

const allComponents = [CasePartySmartComponent, CasePartyDumbComponent];

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
export class CasePartyModule {}
