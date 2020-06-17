import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'stockPriceChange'
})
export class StockPriceChangePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  transform(lastValue: number, priorDatePrice: number): SafeHtml {
    const change: number = Number((lastValue - priorDatePrice).toFixed(2));
    const color: string = change > 0 ? 'red' : '#00CC00';
    const changePct = this.forceShowPlusSign(Math.round(10000 * change / priorDatePrice) / 100);
    const changeStr = this.forceShowPlusSign(change);
    const html = `<span style="color: ${color}">${lastValue} (${changeStr} , ${changePct}%)</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  forceShowPlusSign(value: number): string {
    return (value > 0 ? '+' : '') + value;
  }
}
