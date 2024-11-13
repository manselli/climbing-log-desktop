import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'boulder-log',
    templateUrl: 'boulder-log.component.html',
    styleUrls: ['boulder-log.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoulderLogComponent {

    constructor() { }
}