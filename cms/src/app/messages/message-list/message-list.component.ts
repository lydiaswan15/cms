import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[]= [
    {
      id: 1, 
      subject: "Test Subject", 
      msgText: "Test Message", 
      sender: "Test sender"
    }, 
    {
      id: 2, 
      subject: "Test Subject 1", 
      msgText: "Test Message", 
      sender: "Test Sender 2"
    }, 
    {
      id: 3, 
      subject: "Test Subject 3", 
      msgText: "Test Message", 
      sender: "Test Sender 3"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
