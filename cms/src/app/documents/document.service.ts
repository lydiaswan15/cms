import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class DocumentService{
    documents: Document[] = [];
    maxDocumentId: number;

    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();

    constructor(private http: HttpClient){
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocument(id: number){
        for(let document of this.documents){
            if(document.id == id){
                return document;
            }
       }
       return null;

    }

    getDocuments(): Document[] {
      this.http.get('http://localhost:3000/documents').subscribe({
        next: (documents: Document[])=>{
          this.documents = documents;
          this.sortAndSend();
        }, 
        error: (e) =>{
          console.log(e.message);
        }
      })
      return;
    }


     getMaxId(): number{
         let maxId = 0;
         this.documents.forEach(document => {
            let currentId = parseInt(document.id);
            if(currentId > maxId){
                maxId = currentId;
            }
         });    

        return maxId;

     }

     
addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }


    
deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }


    storeDocuments(){
        let documentsString = JSON.stringify(this.documents);

        this.http.put('https://wdd-430-cms-ff32b-default-rtdb.firebaseio.com/documents.json', documentsString)
        .subscribe(()=>{
            this.documentChangedEvent.emit(this.documents.slice());
        });
        // Make sure to add the header
    }

    sortAndSend(){
        // Yeah, you have to write this one yourself. 
        // It does exactly what its name suggests: it sorts then sends an array to your observable
        //  (like the contactListChangedEvent Subject).

        let documentsString = JSON.stringify(this.documents);

        this.http.put('https://wdd-430-cms-ff32b-default-rtdb.firebaseio.com/documents.json', documentsString)
        .subscribe(()=>{
            this.documentChangedEvent.emit(this.documents.slice());
        });
    }
     
}
