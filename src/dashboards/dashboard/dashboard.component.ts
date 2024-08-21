
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { take, tap } from 'rxjs';
import { BackendService } from 'src/services/backend.service';
//import { UserSession['companyAccesses'] } from './store/dashboard.state';

@Component({
    selector: 'dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

    constructor(
        private _backendService: BackendService,
    ) { }
    ngOnInit(): void {
        this._backendService.get(`users/me`).pipe(
            tap(response => {
                console.log(response)
            }),
            take(1),
        ).subscribe();
    }

}