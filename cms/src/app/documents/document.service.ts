import { EventEmitter } from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

export class DocumentService{
    documents: Document[];
    documentSelectedEvent = new EventEmitter<Document>();

    documentChangedEvent = new EventEmitter<Document[]>();

    constructor(){
        this.documents = MOCKDOCUMENTS;
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

    deleteDocument(document: Document) {
        if (!document) {
           return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
           return;
        }
        this.documents.splice(pos, 1);
        this.documentChangedEvent.emit(this.documents.slice());
     }
     
}
