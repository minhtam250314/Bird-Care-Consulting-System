import React, { Component } from 'react'
import BookingOrder from './BookingOrder';
import callerApi from '../../utils/APICaller_Account';
export class Main_Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Bookings: []
        };
    }

    componentDidMount() {
        callerApi("Booking/GetBookingByUserId", "GET", null).then(res => {
            this.setState({
                Bookings: res.data
            });
        });
    };

    render() {
        var { Bookings } = this.state;
        return (
            <div>
                <BookingOrder Bookings={Bookings} />
            </div>
        )
    }
}
export default Main_Booking;