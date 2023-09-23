import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseAuthModule } from '../fbauth/fbauth.module';
import { FirebaseAuthInterceptor } from '../fbauth/firebase-auth.interceptor';
import { LoadingInterceptor } from '../shared/loading/loading-interceptor';
import { LoadingService } from '../shared/loading/loading.service';
import { demoRoutes } from './demo.routes';

@NgModule({
    imports: [
        RouterModule.forChild(demoRoutes),
        FirebaseAuthModule,
    ],
    providers: [
        LoadingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FirebaseAuthInterceptor,
            multi: true,
        },
    ],
})
export class DemosModule { }
