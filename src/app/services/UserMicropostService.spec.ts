import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  xit,
  iit,
} from 'angular2/testing';
import {
  Headers,
  ResponseOptions,
  Response,
  MockBackend,
  BaseResponseOptions,
  RequestMethods,
} from 'angular2/http';

import {APP_TEST_PROVIDERS} from "app/bindings";
import {UserMicropostService} from "app/services";

const dummyJson = {
  content: [
    {
      id: 1,
      content: 'content1',
      createdAt: 0,
      user: {
        id: 1,
        email: 'test1@test.com',
        name: 'test user1'
      },
    },
    {
      id: 2,
      content: 'content2',
      createdAt: 1234567,
      user: {
        id: 1,
        email: 'test1@test.com',
        name: 'test user1'
      },
    },
  ],
  totalPages: 1,
  totalElements: 2,
};

export function main() {
  describe('UserMicropostService', () => {

    var userMicropostService:UserMicropostService;
    var backend:MockBackend;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(inject([UserMicropostService, MockBackend], (..._) => {
      [userMicropostService, backend] = _;
    }));

    describe('.list', () => {
      it("can list user's posts", (done) => {
        backend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(dummyJson),
          })));
          expect(conn.request.method).toEqual(RequestMethods.Get);
          expect(conn.request.url).toEqual('/api/users/1/microposts?page=1&size=5');
        });
        userMicropostService.list('1').subscribe(res => {
          expect(res).toEqual(dummyJson);
          done();
        });
      });
    }); // .list

  });
}
