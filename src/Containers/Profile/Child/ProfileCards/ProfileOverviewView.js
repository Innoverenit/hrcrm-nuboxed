import React, { Component,lazy } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
import { handleMapModal } from "../../ProfileAction";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { base_url } from "../../../../Config/Auth";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import FormikPlacesAutoComplete from "../../../../Components/Forms/Formik/FormikPlacesAutoComplete";
import { StyledModal } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Title,
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import {  Leaflet } from "../../../../Components/Utils";
import { AddressComponent } from "../../../../Components/Common";
import L from "leaflet";
const MapPopupMarker = lazy(() => import("./MapPopupMarker"))

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class ProfileOverviewView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapModalVisible: false,
      addAddressVisible: false,
    };
  }
  handleMapModalVisible = () =>
    this.setState({ mapModalVisible: !this.state.mapModalVisible });
  handleAddAddressVisible = () =>
    this.setState({ addAddressVisible: !this.state.addAddressVisible });

  addAddress = (address) => {
    axios
      .post(`${base_url}/address`, address, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    const {
      user: { address },
      toggleViewType,
      user,
    } = this.props;
    const { addAddressVisible } = this.state;
    // console.clear()
    console.log(this.props.user);
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>",

      ">>>>>>>>>>>>>>>>>>>>>>>>>>",
      user.address
    );
    const markers = [];

    address &&
      address.forEach((l) => {
        if (l.latitude && l.longitude) {
          console.log("inside IFF", l);
          markers.push({
            lat: Number(l.latitude),
            lng: Number(l.longitude),
            name: user.firstName,
            type: l.addressType,
            data: this.props.user,
          });
        }
      });
    const centerPosition = [];
    address &&
      address.forEach((l) => {
        if (l.latitude && l.longitude) {
          if (l.addressType === "Headquarters") {
            centerPosition.push(Number(l.latitude));
            centerPosition.push(Number(l.longitude));
            return;
          } else {
            centerPosition.push(Number(l.latitude));
            centerPosition.push(Number(l.longitude));
            return;
          }
        }
      });
    return (
      <>
        <div class=" flex justify-between" >
        <div class=" flex justify-start w-[85%] flex-no-wrap" >
            <div class=" w-[20%]" >
              <MultiAvatar
              // style={{width:"5rem"}}
                primaryTitle={user.fullName}
                imageId={user.imageId}
                imageURL={user.imageURL}
              />
            </div>
         
            <div class=" flex flex-col w-[80%] ml-4 " >
           
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >{`${user.fullName || ""} `}</Title>
            </div>
          </div>
          <div class=" flex justify-end w-[15%]" >
          
            <VisibilityIcon className=" !text-icon  ml-4"
              tooltipTitle="Edit"
              iconType="edit"
              onClick={toggleViewType}
             />
          </div>
        </div>

        <StyledModal
          title={`${user.fullName || ""} `}
          width="65%"
          visible={this.state.mapModalVisible}
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={this.handleMapModalVisible}
          footer={null}
        >
          <>
            <div class=" flex">
              {!address ? (
                <>
                 
                  {addAddressVisible && (
                    <AddressField
                      userId={user.userId}
                      addAddress={this.addAddress}
                      handleAddAddressVisible={this.handleAddAddressVisible}
                    />
                  )}
                </>
              ) : null}
              <div class=" flex justify-between items-start flex-no-wrap"
              >
                <div>
                  <div classname="flex flex-col w-[11rem] h-[40%] px-2 py-5 bg-[f5f5f5] justify-left items-left mb-2 mt-2">
                    {address &&
                      address.map((components, i) => (
                        <AddressComponent
                          key={i}
                          editable
                          editAddressType="user"
                          userId={user.userId}
                          components={components}
                        />
                      ))}
                  </div>
                  {/* <OpenTripPlanner
                    address={address && address.length && address[0]}
                    userAddress={userAddress[0]}
                  /> */}
                </div>
                <div class="vl"></div>
                <div class=" flex self-end">
                  {markers && (
                    <Leaflet
                      height={400}
                      width={500}
                      margin={5}
                      zoom={9}
                      MyPopupMarker={MapPopupMarker}
                      centerPosition={
                        centerPosition && centerPosition.length
                          ? centerPosition
                          : [
                            Number(51.92301029999999),
                            Number(4.470038700000032),
                          ]
                      }
                      // centerPosition={[Number(51.92301029999999), Number(4.470038700000032)]}
                      markers={markers}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        </StyledModal>
      </>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  addMapModal: profile.addMapModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleMapModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileOverviewView);

class AddressField extends Component {
  render() {
    const { userId, addAddress, handleAddAddressVisible } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            address: {
              address1: "",
              address2: "",
              street: "",
              town: "",
              city: "",
              state: "",
              country: "",
              postalCode: "",
              latitude: "",
              longitude: "",
            },
          }}
          onSubmit={(values) => {
            console.log(values);
            const newAddress = {
              ...values.address,

              userId: userId,
            };
            console.log(newAddress);
            addAddress(newAddress);
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
              <Form className="form-background">
                <Field
                  name={`address`}
                  label="Work place"
                  component={FormikPlacesAutoComplete}
                  options={{}}
                />
                <Field
                  label="Address1"
                  name="address.address1"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  label="address2"
                  name="address.address2"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  label="street"
                  name="address.street"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  label="town"
                  name="address.town"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  label="city"
                  name="address.city"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  label="state"
                  name="address.state"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  label="country"
                  name="address.country"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  label="postalCode"
                  name="address.postalCode"
                  component={InputComponent}
                // defaultValue='low'
                />

                <Button type="primary" htmlType="submit">
                  Save
                 
              </Button>
                <Button type="default" onClick={handleAddAddressVisible}>
                  Cancel
                
              </Button>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
