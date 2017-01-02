import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class CurrentUserService {

    constructor(private _storageService: StorageService) {

    }

    public get token(): string {
        let token = this._storageService.getItem('auth');

        return token;
    }

    public set token(token: string) {
        this._storageService.setItem('auth', token);
    }

    public get getLoggedInUser(): any {
        return this._storageService.getItem('udata');
    }

    public set setLoggedInUser(data: any) {
        this._storageService.setItem('udata', data);
    }
}