import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {

  EyeInvisibleOutlined,
  LeftCircleTwoTone,
  RightCircleTwoTone,
} from '@ant-design/icons';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import {  Carousel, Tooltip } from "antd";
import { StyledModal } from "../../../../Components/UI/Antd";
import { MainWrapper} from "../../../../Components/UI/Layout";
import { Leaflet, OpenTripPlanner } from "../../../../Components/Utils";
import MapPopupmarker from "./MapPopupMarker";
import { AddressComponent } from "../../../../Components/Common";
import { CarouselIcon } from "../../../../Components/UI/Elements";
class ProfileDetailMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapModalVisible: false,
    };
    this.carousel = React.createRef();
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }
  handleMapModalVisible = () =>
    this.setState({ mapModalVisible: !this.state.mapModalVisible });

  render() {
    const {
      user: { userId, accountName, address },
      user,
      userAddress,
    } = this.props;

    console.log(address);
    console.log(userAddress);
    // console.log(userAddressName);
    const position = [];
    if (address.length) {
      //debugger;
      position.push({
        lat: Number(address[0].latitude),
        lng: Number(address[0].longitude),
        name: "slack",
      });
    }
  
    const markers = [];

    address &&
      address.forEach((l) => {
        if (l.latitude && l.longitude) {
          //debugger;
          console.log("inside IFF", l);
          markers.push({
            lat: Number(l.latitude),
            lng: Number(l.longitude),
            name: accountName,
            type: l.addressType,
            data: this.props.account,
          });
        }
      });
    const centerPosition = [];
    address &&
      address.forEach((l) => {
        if (l.latitude && l.longitude) {
          //debugger;
          if (l.addressType === "Headquarters") {
            centerPosition.push([Number(l.latitude), Number(l.longitude)]);
            // centerPosition.push([Number(l.longitude), Number(l.longitude)]);
            return;
          } else {
            centerPosition.push([Number(l.latitude), Number(l.longitude)]);
            // centerPosition.push([Number(l.longitude), Number(l.longitude)]);
            return;
          }
        }
      });
    console.log(centerPosition);
    const newCenterPosition = GetCenterFromDegrees(centerPosition);
    console.log(newCenterPosition);

    const props = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <>
        <MainWrapper style={{ padding: 0, position: "relative" }}>
          <Tooltip title="View and update customer addresses">
            <AddLocationAltIcon
              type="environment"
              onClick={this.handleMapModalVisible}
              style={{
                position: "absolute",
                padding: 6,
                borderRadius: 5,
                bottom: 70,
                fontSize: 18,
                right: 15,
                zIndex: 402,
                backgroundColor: "#fff",
                cursor: "pointer",
                border: "0.125em solid #aaa",
              }}
            />
          </Tooltip>
          {markers && (
            <Leaflet
              height={180}
              width={"auto"}
              margin={5}
              zoom={9}
              MyPopupMarker={MapPopupmarker}
            
              centerPosition={[
                Number(51.92301029999999),
                Number(4.470038700000032),
              ]}
              markers={markers}
              userAddress={userAddress}
            />
          )}
        </MainWrapper>
        <StyledModal
          title={`${user.firstName || ""}`}
          width="65%"
          visible={this.state.mapModalVisible}
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={this.handleMapModalVisible}
          footer={null}
        >
          {/* <MapModal position={markers} /> */}
          <>
          <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
              <div>
              <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[220px] relative ">
                  <CarouselIcon
                    //type="left-circle"
                    icon={<LeftCircleTwoTone />}
                    onClick={this.previous}
                    theme="twoTone"
                    style={{ position: "absolute", left: -5, top: 40 }}
                  />
                  <CarouselIcon
                    //type="right-circle"
                    icon={<RightCircleTwoTone />}
                    onClick={this.next}
                    theme="twoTone"
                    style={{ position: "absolute", right: -66, top: 40 }}
                  />
                </div>
                <MainWrapper style={{ width: 220, marginLeft: 32 }}>
                  <Carousel ref={(node) => (this.carousel = node)} {...props}>
                    {address &&
                      [...address].map((components, i) => (
                        <div style={{ width: 100, border: "0.0625em solid blue" }}>
                          <AddressComponent
                            key={i}
                            editable
                            addAddress
                            editAddressType="account"
                            userId={userId}
                            components={components}
                          />
                        </div>
                      ))}
                  </Carousel>
                </MainWrapper>
                <br />
                <div style={{ marginLeft: "1.875em", width: "13.75em" }}>
                  <OpenTripPlanner
                    address={address && address.length && address[0]}
                    userAddress={userAddress[0]}
                  />
                </div>
              </div>
              <div className="vl"></div>
              <div
                style={
                  {
                    // alignSelf: "flex-end"
                  }
                }
              >
                {markers && (
                  <Leaflet
                    height={400}
                    width={530}
                    margin={5}
                    zoom={9}
                    MyPopupMarker={MapPopupmarker}
                  
                    centerPosition={[
                      Number(51.92301029999999),
                      Number(4.470038700000032),
                    ]}
                    markers={markers}
                    userAddress={userAddress}
                  />
                )}
              </div>
            </div>
          </>
        </StyledModal>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userAddress: auth.userDetails.address,
});
export default connect(mapStateToProps)(ProfileDetailMap);

class AddressCarousel extends React.Component {
  render() {
    const { address, accountId } = this.props;
    return (
      <>
        {address &&
          [...address].map((components, i) => (
            <AddressComponent
              key={i}
              addAddress
              addAddressType="employee"
              accountId={accountId}
              components={components}
            />
          ))}
      </>
    );
  }
}
function GetCenterFromDegrees(centerPosition) {
  if (!(centerPosition.length > 0)) {
    return false;
  }

  var num_coords = centerPosition.length;

  var X = 0.0;
  var Y = 0.0;
  var Z = 0.0;

  for (let i = 0; i < centerPosition.length; i++) {
    var lat = (centerPosition[i][0] * Math.PI) / 180;
    var lon = (centerPosition[i][1] * Math.PI) / 180;

    var a = Math.cos(lat) * Math.cos(lon);
    var b = Math.cos(lat) * Math.sin(lon);
    var c = Math.sin(lat);

    X += a;
    Y += b;
    Z += c;
  }

  X /= num_coords;
  Y /= num_coords;
  Z /= num_coords;

  var lon = Math.atan2(Y, X);
  var hyp = Math.sqrt(X * X + Y * Y);
  var lat = Math.atan2(Z, hyp);

  var newX = (lat * 180) / Math.PI;
  var newY = (lon * 180) / Math.PI;

  return [newX, newY];
}
