import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {
  

    return value ? list.filter(item => item.wareNum === value) : list;
    // return value ? list.filter(item => {
    //   return item.wareNum.includes(value);}); list;
    
  }

}