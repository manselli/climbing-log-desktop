
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
//import { UserSession['companyAccesses'] } from './store/dashboard.state';

@Component({
    selector: 'dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {

}