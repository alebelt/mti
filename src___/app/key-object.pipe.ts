import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyObject'
})
export class KeyObjectPipe implements PipeTransform {

  transform(value: any): Array<any> {
    
        return Object.keys(value).reduce((acc: Array<any>, key) => {
      if(key){
            acc.push({ key, value: value[key] });
         }
          return acc;
        }, []);      
   

  }
}
