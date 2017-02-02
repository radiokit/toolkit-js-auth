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

  private static getCredentialsFromLocalStorage() : User {
    if (typeof(Storage) !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user"));
      if (accessToken !== null && user !== null) {
        const session = new User(accessToken, user);
        return session;
      }
    }
    return null;
  }

  private static saveCredentialsToLocalStorage(user: User) {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("accessToken", user.__accessToken);
      localStorage.setItem("user", JSON.stringify(user.__user));
    }
  }

  public static authenticateAsync(email: string, password: string, options: Object, storeCredentials = false) : Promise<User> {
    const promise = new Promise<User>((resolve: any, reject: any) => {
      if (storeCredentials) {
        const session = User.getCredentialsFromLocalStorage();
        if (session !== null) {
          return resolve(session);
        }
      }

      const xhr = new XMLHttpRequest();

      let url;
      if(options.hasOwnProperty('baseUrl')) {
        url = `${options['baseUrl']}/api/auth/v1.0/session/user`;
      } else {
        url = 'https://jungle.radiokitapp.org/api/auth/v1.0/session/user';
      }

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
              if (storeCredentials) {
                User.saveCredentialsToLocalStorage(session);
              }
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
