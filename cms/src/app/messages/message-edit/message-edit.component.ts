import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();
  
  currentSender: string = "Lydia";

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(subject: string, msgText: string){

    let newMessage = new Message(1, subject, msgText, this.currentSender)
    this.addMessageEvent.emit(newMessage);

  }

  onClear(subject: string, msgText: string){
      subject = '', 
      msgText = ''
  }

}
