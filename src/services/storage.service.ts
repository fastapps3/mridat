import { Injectable } from '@angular/core';

import {Storage} from "@ionic/storage";

@Injectable()
export class StorageService {

    constructor(private _storage:Storage) {
    }

    setItem(key: string, value: any): void  {
        this._storage.set(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        this._storage.remove(key);
    }

    getItem(key: string): any {
        var item: any = this._storage.get(key);

        if (item && item !== 'undefined') {
            return JSON.parse(item);
        }
        return;
    }
}