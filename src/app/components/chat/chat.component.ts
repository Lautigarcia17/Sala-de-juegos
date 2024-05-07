import { Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { GlobalDataService } from '../../services/global-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { DatabaseService } from '../../services/database.service';
import { DayNamePipe } from '../../pipes/day-name.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatSidenavModule, CommonModule,FormsModule,DayNamePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent{
  message! : string;
  lastDay! : string;
  @Input() percentageWidth! : string;
  @Input() percentageHeigth! : string;
  @Output() sidenavClosed = new EventEmitter<void>();


  constructor(public globalData : GlobalDataService, public localstorage : LocalStorageService, private database : DatabaseService){}




  sendMessage(){
    if (this.message != '') {
      this.database.sendMessage(this.localstorage.currentUser,this.message);
      this.message = '';
    }
  }
  
  validateSameDay(date : Date,index : number) : boolean{

    let showDate = false;
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let nextDate = new Date();

    if (index !== 0) {
      nextDate = this.globalData.getMessages()[index-1].time;
    }

    if(dayNames[date.getDay()] !== this.lastDay)
    {
      this.lastDay = dayNames[date.getDay()];
      showDate = true;
    }
    else if(index !== 0 && dayNames[nextDate.getDay()] == dayNames[date.getDay()] && (date.getDate() !== nextDate.getDate() || date.getMonth() !== nextDate.getMonth() || date.getFullYear() !== nextDate.getFullYear()))
    {
      showDate = true;
    }


    return showDate
  }

  resetScreen() {
    this.sidenavClosed.emit();
  }

}
