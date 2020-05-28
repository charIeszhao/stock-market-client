import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockPriceService } from '../../services/stock-price.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  isLoading = false;
  faSpinner = faSpinner;
  totalImported: number;

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
    this.isLoading = true;

    const formData = new FormData();
    if (this.fileToUpload) {
      formData.append('file', this.fileToUpload);

      this.priceService.importExcel(formData).subscribe(
        (res) => {
          this.isUploaded = true;
          this.totalImported = res.count;
          this.labelImport.nativeElement.innerText = '';
          this.fileToUpload = null;
        },
        (err) => console.log(err),
        () => {
          this.isLoading = false;
        }
      );
    }
  }
}
