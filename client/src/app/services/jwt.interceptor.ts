// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LocalstorageService } from './local-storage.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {

//   enviorement = 'http://localhost:3000/api/v1'

//   constructor(private localStorage: LocalstorageService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const token = this.localStorage.getToken();
//     const isAPIUrl = request.url.startsWith(this.enviorement);

//     if (token && isAPIUrl) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     return next.handle(request);
//   }
// }
