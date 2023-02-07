import { NgModule } from '@angular/core';
import { NgVarDirective } from './ng-var.directive';
import { TrapFocusDirective } from './trap-focus.directive';

const allDirectives = [NgVarDirective, TrapFocusDirective];

@NgModule({
  declarations: allDirectives,
  exports: allDirectives,
})
export class DirectivesModule {}
