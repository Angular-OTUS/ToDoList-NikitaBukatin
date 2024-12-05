import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'TasksBoard';
  public locales = [
    { locale: 'en', title: 'English', url: 'http://localhost:4201' },
    { locale: 'ru', title: 'Русский', url: 'http://localhost:4200' },
  ]

  public switchLocale(locale: string): void {
    window.location.href = locale;
  }
}
