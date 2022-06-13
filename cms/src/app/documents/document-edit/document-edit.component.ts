import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: false;


  constructor() {
   }

  ngOnInit(): void {
    console.log(this.document);
  }

  onSubmit(form: FormGroup){}
  onCancel(){}

}
