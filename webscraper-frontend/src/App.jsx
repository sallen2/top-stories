import React, { Component } from 'react';
import Header from './components/title/Title'
import Page from './components/page/Page'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.css'
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
        <div className="theFont">
          <Header />
          <Page />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
