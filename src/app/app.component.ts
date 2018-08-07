import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navHeight: number
  @ViewChild('listagem') listagem: ElementRef

  constructor(private _renderer: Renderer2) {}

  OnNavHeight(e) {
    this.navHeight = e;
    let strPad: string = this.navHeight + 'px'
    this._renderer.setStyle(this.listagem.nativeElement, 'padding-top', strPad)
  }

}
