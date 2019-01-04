import React, { Component } from 'react';
import Header from './components/Title'
import Page from './components/page/Page'
import Card from './components/card/Card'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  state={
    loadCard: false
  }



  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Header />
          <Page />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
