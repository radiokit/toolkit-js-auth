import { UnauthorizedError } from '../error/UnauthorizedError';
import { NetworkError } from '../error/NetworkError';


export class User {
  private __accessToken: string;
  private __user: Object;


  constructor(accessToken: string, user: Object) {
    this.__accessToken = accessToken;
    this.__user = user;
  }


  public getAccessToken() : string {
    return this.__accessToken;
  }


  public getUser() : Object {
    return this.__user;
  }


  public static authenticateAsync(email: string, password: string) : Promise<User> {
    const promise = new Promise<User>((resolve: any, reject: any) => {
      const xhr = new XMLHttpRequest();

      const url = 'https://jungle.radiokitapp.org/api/auth/v1.0/session/user';

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.timeout = 15000;  // ms

      xhr.onerror = function(e) {
        reject(new NetworkError(`Network error (${xhr.status})`));
      }

      xhr.onabort = function(e) {
        reject(new NetworkError(`Aborted`));
      }

      xhr.ontimeout = function(e) {
        reject(new NetworkError(`Timeout`));
      }

      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 201) {
            const responseAsJson = JSON.parse(xhr.responseText);
            if(responseAsJson["data"]) {
              const session = new User(responseAsJson["data"]["access_token"], responseAsJson["data"]["client_user"]);
              resolve(session);
            } else {
              reject(new NetworkError(`Invalid API response: Record not found`));
            }

          } else if(xhr.status === 401) {
            reject(new UnauthorizedError(`Unauthorized`));

          } else {
            reject(new NetworkError(`Unexpected response (status = ${xhr.status})`));
          }
        }
      };

      xhr.send(JSON.stringify({email, password}));
    });

    return promise;
  }
}
