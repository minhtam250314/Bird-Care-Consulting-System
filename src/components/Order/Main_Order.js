import React, { Component } from 'react'
import Order from './Order';
import callerApi from '../../utils/APICaller_Account';
export class Main_Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Orders: []
        };
    }

    componentDidMount() {
        callerApi("Order/GetOrderByUserId", "GET", null).then(res => {
            this.setState({
                Orders: res.data
            });
        });
    };

    render() {
        var { Orders } = this.state;
        return (
            <div>
                <Order Orders={Orders} />
            </div>
        )
    }
}
export default Main_Order;