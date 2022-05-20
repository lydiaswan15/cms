import { EventEmitter } from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

export class DocumentService{
    documents: Document[];
    documentSelectedEvent = new EventEmitter<Document>();

    constructor(){
        this.documents = MOCKDOCUMENTS;
    }

    getDocument(id: string){
        for(let document of this.documents){
            if(document.id == id){
                return document;
            }
            else{
                return null;
            }
       }

    }

    getDocuments(): Document[]{
        return this.documents.slice();
    }
}
