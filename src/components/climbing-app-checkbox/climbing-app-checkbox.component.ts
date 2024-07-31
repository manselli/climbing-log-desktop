import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'climbing-app-checkbox',
    templateUrl: 'climbing-app-checkbox.component.html',
    styleUrls: ['climbing-app-checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClimbingAppCheckbox implements AfterViewInit {

    @Input() value: boolean = false;
    @Output() valueChange = new EventEmitter<boolean>();
    @Output() onClick = new EventEmitter<PointerEvent>();
    @Input() disabled: boolean = false;

    @Input() control: FormControl<boolean | null>;

    constructor(private _elementRef: ElementRef) { }

    onChange(event: Event) {
        this.valueChange.emit((event.target as HTMLInputElement).checked);
    }

    ngAfterViewInit(): void {
        this._elementRef.nativeElement.classList.add('climbing-app-checkbox');
    }


    @HostListener('click', ['$event'])
    handleClick(event: PointerEvent) {
        this.onClick.emit(event)
    }

    changeValue() {
        if (this.control) {
            this.control.setValue(!this.control.getRawValue());
        } else {
            this.valueChange.emit(!this.value);
        }
    }
}