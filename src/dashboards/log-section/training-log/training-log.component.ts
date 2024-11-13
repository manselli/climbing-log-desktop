import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'training-log',
    templateUrl: 'training-log.component.html',
    styleUrls: ['training-log.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLogComponent {

    constructor() { }
}