import React, { Component } from 'react'
import callerApi from '../../utils/APICaller';
import NewestPost from './NewestPost';
export class Homepage_Post extends Component {
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
    return (
        <div>
            <NewestPost Posts={Posts}/>
        </div>
    )
}
}
export default Homepage_Post;