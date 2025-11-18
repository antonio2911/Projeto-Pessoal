import { Pipe, PipeTransform } from '@angular/core';
import { exibeNomeDaCor } from '../pipes/helpers/helpers';

@Pipe({
  name: 'nomeCor',
})
export class NomeCorPipe implements PipeTransform {
  transform(value: any) {
    return exibeNomeDaCor(value);
  }
}
