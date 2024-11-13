import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"; 

@Component({
selector:'home-page',
templateUrl:'home-page.component.html',
styleUrls:['home-page.component.scss'],
encapsulation: ViewEncapsulation.None,
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

 constructor () { }
}