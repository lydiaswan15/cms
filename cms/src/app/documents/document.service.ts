import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

export class DocumentService{
    documents: Document[];
    maxDocumentId: number;

    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();

    constructor(){
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
        return this.documents.slice();
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
     }

     updateDocument(originalDocument: Document, newDocument: Document){
         if((originalDocument == null || undefined) || (newDocument == null || undefined)){
             return;
         }

         let pos = this.documents.indexOf(originalDocument);
         if(pos < 0){
            return;
         }

         newDocument.id = originalDocument.id
        this.documents[pos] = newDocument
        let documentsListClone = this.documents.slice()
        this.documentListChangedEvent.next(documentsListClone)
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
        this.documentListChangedEvent.next(documentsListClone);
    }
     
}
