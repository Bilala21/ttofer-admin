import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (router, state) => {
    const _router = inject(Router)
    let isLoggedIn = localStorage.getItem("authToken")
    if (isLoggedIn == "false" || !isLoggedIn) {
        _router.navigate(["/"])
        return false
    }
    return true
}