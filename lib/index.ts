import { User }  from './session/User';
import { UnauthorizedError }  from './error/UnauthorizedError';
import { NetworkError }  from './error/NetworkError';

export default {
  Session: {
    User,
  },
  Error: {
    UnauthorizedError,
    NetworkError,
  },
};


// TODO remove
if(typeof(window) !== "undefined") {
  window['RadioKitToolkitAuth'] = {
    Session: {
      User,
    },
    Error: {
      UnauthorizedError,
      NetworkError,
    },
  };
}
