import { Parallax } from "react-materialize";
export default function About() {
  return (

    <div className="AboutPage">

      <div>

        <Parallax
          image={<img alt="" src="https://images.unsplash.com/photo-1550089479-fe0e48e7d788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1294&q=80" />}
          options={{
            responsiveThreshold: 0
          }}
        />
        <div className="section white">
          <div className="row container">
            <h2 className="header">
              Về chúng tôi
            </h2>
            <p className=" grey-text text-darken-3 lighten-3">
              Với sự yêu quý các loài chim, chúng tôi muốn lan toả điều này đến tất cả các bạn để cùng nhau tại thành một cộng đồng lớn mạnh. Chúng tôi thấy rằng đôi khi tình yêu dành cho loài chim là không đủ. Chúng tôi đã chứng kiến nhiều trường hợp do việc chăm sóc không đúng cách khiến những chú chim mắc nhiều bệnh cả về thể chất lẫn tinh thần.
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              Chúng tôi ở đây để giúp bạn, những công cụ, thuốc men lẫn các dịch vụ tốt nhất để tạo ra một môi trường phù hợp co sự phát triển của những chú chim của bạn.
            </p>
          </div>
        </div>
        <Parallax
          image={<img alt="" src="https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />}
          options={{
            responsiveThreshold: 0
          }}
        />


      </div>

      <div>
        <div class="AboutContainer">
          <div class="AboutContentContainer">
            <h3 class="AboutTitle">Hỗ trợ khách hàng</h3>
            <p class="AboutDescription">Quy Trình Làm Việc</p>
            <p class="AboutDescription">Bảo Hành - Đổi Trả</p>
            <p class="AboutDescription">Hình Thức Thanh Toán Thuận Lợi</p>
            <p class="AboutDescription">Vận Chuyển - Giao Nhận</p>
            <p class="AboutDescription">Chính Sách Bảo Mật Minh Bạch</p>

          </div>
          <img style={{ width: "400px", height: "400px" }} src="https://i.pinimg.com/564x/7c/a8/b7/7ca8b7f553a7213bf47a80f687ddf652.jpg" />
        </div>
      </div>

      <div class="AboutContainer">
        <div class="AboutContainer">
          <div class="AboutContentContainer">
            <h3 class="AboutTitle">Cam kết khách hàng</h3>
            <p class="AboutDescription">Với nhiều năm trong nghề, chúng tôi đem đến quý khách những dịch vụ, mặt hàng tốt nhất cho quý khách.</p>
            <p class="AboutDescription">Địa chỉ: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
            <p class="AboutDescription">Số Điện Thoại: 19001080</p>
          </div>
        </div>

        <div className="row">
          <div className="map-column">
            <div clasName="contact-map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010498175!2d106.80769431474951!3d10.84112759227762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1679758336490!5m2!1svi!2s"
                width="600" height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">

              </iframe>
            </div>
          </div>
        </div>


      </div>

    </div>

  );
}
