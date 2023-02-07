import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from './../../atoms/atoms.module';
import { MoleculesModule } from './../../molecules/molecules.module';
import { ToastDumbComponent } from './toast-dumb/toast-dumb.component';
import { ToastSmartComponent } from './toast-smart/toast-smart.component';

const allComponents = [ToastSmartComponent, ToastDumbComponent];

@NgModule({
  imports: [AtomsModule, CommonModule, MoleculesModule],
  declarations: allComponents,
  exports: allComponents,
})
export class ToastModule {}
