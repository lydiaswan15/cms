import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;



  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {
}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      let id = params.id;
      if(id == undefined || null){
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if(this.originalDocument == undefined ||null){
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));

    })
  }

  onSubmit(form: NgForm){
    let value = form.value;
    let id;

    if(!this.originalDocument){
      // There is no id and we need to set one. 

      id = this.documentService.getMaxId();
    }
    else{
      // We are editing a current document and will use the old id. 
      id = this.originalDocument.id;
    }

    let newDocument = new Document(id, value.name, value.description, value.url);
    console.log(newDocument);

    if(this.editMode == true){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else{
      this.documentService.addDocument(newDocument)
    }
    this.router.navigate(['/documents']);

  }
  onCancel(){
    this.router.navigate(['documents']);
  }

}
