/* eslint-disable @typescript-eslint/no-explicit-any */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'function' })
export class FunctionPipe implements PipeTransform {
  transform<T>(
    context: any,
    callback: (...args: any[]) => T,
    ...args: any[]
  ): T {
    if (!callback) {
      return null as T;
    }

    const result = callback.apply(context, [...args]);

    return result;
  }
}
