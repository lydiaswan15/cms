import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: false;



  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {
}

  ngOnInit(): void {
    console.log(this.document);
  }

  onSubmit(form: FormGroup){
    let value = form.value;
    console.log(value);
    let newDocument = new Document(1, value.name, value.description, value.url);
    // How do we update the ID to be unique for each value?

  }
  onCancel(){}

}
