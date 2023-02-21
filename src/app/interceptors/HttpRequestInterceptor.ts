import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import {LoadingService} from "../services/loading.service";

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => this.loadingService.hide()),
    );
  }
}
