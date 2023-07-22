import React, { Component } from 'react'
import callerApi from '../../utils/APICaller';
import ServicePreview from './ServicePreview';
export class Homepage_Service extends Component {
  constructor(props){
    super(props);
    this.state = {
        Services: []
    };
}

componentDidMount(){
    callerApi("Service/GetAllServices", "GET", null).then(res => {
        this.setState({
            Services: res.data
        });
    });
};

render() {
    var {Services} = this.state;
    return (
        <div>
            <ServicePreview Services={Services}/>
        </div>
    )
}
}
export default Homepage_Service;