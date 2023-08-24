import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable ({
    'providedIn' : 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private router: Router
    ) {}

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        return true;
    }
}