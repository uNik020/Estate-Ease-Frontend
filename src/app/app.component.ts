import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Estate-Ease';
  isLoading = true;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.openSpinner();

      // Example sessionStorage usage
      const saved = sessionStorage.getItem('someKey');
      console.log('Saved value:', saved);
    }
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    setTimeout(() => {
      const cursor = document.querySelectorAll<HTMLElement>(".cursor");
      const links = document.querySelectorAll<HTMLElement>(".link, .user-name, .hero-section h1, .project-name");

      if (cursor.length === 0 || links.length === 0) return;

      window.addEventListener("mousemove", (e: MouseEvent) => {
        const x = e.pageX;
        const y = e.pageY;

        cursor.forEach(el => {
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        });
      });

      links.forEach(link => {
        link.addEventListener("mouseenter", () => {
          cursor.forEach(el => el.classList.add("hover"));
        });
        link.addEventListener("mouseleave", () => {
          cursor.forEach(el => el.classList.remove("hover"));
        });
      });
    }, 0);
  }

  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }
}
