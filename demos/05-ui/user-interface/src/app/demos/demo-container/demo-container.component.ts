import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../shared/loading/loading.service';
import { DemoService } from '../demo-base/demo.service';
import { SidePanelService } from 'src/app/shared/side-panel/sidepanel.service';
import { SidebarActions } from 'src/app/shared/side-panel/sidebar.actions';
import { SideNavService } from '../../shared/sidenav/sidenav.service';
import { SidePanelComponent } from '../../shared/side-panel/side-panel.component';
import { MarkdownEditorComponent } from '../../shared/markdown-editor/markdown-editor.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { NgFor, NgStyle, NgIf, AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-demo-container',
    templateUrl: './demo-container.component.html',
    styleUrls: ['./demo-container.component.scss'],
    standalone: true,
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        NgFor,
        RouterLink,
        NgStyle,
        NgIf,
        LoadingComponent,
        RouterOutlet,
        MarkdownEditorComponent,
        SidePanelComponent,
        AsyncPipe,
    ],
})
export class DemoContainerComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  ds = inject(DemoService);
  nav = inject(SideNavService);
  ls = inject(LoadingService);
  eb = inject(SidePanelService);

  destroy$ = new Subject();
  title: string = environment.title;
  header = 'Please select a demo';
  demos = this.ds.getItems();

  isLoading = false;

  sidenavMode = this.nav.getSideNavPosition();
  sidenavVisible = this.nav.getSideNavVisible();
  workbenchMargin = this.sidenavVisible.pipe(
    map((visible: boolean) => { return visible ? { 'margin-left': '5px' } : {} })
  );

  showMdEditor = this.eb
    .getCommands()
    .pipe(
      map((action: SidebarActions) => (action === SidebarActions.HIDE_MARKDOWN ? false : true))
    );

  constructor() {
    this.ls.getLoading().pipe(takeUntil(this.destroy$)).subscribe((value) => {
      Promise.resolve(null).then(() => (this.isLoading = value));
    });
  }


  ngOnInit() {
    this.setComponentMetadata();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  setComponentMetadata() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.rootRoute(this.route)),
        filter((route: ActivatedRoute) => route.outlet === 'primary')
      )
      .subscribe((route: ActivatedRoute) => {
        this.header =
          route.component != null
            ? `Component: ${route.component.name
              .substring(1)}`
            : '';
      });
  }
}
