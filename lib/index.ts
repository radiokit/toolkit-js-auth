import { User }  from './session/User';

export default {
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
