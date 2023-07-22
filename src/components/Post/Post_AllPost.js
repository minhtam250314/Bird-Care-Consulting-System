import React, { Component } from 'react'
import callerApi from '../../utils/APICaller';
import Post from './Post';
export class Post_AllPost extends Component {
  constructor(props){
    super(props);
    this.state = {
        Posts: []
    };
}

componentDidMount(){
    callerApi("Post/GetAllPost/FilterByDate?filter=newest", "GET", null).then(res => {
        this.setState({
            Posts: res.data
        });
    });
};

render() {
    var {Posts} = this.state;
    console.log(Posts);
    return (
        <div>
            <Post Posts={Posts}/>
        </div>
    )
}
}
export default Post_AllPost;