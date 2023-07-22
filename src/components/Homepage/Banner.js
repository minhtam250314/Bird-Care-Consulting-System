import { Slider, Slide, Caption } from "react-materialize";
export default function Banner() {
    return (
        <div className="Main">
        <Slider >
          <Slide
            image={
              <img
                alt="opa"
                className="opa"
                src="https://cdn.discordapp.com/attachments/859296542762729475/1072864991209857167/Capture.PNG"
              />
            }
          >
            <Caption placement="center">
              <h3 style={{ color: "black", width: "400px" }}>Bird Care Consulting</h3>
              <h5 style={{ color: "black", width: "400px", height: "100px"  }}>
                Dịch vụ chăm sóc chim tại nhà, chuyên cung cấp thức ăn và thuốc cho chim.
              </h5>
            </Caption>

          </Slide>
          <Slide
            image={
              <img
                alt=""
                className="opa"
                src="https://media.discordapp.net/attachments/1074943174696513640/1076788960392659005/Banner2.png?width=1440&height=594"
              />
            }
          >
            <Caption placement="center">
              <h3 style={{ color: "black" }}>Các Sản Phẩm Cho Chim</h3>
              <h5 style={{ color: "black", width: "1000px", height: "100px", margin: "5px 5px 5px 5px"  }}>
                Chúng tôi cung cấp thức ăn và thuốc cho chim để giúp bạn chăm sóc chim của mình tốt hơn.
              </h5>
            </Caption>
          </Slide>
          <Slide
            image={
              <img
                alt=""
                className="opa"
                src="https://s7d2.scene7.com/is/image/PetSmart/ARHERO-ASetupGuideForNewParentsOfCockatiels-20160818?$AR0301$"
              />
            }
          >
            <Caption placement="center">
              <h3 style={{ color: "black" }}>Dịch Vụ Chăm Sóc Chất Lượng</h3>
              <h5 style={{ color: "black" }}>
                Chúng tôi có các chuyên gia chăm sóc chim để giúp chim của bạn luôn khỏe mạnh. Các dịch vụ của chúng tôi
                bao gồm:
                <div>-----</div>
                <div>Trị bệnh</div>
                <div>Làm đẹp cho chim</div>
                <div>Ngừa bệnh cho chim</div>
                <div>Khám sức khỏe định kì</div>
                <div>Khách sạn cho chim</div>
              </h5>
            </Caption>
          </Slide>
        </Slider>
      </div>
    )
}