import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { partnerMapSelector } from "../Partner/PartnerSelector";
import { Marker, Popup } from "react-leaflet";
import { MultiAvatar, Title } from "../../Components/UI/Elements";
import { getPartnerListByUserId } from "./PartnerAction";
import Leaflet from "../../Components/Utils/Leaflet";
import L from "leaflet";
import PartnerMapPopUpMarker from "../Partner/PartnerMapPopUpMarker";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class PartnerMap extends Component {
  componentDidMount() {
    ////debugger;
    const {
      user: { userId },
      getPartnerListByUserId,
    } = this.props;
    getPartnerListByUserId(userId);
  }
  render() {
    ////debugger;
    const {
      partnerAdresses,
      partnerByUserId,
      user: { address },
    } = this.props;

    const lat = address && address.length && address[0].latitude;

    const lng = address && address.length && address[0].longitude;

    console.log("lat1", lat);
    console.log("lat2", lng);

    return (
      <>
        <Leaflet
          markers={partnerAdresses}
          MyPopupMarker={PartnerMapPopUpMarker}
          zoom={lat && lng && 6}
          centerPosition={lat && lng && [lat, lng]}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, account, partner }) => ({
  user: auth.userDetails,
  partnerByUserId: partner.partnerByUserId,
  partnerAdresses: partnerMapSelector(partner),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerListByUserId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PartnerMap);

const MyPopupMarker = ({ mark }) => {
  console.log(mark);
  const { accountName, imageId, imageURL, address } = mark && mark.data;
  const image = new L.Icon({
    iconUrl:
      imageId || imageURL || require("leaflet/dist/images/marker-icon.png"),
    iconSize: mark.type === "Headquarters" ? [40, 40] : [25, 25], // size of the icon
  });

  return (
    <Marker position={[mark.lat, mark.lng]} icon={image}>
      <Popup className="!w-[18rem]">
      <div class=" flex flex-col flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
            <MultiAvatar
              primaryTitle={accountName || ""}
              imageId={imageId}
              imageURL={imageURL}
            />
            &nbsp;&nbsp;
            <Title overflow="hidden" textOverflow="ellipsis">
              {mark.name}
            </Title>
          </div>
          {address &&
            address.map((components, i) => {
              if (
                Number(components.latitude) === mark.lat &&
                Number(components.longitude) === mark.lng
              ) {
                return;
              }
            })}
        </div>
      </Popup>
    </Marker>
  );
};
