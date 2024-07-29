import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
// import { handleMapModal } from "../../ProfileAction";

import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { FormattedMessage } from "react-intl";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import FormikPlacesAutoComplete from "../../../Components/Forms/Formik/FormikPlacesAutoComplete";
import { StyledModal } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Title,
    SubTitle,
    MultiAvatar,
} from "../../../Components/UI/Elements";
import { FlexContainer } from "../../../Components/UI/Layout";
// import { ActionIcon, Leaflet } from "../../../../Components/Utils";
import { AddressComponent } from "../../../Components/Common";
// import MapPopupMarker from "./MapPopupMarker";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class OverviewView extends Component {
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
            leaveFetching: { address },
            toggleViewType,
            leaveFetching,
        } = this.props;
        const { addAddressVisible } = this.state;
        // console.clear()
        console.log(this.props.leaveFetching);
        console.log(
            ">>>>>>>>>>>>>>>>>>>>>",

            ">>>>>>>>>>>>>>>>>>>>>>>>>>",
            leaveFetching.address
        );
        const markers = [];

        address &&
            address.forEach((l) => {
                if (l.latitude && l.longitude) {
                    console.log("inside IFF", l);
                    markers.push({
                        lat: Number(l.latitude),
                        lng: Number(l.longitude),
                        name: leaveFetching.employeeName,
                        type: l.addressType,
                        data: this.props.leaveFetching,
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
                <FlexContainer justifyContent="space-between">
                    <FlexContainer
                        justifyContent="flex-start"
                        flexWrap="nowrap"
                        style={{ width: "85%" }}
                    >
                        <div style={{ width: "20%" }}>
                            <MultiAvatar
                                primaryTitle={leaveFetching.employeeName}
                                imageId={leaveFetching.imageId}
                                imageURL={leaveFetching.imageURL}
                            />
                        </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <FlexContainer flexDirection="column" style={{ width: "80%" }}>
                            <Title
                                overflow="hidden"
                                textOverflow="ellipsis"
                                fontSize={"1.375em"}
                            >{`${leaveFetching.employeeName || ""}  ${leaveFetching.lastName || ""}`}</Title>
                        </FlexContainer>
                    </FlexContainer>
                    <FlexContainer style={{ width: "15%" }} justifyContent="flex-end">                   
                    </FlexContainer>
                </FlexContainer>

                <StyledModal
                    title={`${leaveFetching.employeeName || ""} ${leaveFetching.middleName ||
                        ""} ${leaveFetching.lastName || ""}`}
                    width="65%"
                    visible={this.state.mapModalVisible}
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onCancel={this.handleMapModalVisible}
                    footer={null}
                >
                    <>
                        <FlexContainer>
                            {!address ? (
                                <>                             
                                    {addAddressVisible && (
                                        <AddressField
                                            userId={leaveFetching.userId}
                                            addAddress={this.addAddress}
                                            handleAddAddressVisible={this.handleAddAddressVisible}
                                        />
                                    )}
                                </>
                            ) : null}
                            <FlexContainer
                                justifyContent="space-between"
                                alignItems="flex-start"
                                flexWrap="nowrap"
                            >
                                <div>
                                    <div className="product3" style={{ width: "180" }}>
                                        {address &&
                                            address.map((components, i) => (
                                                <AddressComponent
                                                    key={i}
                                                    editable
                                                    editAddressType="leaveFetching"
                                                    userId={leaveFetching.userId}
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
                                {/* <div style={{ alignSelf: "flex-end" }}>
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
                                </div> */}
                            </FlexContainer>
                        </FlexContainer>
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
            // handleMapModal,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewView);

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
                                    {/* Save */}
                                    <FormattedMessage
                                     id="app.save"
                                    defaultMessage="Save"
                                     />
                                  </Button>
                                <Button type="default" onClick={handleAddAddressVisible}>
                                    {/* Cancel */}
                                    <FormattedMessage
                                       id="app.cancel"
                                      defaultMessage="Cancel"
                                      />
                                  </Button>
                            </Form>
                        )}
                </Formik>
            </>
        );
    }
}
