import { Injectable } from '@angular/core';

/**
 * This is a crude custom logger that logs to the page.
 * I added this when resolving a native issue that I could only debug on an actual device. Device emulation had failed, and the device debugger wouldn't work with my phone.
 * I'm not proud of what I did, but it was effective.
 */
@Injectable()
export class LoggerProvider {

  /**
   * Whether or not screen logging has been enabled.
   */
  private loggingEnabled: boolean = false;

  /**
   * The log.
   */
  messages: string[] = [];

  constructor() {
  }

  /**
   * Adds a message to the log.
   *
   * @param {string} message The message to add to the log.
   */
  log(message: string): void {
    console.debug(message);
    
    if (this.loggingEnabled) {
      this.messages.push(message);
    }
  }

  /**
   * Reports whether or not logging is enabled.
   *
   * @return {boolean} Whether or not logging is enabled.
   */
  isLoggingEnabled(): boolean {
    return this.loggingEnabled;
  }

  /**
   * Enables screen logging.
   */
  enableLogging(): void {
    this.loggingEnabled = true;
  }
}
