import { Injectable } from '@angular/core';

/*
  Generated class for the LoggerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoggerProvider {

  messages: string[] = [];

  constructor() {
  }

  log(message: string): void {
    this.messages.push(message);
  }
}
