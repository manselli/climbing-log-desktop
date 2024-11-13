import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'crag-log',
    templateUrl: 'crag-log.component.html',
    styleUrls: ['crag-log.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CragLogComponent {



    showAddActivityPanel$ = new BehaviorSubject<boolean>(true);

    constructor() { }

    changeShowAddActivityPanel(ev: boolean) {
        this.showAddActivityPanel$.next(ev);
    }
}