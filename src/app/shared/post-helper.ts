import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class PostHelper {

  constructor(private sanitizer: DomSanitizer) {
  }

  saveUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
