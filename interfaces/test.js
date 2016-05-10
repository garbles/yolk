/* @flow */

declare type Assert = {
  ok (a: any): void;
  notOk (a: any): void;
  equal (a: any, b: any): void;
  notEqual (a: any, b: any): void;
  deepEqual (a: any, b: any): void;
}

declare function describe (description: string, fn: Function): void
declare function it (description: string, fn: ?Function): void
declare function beforeEach (): void
declare function afterEach (): void
declare var assert: Assert
