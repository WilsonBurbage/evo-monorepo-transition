import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { StackWidgetWrapperModule } from '../../organisms/stack-widget-wrapper/stack-widget-wrapper.module';
import { EnhancementDumbComponent } from './enhancement-dumb/enhancement-dumb.component';
import { EnhancementSmartComponent } from './enhancement-smart/enhancement-smart.component';

const allComponents = [EnhancementSmartComponent, EnhancementDumbComponent];

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
export class EnhancementModule {}
