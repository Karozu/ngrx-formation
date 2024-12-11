import { Component, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from 'src/app/models/user.model';
import { SignalStore } from 'src/app/store/signal/signal.store';

@Component({
  selector: 'app-user-signal',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-signal.component.html',
  styleUrl: './user-signal.component.scss',
})
export class UserSignalComponent {
  public readonly signalStore = inject(SignalStore);
  public loadingUser: Signal<boolean>;
  public user: Signal<User>;

  constructor() {
    this.loadingUser = this.signalStore.loading;
    this.user = this.signalStore.user;
  }

  loadUser(): void {
    this.signalStore.getUserData(0);
  }

  reset(): void {
    this.signalStore.reset();
  }
}
