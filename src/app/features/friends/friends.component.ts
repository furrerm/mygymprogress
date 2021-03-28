import {Component, OnInit} from '@angular/core';
import {UserListService} from './user-list.service';
import {UserDTO} from '../../core/model/swagger-model/userDTO';
import {ConstantsService} from '../../core/services/constants.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', '../../shared/shared.style.css']
})
export class FriendsComponent implements OnInit {

  private _allUsers: UserDTO[];
  private _followsIds: number[];

  constructor(
    private userService: UserListService,
    private constants: ConstantsService) {
  }

  ngOnInit(): void {
    this.fetchAllUsers();
    this._followsIds = this.constants.getUser.follows.map(a => a.id);
  }

  follow(follows: UserDTO): void {
    const followsId = follows.id;
    if (this._followsIds.includes(followsId)) {
      this._followsIds.splice(this._followsIds.indexOf(followsId), 1);
      this.constants.getUser.follows.splice(this.constants.getUser.follows.indexOf(follows), 1);
      this.userService.follow(followsId, this.constants.getUser.id, true).subscribe(a => console.log(a));
    } else {
      this._followsIds.push(followsId);
      this.constants.getUser.follows.push(follows);
      this.userService.follow(followsId, this.constants.getUser.id, false).subscribe(a => console.log(a));
    }
  }

  private fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this._allUsers = users.filter(a => a.id !== this.constants.getUser.id);
    });
  }

  get allUsers(): UserDTO[] {
    return this._allUsers;
  }

  get followsIds(): number[] {
    return this._followsIds;
  }
}
