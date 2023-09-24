import { DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from '../../../environments/environment';

export const skillDataServiceConfig: DefaultDataServiceConfig = {
    root: `${environment.api}/`,
    timeout: 3000,
    entityHttpResourceUrls: {
        Food: {
            entityResourceUrl: `${environment.api}/food/`,
            collectionResourceUrl: `${environment.api}/food`
        },
    }
}