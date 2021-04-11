import {Component, OnInit} from '@angular/core';
import {WelcomeComponent} from '../welcome/welcome.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ProfileService} from './profile.service';
import {UserDTO} from '../../core/model/swagger-model/userDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../shared/shared.style.css']
})
export class ProfileComponent implements OnInit {

  profile: UserDTO;
  settingsActive = false;

  constructor(
    private welcomeComponent: WelcomeComponent,
    private sanitizer: DomSanitizer,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.loadMyProfile();
  }

  logout(): void {
    console.log('logout');
    this.welcomeComponent.authService.SignOut(this.welcomeComponent.user);
  }

  loadMyProfile(): void {
    this.profileService.loadMyProfile().subscribe(profile => this.profile = profile);
  }

  trustThisUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
  activateSettings(activateSettings: boolean): void {
    this.settingsActive = activateSettings;
  }
}
