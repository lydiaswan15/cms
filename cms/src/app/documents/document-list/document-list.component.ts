import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents = [
    new Document(1, "Lydia", "test discription", "byui.edu"), 
    new Document(1, "Miriam", "test discription", "byui.edu"), 
    new Document(1, "Lincoln", "test discription", "byui.edu"), 
    new Document(1, "Chad", "test discription", "byui.edu"), 
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
