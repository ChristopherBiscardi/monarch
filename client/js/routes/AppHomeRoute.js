import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    root: () => Relay.QL`
      query {
       root
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
