import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'plainTextToHtml',
})
export class PlainTextToHtmlPipe implements PipeTransform {
  transform(text: string): SafeHtml {
    const formattedValue = text
      ? String(text).replace(/\r/g, '<br>').replace(/\n/g, '<br>')
      : '';

    return this.sanitizer.bypassSecurityTrustHtml(formattedValue);
  }

  constructor(protected sanitizer: DomSanitizer) {}
}
