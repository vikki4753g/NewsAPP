import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  // name="Vikas";
  pageSize=9;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  apikey=process.env.REACT_APP_APIKEY;
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color='red'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
          {/* <News setProgress={this.setProgress} apikey={this.apikey} pageSize={2} country="in" category="general" /> */}
          <Routes>
           <Route path="/"element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/business"element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/entertainment"element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/health"element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/sports"element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route path="/technology" element={ <News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
        </Routes>
        </Router>
      </div>
    )
  }
}
