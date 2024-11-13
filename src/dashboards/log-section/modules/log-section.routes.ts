import { Routes } from "@angular/router";
import { LogSectionComponent } from "../log-section.component";


export const LOG_ROUTES: Routes = [
    {
        path: '',
        component: LogSectionComponent
    },
    {
        path: 'crag',
        loadChildren: () => import('./../crag-log/crag-log.module').then(m => m.CragLogModule)
    },
    {
        path: 'boulder',
        loadChildren: () => import('./../boulder-log/boulder-log.module').then(m => m.BoulderLogModule)
    },
    {
        path: 'training',
        loadChildren: () => import('./../training-log/training-log.module').then(m => m.TrainingLogModule)
    }
]