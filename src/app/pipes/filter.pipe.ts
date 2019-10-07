import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const data = [];
    if ( arg.lenght === '') { return value; }
    for (const allData of value) {
      if ( allData.firstname.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        data.push(allData);
      }
      if ( allData.country.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        data.push(allData);
      }
    }
    return data;
  }

}
