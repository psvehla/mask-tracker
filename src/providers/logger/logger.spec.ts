import { LoggerProvider } from './logger';

let loggerProvider = null;

describe('Logger Service', () => {

  beforeEach(() => {
    loggerProvider = new LoggerProvider();
  });

  it('should be disabled by default', () => {
    expect(loggerProvider.isLoggingEnabled()).toBeFalsy();
  });

  it("shouldn't collect messages when disabled", () => {
    loggerProvider.log('test message');
    expect(loggerProvider.messages.length).toEqual(0);
  });

  it('can be enabled', () => {
    loggerProvider.enableLogging();
    expect(loggerProvider.isLoggingEnabled()).toBeTruthy();
  });

  it("collects messages when enabled", () => {
    loggerProvider.enableLogging();
    loggerProvider.log('test message 1');
    loggerProvider.log('test message 2');
    loggerProvider.log('test message 3');
    expect(loggerProvider.messages.length).toEqual(3);
  });
});
