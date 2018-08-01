import { 
  Component, 
  OnInit, 
  HostListener, 
  Inject, 
  ElementRef,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
//import { DOCUMENT } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent implements OnInit, AfterViewInit {
   
  navIsFixed: boolean = true;
  @Output() navHeight = new EventEmitter<number>();
  @ViewChild('barraSuperior', {read: ElementRef}) barraSuperior: ElementRef;
  
  constructor(
    // @Inject(DOCUMENT) private document: Document
  ) { }
  
  ngAfterViewInit(): void {
    // envia o height da barra superior para o app-component
    this.navHeight.emit(this.barraSuperior.nativeElement.clientHeight)
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    //console.log(this.document.documentElement.scrollTop + ' ' + this.navHeight )
    
    // if (this.document.documentElement.scrollTop > this.navHeight) {
    //   this.navIsFixed = true
    // } else if (this.navIsFixed) {
    //   this.navIsFixed = false
    // }

  }

}
