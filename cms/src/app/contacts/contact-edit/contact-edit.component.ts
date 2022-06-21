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
      if(this.groupContacts != null){
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact));
      }
    })
  }

  onSubmit(form: FormGroup){
    console.log(this.originalContact);
    let value = form.value;
    let newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
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

}
