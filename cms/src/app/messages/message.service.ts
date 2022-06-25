import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";
@Injectable({
    providedIn: 'root'
})
export class MessageService{
    messages: Message[];
    maxMessageId: number;
    messageChangedEvent = new EventEmitter<Message[]>();
    messageListChangedEvent = new Subject<Message[]>();
    constructor(private http: HttpClient){
        this.messages = MOCKMESSAGES;
    }

    getMessages(): Message[]{
        this.http.get('https://wdd-430-cms-ff32b-default-rtdb.firebaseio.com/messages.json')
        .subscribe({
            next: (messages: Message[]) =>{
                this.messages = messages;
                this.maxMessageId = this.getMaxId();
                this.messages.sort();
                this.messageListChangedEvent.next([...this.messages]);
            }, 
            error: (e) => console.log(e.message),
        });

        this.messageChangedEvent.emit(this.messages.slice());
        
        return;
    }
 
    getMessage(id: string): Message{
        for(let message of this.messages){
             if(message.id == id){
                 return message;
             }
             else{
                 return null;
             }
        }
     }

     addMessage(message: Message){
        this.messages.push(message);
        this.storeMessages();
     }

     getMaxId() {
        let maxId = 0;
         this.messages.forEach(message => {
            let currentId = parseInt(message.id);
            if(currentId > maxId){
                maxId = currentId;
            }
         });    

        return maxId;
     }

     storeMessages(){
        let messagesString = JSON.stringify(this.messages);

        this.http.put('https://wdd-430-cms-ff32b-default-rtdb.firebaseio.com/messages.json', messagesString)
        .subscribe(()=>{
            this.messageChangedEvent.emit(this.messages.slice());
        });
        // Make sure to add the header
    }
}