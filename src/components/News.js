import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    // let articles="visk";
    // page=1
      static defaultProps={
        PageSize:6,
        country:"in",
        category:"general"
      }
      static propTypes={
        PageSize:PropTypes.number,
        country:PropTypes.string,
        category:PropTypes.string
      }
      capitalize=(s)=>{
        return s[0].toUpperCase() + s.slice(1);
      }
      constructor(props){
        console.log(props);
        super(props);
        this.state={ 
            articles:[],
            loading:false,
            page:1,
            totalResults:0

        }
        document.title=`DailyNews - ${this.capitalize(this.props.category)}`;
      }
      async updateNews(){
        this.props.setProgress(0);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parseData=await data.json();
        this.setState({
          // page:this.state.page1,
          articles:parseData.articles,
          totalResults:parseData.totalResults,
          loading:false
        })
        this.props.setProgress(100);
      }
      fetchMoreData =async () => {
       
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        this.setState({page:this.state.page +1});
        let data= await fetch(url);
        let parseData=await data.json();
        this.setState({
          // page:this.state.page+1,
          articles:this.state.articles.concat(parseData.articles),
          totalResults:parseData.totalResults,
          loading:false
        })
      };
      async componentDidMount(){
        this.updateNews();
      }
      // handlePrev=async ()=>{
      //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page  - 1}&pageSize=${this.props.pageSize}`;
      //   this.setState({loading:true});
      //   let data= await fetch(url);
      //   let parseData=await data.json();
      //   // this.setState({
      //   //     articles:parseData.articles
      //   // });
      //   this.setState({
      //     page:this.state.page-1,
      //     articles:parseData.articles,
      //     loading:false
      //   })
      // }
      // handleNext=async ()=>{
      //   // if(this.state.page+1<Math.ceil(this.totalResults/20)){
      //   if(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){

      //   }else{
      //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page  + 1}&pageSize=${this.props.pageSize}`;
      //    this.setState({loading:true});
      //     let data= await fetch(url);
      //     let parseData=await data.json();
      //     // this.setState({
      //     //     articles:parseData.articles
      //     // });
      //     this.setState({
      //       page:this.state.page+1,
      //       articles:parseData.articles,
      //       loading:false
      //     })
      // }
      // }
  render() {
    return (
      <>
        <h1 className='text-center' style={{marginTop:"70px",marginBlockEnd:"20px"}}>DailyNews - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Loading/>}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length!==this.state.totalResults}
              loader={<Loading/>}
            >
            <div className="container">
            <div className="row">
            {/* !this.state.loading && */}
            { this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,75):""} imagUrl={element.urlToImage} NewsUrl={element.url} date={element.publishedAt} source={element.source.name}/>
                </div>
                })}
            </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between my-2">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark btn-lg" onClick={this.handlePrev}>&laquo; Previos</button>
              <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark btn-lg" onClick={this.handleNext}>Next &raquo;</button>
            </div> */}
            
        </>
    )
  }
}

export default News
