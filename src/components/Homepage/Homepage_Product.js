import React, { Component } from 'react'
import callerApi from '../../utils/APICaller';
import ProductPreview from './ProductPreview';
export class Homepage_Product extends Component {
  constructor(props){
    super(props);
    this.state = {
        Products: []
    };
}

componentDidMount(){
    callerApi("Product/GetAllProduct/Filter?filterPrice=nothing&filterCategory=nothing", "GET", null).then(res => {
        this.setState({
            Products: res.data
        });
    });
};

render() {
    var {Products} = this.state;
    return (
        <div>
            <ProductPreview Products={Products}/>
        </div>
    )
}
}
export default Homepage_Product;