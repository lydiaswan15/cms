import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute){

    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      let id = params.id;
      if(id == null || undefined){
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if(this.originalContact == undefined || null){
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      // This line might not be correct
      if(this.originalContact.group != null){
        this.groupContacts = this.originalContact.group.splice();
        console.log(this.groupContacts);
      
      }
      console.log("OnInit: ");
      console.log(this.contact);
    })
  }

  onSubmit(form: FormGroup){
    let id;
    if(!this.originalContact){
      // There is no id and we need to set one. 

      id = this.contactService.getMaxId();
    }
    else{
      // We are editing a current document and will use the old id. 
      id = this.originalContact.id;
    }
    let value = form.value;
    let newContact = new Contact(id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    console.log(newContact);
    if(this.editMode == true){
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else{
      this.contactService.addContact(newContact)
    }
    this.router.navigate(['/contacts']);

  }

  onCancel(){
    this.router.navigate(['contacts'])
  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }

    if(this.contact && newContact.id=== this.contact.id){
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        return true;
     }
   }
   return false;
  }



addToGroup($event: any) {
  const selectedContact: Contact = $event.dragData;
  const invalidGroupContact = this.isInvalidContact(selectedContact);
  if (invalidGroupContact){
     return;
  }
  this.groupContacts.push(selectedContact);
}


onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}

}
