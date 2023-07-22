import React, {Component} from 'react';
import Banner from './Homepage/Banner';
import HomepageProduct from './Homepage/Homepage_Product';
import HomepageService from './Homepage/Homepage_Service';
import HomepagePost from './Homepage/Homepage_Post';
import { useAuth0 } from "@auth0/auth0-react";
class main extends Component {
    render() {
        return (
            <div style={{
                backgroundImage: "url('https://media.discordapp.net/attachments/1074987128984973365/1088273356249387068/back.png?width=1096&height=701')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}>
                <Banner/>
                <HomepageProduct />
                <HomepageService />
                <HomepagePost />
            </div>
        );
    }
}
export default main;