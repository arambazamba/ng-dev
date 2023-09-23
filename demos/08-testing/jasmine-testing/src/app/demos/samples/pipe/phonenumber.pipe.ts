import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonenumber',
  standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (undefined !== value && value.length === 10) {
      return (
        `(${value.substring(0, 3)}) ${value.substring(3, 6)} ${value.substring(6)}`
      );
    } else {
      return value;
    }
  }
}
