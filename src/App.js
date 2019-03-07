import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Posts from './components/Posts';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <div className="App">
            <Header />
            <section className="App-main">
              <Posts />
            </section>
          </div>
        </ApolloProvider>

        
    );
    // return (
    //   <div>
    //     <Header />
    //     <div>
    //       <Post nickname="Shivam Sharma" avatar="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png" caption="Hot Technology" image="https://cnb.cx/2ENkw2k" />
    //       <Post nickname="Deepak" avatar="https://bit.ly/2HfU2bw" caption="Pro Gamer" image="https://bit.ly/2VESGLz" />
    //     </div>
    //   </div>
    // );
  }
}
export default App;
