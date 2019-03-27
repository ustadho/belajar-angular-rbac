import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import * as  _ from 'lodash';
import { Injectable } from '@angular/core';
import { map, first, tap } from 'rxjs/operators';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.user$
      .pipe(
          map(user => _.intersection(this.allowedRoles, user.roles).length > 0),
          first()
      )
      .pipe(tap(allowed => {
          if (!allowed) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }

  constructor(private allowedRoles: string[],
    private authService: AuthService, private router: Router) {

  }


}
