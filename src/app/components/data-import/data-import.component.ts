import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss']
})
export class DataImportComponent implements OnInit {

  @ViewChild('labelImport') labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;
  isUploaded = false;

  constructor() {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onFileChange(files: FileList): void {
    this.isUploaded = false;
    this.labelImport.nativeElement.innerText = files[0].name;
    this.fileToUpload = files[0];
  }

  import(): void {
    this.isUploaded = true;
  }
}
