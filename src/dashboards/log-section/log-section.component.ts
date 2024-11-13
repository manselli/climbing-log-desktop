import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'log-section',
    templateUrl: 'log-section.component.html',
    styleUrls: ['log-section.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogSectionComponent {

    constructor() { }
}