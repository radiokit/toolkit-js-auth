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

      xhr.open('GET', url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.timeout = 15000;  // ms

      xhr.onerror = function(e) {
        reject(new Error(`Unable to authenticate: Network error (${xhr.status})`));
      }

      xhr.onabort = function(e) {
        reject(new Error(`Unable to authenticate: Aborted`));
      }

      xhr.ontimeout = function(e) {
        reject(new Error(`Unable to authenticate: Timeout`));
      }

      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            const responseAsJson = JSON.parse(xhr.responseText);
            if(responseAsJson["data"].length === 1) {
              const session = new User(responseAsJson["data"]["access_token"], responseAsJson["data"]["user"]);
              resolve(session);
            } else {
              reject(new Error(`Unable to authenticate: Record not found`));
            }

          } else if(xhr.status === 401) {
            reject(new Error(`Unable to authenticate: Unauthorized`));

          } else {
            reject(new Error(`Unable to authenticate: Unexpected response (status = ${xhr.status})`));
          }
        }
      };

      xhr.send();
    });

    return promise;
  }
}
