import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imagUrl,NewsUrl,date,source}=this.props;
    return (
      <div>
        <div className="card my-3" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:"91%"}}>{source}</span>
            <img src={imagUrl?imagUrl:"https://images.moneycontrol.com/static-mcnews/2024/03/stocks5-770x433.jpg"} className="card-img-top" alt="..." style={{height:"200px"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">Last updated {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={NewsUrl} target='_blank' className="btn btn-secondary btn-sn">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
