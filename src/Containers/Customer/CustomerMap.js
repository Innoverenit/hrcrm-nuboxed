import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { customerMapSelector } from "../Customer/CustomerSelector";
import { Marker, Popup } from "react-leaflet";
import { FlexContainer } from "../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
} from "../../Components/UI/Elements";
import Leaflet from "../../Components/Utils/Leaflet";
import L from "leaflet";
import {
    getCustomerListByUserId,
  } from "../Customer/CustomerAction";
import CustomerMapPopUpMarker from "../Customer/CustomerMapPopUpMarker";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class CustomerMap extends Component {
  componentDidMount() {
    ////debugger;
    const {
      user: { userId },
      getCustomerListByUserId,
    } = this.props;
    getCustomerListByUserId(userId);
  }
  render() {
    
    ////debugger;
    const {
        customerAdresses,
        customerByUserId,
      user: { address },
    } = this.props;
  //   const data=candidateByUserId.map((item)=>{
  //     return item.address
      
  //   })
  //   const data1=data.latitude
   
   
      
  //   console.log("ret",data);
  // console.log("ret1",data1);

  const lat =
  address && address.length &&address[0].latitude

const lng =
  address && address.length &&address[0].longitude

   // console.log(accountAdresses);
    //console.log("cand",candidateAdresses);

    console.log("lat1",lat);
    console.log("lat2",lng);
   
    // if (this.props.fetchingAccountMapOnDashboardByUserIdError) {
    //   return <APIFailed />;
    // }
    return (
      <>
        <Leaflet
           markers={customerAdresses}
           MyPopupMarker={CustomerMapPopUpMarker}
          zoom={lat && lng && 6}
          centerPosition={lat && lng && [lat, lng]}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, account,customer }) => ({
  user: auth.userDetails,
  customerByUserId: customer.customerByUserId,
//   candidateByUserId: candidate.candidateByUserId,
   customerAdresses: customerMapSelector(customer),
  //accountAdresses: accountMapSelector(account),
  //fetchingAccountMapOnDashboardByUserIdError: account.fetchingAccountMapOnDashboardByUserIdError
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        //getCandidateListByUserId,
        getCustomerListByUserId
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerMap);

const MyPopupMarker = ({ mark }) => {
  console.log(mark);
  const { accountName, imageId, imageURL, address } = mark && mark.data;
  const image = new L.Icon({
    iconUrl:
      imageId || imageURL || require("leaflet/dist/images/marker-icon.png"),
    // shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: mark.type === "Headquarters" ? [40, 40] : [25, 25], // size of the icon
    // shadowSize: [50, 50], // size of the shadow
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    // popupAnchor: [-3, -76]// point from which the popup should open relative to the iconAnchor
  });

  return (
    <Marker position={[mark.lat, mark.lng]} icon={image}>
      <Popup className="!w-[18rem]">
        <FlexContainer justifyContent="center" flexDirection="column">
          <FlexContainer flexWrap="nowrap" alignItems="center">
            <MultiAvatar
              primaryTitle={accountName || ""}
              imageId={imageId}
              imageURL={imageURL}
            />
            &nbsp;&nbsp;
            <Title overflow="hidden" textOverflow="ellipsis">
              {mark.name}
            </Title>
          </FlexContainer>
          {address &&
            address.map((components, i) => {
              ////debugger;
              if (
                Number(components.latitude) === mark.lat &&
                Number(components.longitude) === mark.lng
              ) {
                ////debugger;
                return 
                // <AddressComponent components={components} 
                // key={i} 
                // />;
              }
            })}
        </FlexContainer>
      </Popup>
    </Marker>
  );
};
