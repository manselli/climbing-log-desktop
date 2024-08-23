
import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
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

    isMobileView$ = new BehaviorSubject<boolean>(false);

    constructor(
        private _backendService: BackendService,
    ) { }
    ngOnInit(): void {
        this.isMobileView$.next(window.innerWidth < 992);
        this._backendService.get(`users/me`).pipe(
            tap(response => {
                console.log(response)
            }),
            take(1),
        ).subscribe();
    }

    @HostListener('window:resize', ['$event'])
    sizeChange(event: Event) {
        this.isMobileView$.next(window.innerWidth < 992);
    }

}