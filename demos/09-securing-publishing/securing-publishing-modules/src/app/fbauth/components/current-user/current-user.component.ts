import { Component, inject } from '@angular/core';
import { FirebaseAuthService } from '../../firebase-auth.service';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-current-user',
    templateUrl: './current-user.component.html',
    styleUrls: ['./current-user.component.scss'],
    standalone: true,
    imports: [NgIf, AsyncPipe],
})
export class CurrentUserComponent {
  as = inject(FirebaseAuthService);
  currentUser = this.as.getUser();
}
