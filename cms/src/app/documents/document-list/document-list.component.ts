import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[];
  subscription: Subscription;

  constructor(private documentService: DocumentService) { 
    this.documents = documentService.getDocuments();
  }

  ngOnInit(): void {

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: Document[])=>{
        this.documents = documentsList;
    });
    
    this.documentService.documentChangedEvent.subscribe((documents: Document[])=>{
      this.documents = documents;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
