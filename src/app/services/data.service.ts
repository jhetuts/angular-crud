import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class DataService {
  api = 'https://jsonplaceholder.typicode.com/users/';

  constructor(public http: HttpClient) {

  }

  getUsers() {
    return this.http.get(this.api).pipe(map(res => res));
  }

  addUser(user) {
    return this.http.post(this.api, user).pipe(map(res => res));
  }

  updateUser(user) {
    return this.http.put(this.api + user.id, user).pipe(map(res => res));
  }

  deleteUser(id) {
    return this.http.delete(this.api + id).pipe(map(res => res));
  }
}
