import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

export enum ClimbingAppButtonColorEnum {
  RUBY = 'ruby',
  GREEN = 'green',
  ECO = 'eco',
  BLACK = 'black',
}

@Component({
  selector: 'climbing-app-button',
  templateUrl: './climbing-app-button.component.html',
  styleUrl: './climbing-app-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ClimbingAppButtonComponent implements AfterViewInit {
  @Input() label: string;

  @Input() disabled: boolean = false;
  @Input() buttonColor: ClimbingAppButtonColorEnum;
  @Input() buttonVariant: 'filled' | 'outlined' | 'textOnly' = 'filled';
  @Input() size: 'small' | 'medium' | 'fluid' = 'medium';
  @Input() iconName: string;
  @Input() type: 'button' | 'menu' | 'reset' | 'submit' = 'button';
  @Input() isMatIcon: boolean = false;

  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor(private _elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.classList.add('albi-button');

    switch (this.size) {
      case 'small':
        this._elementRef.nativeElement.classList.add((!this.label && this.iconName) ? 'small-button--regular-x-pad' : 'small-button--large-x-pad');
        break;
      case 'fluid':
        this._elementRef.nativeElement.classList.add('fluid-button');
        break;
      case 'medium':
        this._elementRef.nativeElement.classList.add((!this.label && this.iconName) ? 'medium-button--regular-x-pad' : 'medium-button--large-x-pad');
        break;
    }

    switch (this.buttonColor) {
      case ClimbingAppButtonColorEnum.GREEN:
      case ClimbingAppButtonColorEnum.ECO:
        switch (this.buttonVariant) {
          case 'outlined':
            this._elementRef.nativeElement.classList.add(this.disabled ? 'eco-button-outlined--disabled' : 'eco-button-outlined--active');
            break;
          case 'textOnly':
            this._elementRef.nativeElement.classList.add(this.disabled ? 'eco-button-text-only--disabled' : 'eco-button-text-only--active');
            break;
          default:
            this._elementRef.nativeElement.classList.add(this.disabled ? 'eco-button-filled--disabled' : 'eco-button-filled--active');
        }
        break;
      case ClimbingAppButtonColorEnum.BLACK:
        switch (this.buttonVariant) {
          case 'outlined':
            this._elementRef.nativeElement.classList.add(this.disabled ? 'black-button-outlined--disabled' : 'black-button-outlined--active');
            break;
          case 'textOnly':
            this._elementRef.nativeElement.classList.add(this.disabled ? 'black-button-text-only--disabled' : 'black-button-text-only--active');
            break;
          default:
            this._elementRef.nativeElement.classList.add(this.disabled ? 'black-button-filled--disabled' : 'black-button-filled--active');
        }
        break;
      case ClimbingAppButtonColorEnum.RUBY:
      default:
        switch (this.buttonVariant) {
          case 'outlined':
            this._elementRef.nativeElement.classList.add(this.disabled ? 'ruby-button-outlined--disabled' : 'ruby-button-outlined--active');
            break;
          case 'textOnly':
            this._elementRef.nativeElement.classList.add(this.disabled ? 'ruby-button-text-only--disabled' : 'ruby-button-text-only--active');
            break;
          default:
            this._elementRef.nativeElement.classList.add(this.disabled ? 'ruby-button-filled--disabled' : 'ruby-button-filled--active');
        }
    }

  }

  onClickAction(event: MouseEvent) {
    this.onClick.emit(event)
  }
}
