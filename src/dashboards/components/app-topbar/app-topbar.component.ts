import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-topbar',
    templateUrl: 'app-topbar.component.html',
    styleUrls: [
        'app-topbar.component.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTopbar {

    @Input() mainPageElement: HTMLElement;
    @Input() isMobileView: boolean;


    changeMainPageClasses() {
        if (this.isMobileView) {
            if (this.mainPageElement.classList.contains('layout-mobile-active')) {
                this.mainPageElement.classList.remove('layout-mobile-active')
            } else {
                this.mainPageElement.classList.add('layout-mobile-active')
            }
        } else {
            if (this.mainPageElement.classList.contains('layout-static-inactive')) {
                this.mainPageElement.classList.remove('layout-static-inactive')
            } else {
                this.mainPageElement.classList.add('layout-static-inactive')
            }
        }
    }

}