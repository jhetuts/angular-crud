import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})

export class SandboxComponent {
  users: any[];
  user = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };
  isEdit = false;

  constructor(public dataService: DataService) {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(isEdit) {
    if (isEdit) {
      this.dataService.updateUser(this.user).subscribe(user => {
        this.users = this.users.filter(u => u.id !== this.user.id);
        this.users.unshift(user);
        this.clearInputs();
      });
    } else {
      this.dataService.addUser(this.user).subscribe(user => {
        this.users.unshift(user);
        this.clearInputs();
      });
    }
    this.isEdit = !isEdit;
  }

  deleteClick(id) {
    this.dataService.deleteUser(id).subscribe(res => {
      this.users = this.users.filter(user => user.id !== id );
    });
  }

  editClick(user) {
    this.isEdit = true;
    this.user = user;
  }

  clearInputs() {
    this.user = '';
  }
}
