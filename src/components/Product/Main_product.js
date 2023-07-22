import React, { Component } from 'react'
import Product from './Product'
import callerApi from '../../utils/APICaller';
export class Main_product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: []
        };
    }

    componentDidMount() {
        callerApi("Product/GetAllProduct/Filter?filterPrice=nothing&filterCategory=nothing", "GET", null).then(res => {
            this.setState({
                Products: res.data
            });
        });
    };

    render() {
        var { Products } = this.state;
        return (
            <div>
                <Product Products={Products} />
            </div>
        )
    }
}
export default Main_product;