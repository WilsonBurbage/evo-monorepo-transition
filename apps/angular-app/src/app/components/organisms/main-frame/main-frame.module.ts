import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '../../atoms/atoms.module';
import { ToastModule } from '../toast/toast.module';
import { MoleculesModule } from './../../molecules/molecules.module';
import { BillEditorModule } from './../bill-editor/bill-editor.module';
import { LoginModule } from './../login/login.module';
import { MainFrameDumbComponent } from './main-frame-dumb/main-frame-dumb.component';
import { MainFrameSmartComponent } from './main-frame-smart/main-frame-smart.component';

const allComponents = [MainFrameSmartComponent, MainFrameDumbComponent];

@NgModule({
  imports: [
    AtomsModule,
    BillEditorModule,
    CommonModule,
    LoginModule,
    MoleculesModule,
    ToastModule,
  ],
  declarations: allComponents,
  exports: allComponents,
})
export class MainFrameModule {}
