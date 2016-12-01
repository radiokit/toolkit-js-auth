import { User }  from './session/User';

export const RadioKitToolkitAuth = {
  Session: {
    User,
  },
};


// TODO remove
if(typeof(window) !== "undefined") {
  window['RadioKitToolkitAuth'] = {
    Session: {
      User,
    }
  };
}
