import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Swarm Services</h1>
        <ul>
          {this.props.root.services.map(service => {
            console.log(service);
          return <li key={service.id}>{service.Spec.Name} (Replicas: {service.Spec.Mode.Replicated.Replicas})</li>
          }
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    root: () => Relay.QL`
      fragment on Query {
services {
Version { Index }
Spec {
  Name
  Mode { Replicated { Replicas} }
 }
}
      }
    `,
  },
});
