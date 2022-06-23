import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact[] =[];
   maxContactId: number;
   contactSelectedEvent = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();

    contactListChangedEvent = new Subject<Contact[]>();

   constructor() {
      this.contacts = MOCKCONTACTS;
      this.maxContactId = this.getMaxId();
   }

   getContacts(): Contact[]{
       return this.contacts.slice();
   }

   getContact(id: number): Contact{
       for(let contact of this.contacts){
            if(contact.id == id){
                return contact;
            }
       }
       return null;
    }
    getMaxId(): number{
        let maxId = 0;
        this.contacts.forEach(document => {
           let currentId = parseInt(document.id);
           if(currentId > maxId){
               maxId = currentId;
           }
        });    

       return maxId;

    }

    // deleteContact(contact: Contact) {
    //     if (!contact) {
    //         return;
    //      }
    //      const pos = this.contacts.indexOf(contact);
    //      if (pos < 0) {
    //         return;
    //      }
    //      this.contacts.splice(pos, 1);
    //      this.contactChangedEvent.emit(this.contacts.slice());
    //  }

    addContact(newContact: Contact){
        if(newContact == null || newContact == undefined){
            return
        }

        this.maxContactId++;
        newContact.id = this.maxContactId;
        this.contacts.push(newContact);
        let contactListCloned = this.contacts.slice();
        this.contactListChangedEvent.next(contactListCloned);
    }

    updateContact(originalContact: Contact, newContact: Contact){
    
        if((originalContact == null || undefined) || (newContact == null || undefined)){
            return;
        }

        let pos = this.contacts.indexOf(originalContact);
        if(pos < 0){
           return;
        }
       this.contacts[pos] = newContact;
       let contactsListClone = this.contacts.slice();
       console.log(contactsListClone);
       this.contactListChangedEvent.next(contactsListClone);
    }

    deleteContact(contact: Contact) {
        if(contact == null || undefined){
            return;
        }


        let pos = this.contacts.indexOf(contact)
        if (pos < 0){
            return;
        }

        this.contacts.splice(pos, 1)
        let contactsListClone = this.contacts.slice()
        this.contactListChangedEvent.next(contactsListClone);
    }
}
