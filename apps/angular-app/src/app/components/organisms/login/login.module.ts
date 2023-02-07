import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from './../../atoms/atoms.module';
import { MoleculesModule } from './../../molecules/molecules.module';
import { LoginDumbComponent } from './login-dumb/login-dumb.component';
import { LoginSmartComponent } from './login-smart/login-smart.component';

const allComponents = [LoginSmartComponent, LoginDumbComponent];

@NgModule({
  imports: [AtomsModule, CommonModule, MoleculesModule],
  declarations: allComponents,
  exports: allComponents,
})
export class LoginModule {}
