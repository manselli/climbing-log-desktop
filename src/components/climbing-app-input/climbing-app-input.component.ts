import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, tap } from "rxjs";

export type InputTypes = 'text' | 'password' | 'number' | 'color';//'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

@Component({
    selector: 'climbing-app-input',
    templateUrl: 'climbing-app-input.component.html',
    styleUrl: 'climbing-app-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ClimbingAppInputComponent implements AfterViewInit, OnInit {
    private readonly _destroy: DestroyRef = inject(DestroyRef);

    @ViewChild('inp') inputEl!: ElementRef;

    @Input() placeholder: string = '';
    @Input() type: InputTypes = 'text';
    @Input() control: FormControl = new FormControl();
    @Input() dataKey: string;
    @Input() fullWidth: boolean = false;

    @Output() valueChange = new EventEmitter<string>();
    @Output() click = new EventEmitter<MouseEvent>();
    @Output() onFocus = new EventEmitter<FocusEvent>();
    @Output() onBlur = new EventEmitter<FocusEvent>();
    @Output() onRightIconClick = new EventEmitter<PointerEvent>();

    @Input() rightLabel: string | null = null;
    @Input() rightIcon: string | null = null;

    @Input() errorMessage: string = 'This field is required';

    @Input() minValue: number;
    @Input() maxValue: number;
    @Input() step: number;

    isTouched$ = new BehaviorSubject<boolean>(false);
    isInvalid$ = new BehaviorSubject<boolean>(false);


    @ViewChild('inp') inputElement: ElementRef;

    public passwordVisible$ = new BehaviorSubject<boolean>(false);
    public isFocused$ = new BehaviorSubject(false);

    public Boolean = Boolean;


    constructor(private _elementRef: ElementRef, private renderer: Renderer2) { };

    ngOnInit(): void {
        this.isTouched$.next(this.control.touched);
        this.isInvalid$.next(!this.control.valid);

        this.control.valueChanges.pipe(
            tap(value => {
                this.valueChange.emit(value);
            }),
            takeUntilDestroyed(this._destroy)
        ).subscribe();

        this.control.statusChanges.pipe(
            tap((value) => {
                this.isInvalid$.next(value !== 'VALID');
                this.isTouched$.next(this.control.touched);
            }),
            takeUntilDestroyed(this._destroy)
        ).subscribe();



    }

    ngAfterViewInit(): void {
        if (this.control.value) {
            //if The control has initial value trigger the onChangeValue to show the content properly according to dataKey
            this.onChangeValue(this.control.value);
        }
        this._elementRef.nativeElement.classList.add('albi-input-component');
        if (this.fullWidth) {
            this._elementRef.nativeElement.classList.add('albi-input-component--full-width');
        }
    };

    onChangeValue(event: any) {
        if (typeof event === 'object') {
            (this.inputElement.nativeElement as HTMLInputElement).value = this.dataKey ? event[this.dataKey] : event;
        }
    }

    changeFocus(ev: FocusEvent) {
        if (ev.type === 'focus') {
            this.isFocused$.next(true);
        } else {
            this.isFocused$.next(false);
        }
    }

    onClick(event: MouseEvent) {
        this.click.emit(event);
    }

    changePasswordVisibility(passwordVisible: boolean) {
        this.passwordVisible$.next(passwordVisible);
    }

    focusEvent(ev: FocusEvent) {
        this.onFocus.emit(ev);
    }
    blurEvent(ev: FocusEvent) {
        this.onBlur.emit(ev);
    }
    handleRightIconClick(ev: PointerEvent) {
        this.onRightIconClick.emit(ev);
    }

    handleOnInput(ev: Event) {
        const input = (this.inputEl.nativeElement as HTMLInputElement);
        if (ev)
            switch (this.type) {
                case "number":
                    if (this.minValue != undefined && (Number(input.value)) < this.minValue) {
                        input.value = this.minValue.toString();
                        ev.preventDefault();
                    }
                    if (this.maxValue != undefined && (Number(input.value)) > this.maxValue) {
                        input.value = this.maxValue.toString();
                        ev.preventDefault();
                    }
                    break;
                case "text":
                case "password":
                case "color":
            }
    }
}