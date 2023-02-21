import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDocumentationIconModule } from '@aposin/ng-aquila/documentation-icons';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxOverlayModule } from '@aposin/ng-aquila/overlay';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { ArtworksComponent } from './pages/artworks/artworks.component';
import { HideMissingImageDirective } from './directives/hide-missing-image.directive';
import {NxPaginationModule} from "@aposin/ng-aquila/pagination";
import {NxSpinnerModule} from "@aposin/ng-aquila/spinner";
import {HttpRequestInterceptor} from "./interceptors/HttpRequestInterceptor";
import { LoadingComponent } from './shared_components/loading/loading.component';
import { PhotoFrameComponent } from './pages/artworks/photo-frame/photo-frame.component';
import {NxCardModule} from "@aposin/ng-aquila/card";
import {NxCopytextModule} from "@aposin/ng-aquila/copytext";

@NgModule({
  declarations: [AppComponent, ArtworksComponent, HideMissingImageDirective, HideMissingImageDirective, LoadingComponent, PhotoFrameComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    NxButtonModule,
    NxCheckboxModule,
    NxDocumentationIconModule,
    NxDropdownModule,
    NxFooterModule,
    NxFormfieldModule,
    NxGridModule,
    NxHeadlineModule,
    NxIconModule,
    NxInputModule,
    NxLinkModule,
    NxMessageModule,
    NxModalModule,
    NxOverlayModule,
    NxPopoverModule,
    NxPaginationModule,
    NxSpinnerModule,
    NxCardModule,
    NxCopytextModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
    bootstrap: [AppComponent],
})
export class AppModule {}

/** Copyright Allianz 2023 */
