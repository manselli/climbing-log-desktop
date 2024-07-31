import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CLIMBING_APP_ICONS } from './climbing-app-icon.code';


@Component({
  selector: 'climbing-app-icon',
  template: `
  <ng-container></ng-container>`,
  styleUrls: ['climbing-app-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ClimbingAppIconComponent implements OnInit, AfterViewInit {
  @Input() name: string;
  @Input() size: '20' | '24' = '20';

  @Output() onClick = new EventEmitter<PointerEvent>();


  @HostListener('click', ['$event'])
  handleClick(event: PointerEvent) {
    this.onClick.emit(event);
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
    const iconLibraryKeys = this.name.split('.');
    let iconValue: any = CLIMBING_APP_ICONS;
    for (const iconLibraryKey of iconLibraryKeys) {
      iconValue = iconValue[iconLibraryKey];
    }
    this._elementRef.nativeElement.innerHTML = iconValue || null;
  }

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.classList.add('climbing-app-icon');
    switch (this.size) {
      case '24':
        this._elementRef.nativeElement.classList.add('medium-size');
        break;
      case '20':
      default:
        this._elementRef.nativeElement.classList.add('small-size');

    }
  }
}
