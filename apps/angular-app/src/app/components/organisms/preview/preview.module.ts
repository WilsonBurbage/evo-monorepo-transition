import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '../../../core/directives/directives.module';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { PreviewDumbComponent } from './preview-dumb/preview-dumb.component';
import { PreviewSmartComponent } from './preview-smart/preview-smart.component';

const allComponents = [PreviewSmartComponent, PreviewDumbComponent];

@NgModule({
  imports: [AtomsModule, CommonModule, DirectivesModule, PipesModule],
  declarations: allComponents,
  exports: allComponents,
})
export class PreviewModule {}
