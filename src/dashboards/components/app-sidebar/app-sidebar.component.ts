import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    templateUrl: 'app-sidebar.component.html',
    styleUrls: [
        'app-sidebar.component.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebar {

}