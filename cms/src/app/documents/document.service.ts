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

    getDocuments(): Document[]{

        console.log('documents in getDocuments()');

        this.http.get('https://wdd-430-cms-ff32b-default-rtdb.firebaseio.com/documents.json')
        .subscribe({
            next: (documents: Document[]) =>{
                this.documents = documents;
                this.maxDocumentId = this.getMaxId();
                this.documents.sort();
                this.documentListChangedEvent.next([...this.documents]);
            }, 
            error: (e) => console.log(e.message),
        });

        this.documentChangedEvent.emit(this.documents.slice());
        
        return;
    }

    // deleteDocument(document: Document) {
    //     if (!document) {
    //        return;
    //     }
    //     const pos = this.documents.indexOf(document);
    //     if (pos < 0) {
    //        return;
    //     }
    //     this.documents.splice(pos, 1);
    //     this.documentChangedEvent.emit(this.documents.slice());
    //  }

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

     addDocument(newDocument: Document){
        if(newDocument == null || newDocument == undefined){
            return
        }

        this.maxDocumentId++;
        newDocument.id = this.maxDocumentId;
        this.documents.push(newDocument);
        let documentListCloned = this.documents.slice();
        this.documentListChangedEvent.next(documentListCloned);
        this.storeDocuments();
     }

     updateDocument(originalDocument: Document, newDocument: Document){
         if((originalDocument == null || undefined) || (newDocument == null || undefined)){
             return;
         }

         let pos = this.documents.indexOf(originalDocument);
         if(pos < 0){
            return;
         }

        //  newDocument.id = originalDocument.id
        this.documents[pos] = newDocument;
        let documentsListClone = this.documents.slice();
        this.storeDocuments();
     }


    deleteDocument(document: Document) {
        if(document == null || undefined){
            return;
        }


        let pos = this.documents.indexOf(document)
        if (pos < 0){
            return;
        }

        this.documents.splice(pos, 1)
        let documentsListClone = this.documents.slice()
        this.storeDocuments();
    }


    storeDocuments(){
        let documentsString = JSON.stringify(this.documents);

        this.http.put('https://wdd-430-cms-ff32b-default-rtdb.firebaseio.com/documents.json', documentsString)
        .subscribe(()=>{
            this.documentChangedEvent.emit(this.documents.slice());
        });
        // Make sure to add the header
    }
     
}
