import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  iit,
} from 'angular2/testing';

import {TimeAgoPipe} from 'app/pipes';

export function main() {
  describe('TimeAgoPipe', () => {

    var pipe:TimeAgoPipe;

    beforeEach(() => {
      pipe = new TimeAgoPipe();
      jasmine.clock().mockDate(new Date(2014, 10, 4));
    });

    it('shows a text for time ago', () => {
      expect(pipe.transform(new Date(2014, 10, 3))).toEqual('1 day ago');
    });

  });
}
