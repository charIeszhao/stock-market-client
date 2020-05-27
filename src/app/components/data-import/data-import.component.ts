import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockPriceService } from '../../services/stock-price.service';

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

  constructor(private priceService: StockPriceService) {
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

    const formData = new FormData();
    if (this.fileToUpload) {
      this.isUploaded = true;
      formData.append('file', this.fileToUpload);

      this.priceService.importExcel(formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
  }
}
