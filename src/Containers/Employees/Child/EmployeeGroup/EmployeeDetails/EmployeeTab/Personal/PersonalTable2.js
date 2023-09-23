import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledModal,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import { Button, Icon,Tooltip } from "antd";
import {
  handleUpdatePersonalModal,
  setEditPersonal,
} from "../../../../../../Profile/ProfileAction";
import UpdatePersonalModal from "../Personal/UpdatePersonalModal";
import {
  getPersonalDetails,
  setCurrentPersonal,
} from "../../../../../../Profile/ProfileAction";
import EditIcon from '@mui/icons-material/Edit';
import { Leaflet } from "../../../../../../../Components/Utils";
import { Field, Form, Formik } from "formik";
import MapPopupMarker from "../../../../../../Profile/Child/ProfileCards/MapPopupMarker";
import { AddressComponent } from "../../../../../../../Components/Common";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import FormikPlacesAutoComplete from "../../../../../../../Components/Forms/Formik/FormikPlacesAutoComplete";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { deleteEmergencyTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
class PersonalTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapModalVisible: false,
      addAddressVisible: false,
    };
  }
  handleMapModalVisible = () =>
    this.setState({
      mapModalVisible: !this.state.mapModalVisible,
    });
  handleAddAddressVisible = () =>
    this.setState({ addAddressVisible: !this.state.addAddressVisible });

  componentDidMount() {
    const { getPersonalDetails, employeeId } = this.props;
    getPersonalDetails(employeeId);
  }
  // }
  render() {
    const {
      fetchingPersonalDetails,
      fetchingPersonalDetailsError,
      personal,
      handleUpdatePersonalModal,
      updatePersonalModal,
      setEditPersonal,
      setCurrentPersonalData,
      deleteEmergencyTable,
      setCurrentPersonalData: { address, contactFirstName, contactLastName },
    } = this.props;
    const markers = [];

    address &&
      address.forEach((l) => {
        if (l.latitude && l.longitude) {
          console.log("inside IFF", l);
          markers.push({
            lat: Number(l.latitude),
            lng: Number(l.longitude),
            name: contactFirstName,
            type: l.addressType,
            data: setCurrentPersonalData,
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
    const columns = [
      {
        //title: "Name",
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
        render: (name, item, i) => {
          return (
            <span>{` ${item.contactSalutation} 
                ${item.contactFirstName}
                ${item.contactMiddleName}
                ${item.contactLastName}`}</span>
          );
        },
      },

      {
        //title: "Mobile No",
        title: <FormattedMessage
          id="app.mobileNo"
          defaultMessage="Mobile No"
        />,
        dataIndex: "mobileNo",
      },
      {
        //title: "Phone No",
        title: <FormattedMessage
          id="app.phoneNo"
          defaultMessage="Phone No"
        />,
        dataIndex: "phoneNo",
      },

      // {
      //   title: "Address",
      //   dataIndex: "contactAddress",
      //   width: "35%",
      //   render: (name, item, i) => {
      //     //debugger
      //     return item.address.map((item) => {
      //       return (
      //         <span>
      //           {item.country}-{item.state}
      //         </span>
      //       );
      //     });
      //   },
      // },

      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
         const dataLoc=` Address : ${item.address &&
          item.address.length &&
          item.address[0].address1} 
         Street : ${item.address &&
           item.address.length &&
           item.address[0].street}   
        State : ${item.address && item.address.length && item.address[0].state}
       Country : ${(item.address &&
         item.address.length &&
         item.address[0].country) ||
         ""} 
         PostalCode : ${item.address &&
           item.address.length &&
           item.address[0].postalCode} `;
          return (
            <Tooltip overlayStyle={{ maxWidth: "300px" }}
            title={dataLoc}>

            <LocationOnIcon  style={{
              cursor: "pointer",
              fontSize: "0.8rem"}}
              
              iconType="environment"
              // handleIconClick={() => {
              //   this.props.setCurrentPersonal(item);
              //   this.handleMapModalVisible();
              // }}
              size="1em"
            />
             </Tooltip>
          );
        },
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <BorderColorIcon 
              style={{ cursor: "pointer",fontSize:"0.8rem", }}
              onClick={() => {
                //debugger
                setEditPersonal(item);
                handleUpdatePersonalModal(true);
              }}
            />
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteEmergencyTable(item.id)}
            >
                         <DeleteIcon type="delete" style={{ cursor: "pointer",fontSize:"0.8rem", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingPersonalDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={personal}
          Loading={fetchingPersonalDetails || fetchingPersonalDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <UpdatePersonalModal
          updatePersonalModal={updatePersonalModal}
          handleUpdatePersonalModal={handleUpdatePersonalModal}
        />
        <StyledModal
          title={`${contactFirstName || ""} 
             ${contactLastName || ""}`}
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
                  {this.state.addAddressVisible && (
                    <AddressField
                      emergencyId={setCurrentPersonalData.id}
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
                          editAddressType="emergency"
                          emergencyId={setCurrentPersonalData.id}
                          components={components}
                        />
                      ))}
                  </div>
                </div>
                <div class="vl"></div>
                <div style={{ alignSelf: "flex-end" }}>
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
                      markers={markers}
                    />
                  )}
                </div>
              </FlexContainer>
            </FlexContainer>
          </>
        </StyledModal>
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  personal: profile.personalDetails,
  fetchingPersonalDetails: profile.fetchingPersonalDetails,
  fetchingPersonalDetailsError: profile.fetchingPersonalDetailsError,
  updatePersonalModal: profile.updatePersonalModal,
  //   userId: auth.userDetails.userId,
  setCurrentPersonalData: profile.setCurrentPersonalData,
  employeeId: employee.singleEmployee.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPersonalDetails,
      handleUpdatePersonalModal,
      setEditPersonal,
      setCurrentPersonal,
      deleteEmergencyTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PersonalTable2);

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
                  //label="Work place"
                  label={<FormattedMessage
                    id="app.workplace"
                    defaultMessage="Work place"
                  />}
                  component={FormikPlacesAutoComplete}
                  options={{}}
                />
                <Field
                  //label="Address1"
                  label={<FormattedMessage
                    id="app.Address1"
                    defaultMessage="address.address1"
                  />}
                  name="address.address1"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="address2"
                  label={<FormattedMessage
                    id="app.Address2"
                    defaultMessage="address.address2"
                  />}
                  name="address.address2"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="street"
                  label={<FormattedMessage
                    id="app.address.street"
                    defaultMessage="street"
                  />}
                  name="address.street"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="town"
                  label={<FormattedMessage
                    id="app.address.town"
                    defaultMessage="town"
                  />}
                  name="address.town"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //  label="city"
                  label={<FormattedMessage
                    id="app.address.city"
                    defaultMessage="city"
                  />}
                  name="address.city"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="state"
                  label={<FormattedMessage
                    id="app.address.state"
                    defaultMessage="state"
                  />}
                  name="address.state"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="country"
                  label={<FormattedMessage
                    id="app.address.country"
                    defaultMessage="country"
                  />}
                  name="address.country"
                  component={InputComponent}
                // defaultValue='low'
                />
                <Field
                  //label="postalCode"
                  label={<FormattedMessage
                    id="app.address.postalCode"
                    defaultMessage="postalCode"
                  />}
                  name="address.postalCode"
                  component={InputComponent}
                // defaultValue='low'
                />

                <Button type="primary" htmlType="submit">
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
              </Button>
                <Button type="default" onClick={handleAddAddressVisible}>
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
