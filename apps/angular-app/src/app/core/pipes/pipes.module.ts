import { NgModule } from '@angular/core';
import { AttendanceReadoutPipe } from './attendance-readout.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { EnhancementReadoutPipe } from './enhancement-readout.pipe';
import { FunctionPipe } from './function.pipe';
import { PlainTextToHtmlPipe } from './plain-text-to-html.pipe';
import { TableDataPipe } from './table-data.pipe';

const allPipes = [
  AttendanceReadoutPipe,
  DateFormatPipe,
  EnhancementReadoutPipe,
  FunctionPipe,
  PlainTextToHtmlPipe,
  TableDataPipe,
];

@NgModule({
  declarations: allPipes,
  exports: allPipes,
})
export class PipesModule {}
