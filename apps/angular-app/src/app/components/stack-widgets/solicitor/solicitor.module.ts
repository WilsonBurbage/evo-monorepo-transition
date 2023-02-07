import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { SolicitorDumbComponent } from './solicitor-dumb/solicitor-dumb.component';
import { SolicitorSmartComponent } from './solicitor-smart/solicitor-smart.component';

const allComponents = [SolicitorSmartComponent, SolicitorDumbComponent];

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
export class SolicitorModule {}
