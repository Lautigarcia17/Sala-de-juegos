import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dayName',
  standalone: true
})
export class DayNamePipe implements PipeTransform {
  constructor(){}
  transform(date: Date): string {
    const numberDay = date.getDay();

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDay = dayNames[numberDay];
    
    return currentDay;
  }

}
