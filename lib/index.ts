import { User }  from './session/User';

export const Session = {
  User,
};


// TODO remove
if(typeof(window) !== "undefined") {
  window['RadioKitToolkitAuth'] = {
    Client: {
      User,
    }
  };
}
