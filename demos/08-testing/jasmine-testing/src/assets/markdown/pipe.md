- Examine `phonenumber.pipe.ts` and `phonenumber.pipe.spec.ts`

```typescript
export class PhonenumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (undefined !== value && value.length === 10) {
      return (
        '(' +
        value.substring(0, 3) +
        ') ' +
        value.substring(3, 6) +
        ' ' +
        value.substring(6)
      );
    }
    return '';
  }
}
```
