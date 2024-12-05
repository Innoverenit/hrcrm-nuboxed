import React, { Component ,lazy, Suspense} from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {
  StyledModal,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import { Button,Tooltip } from "antd";
import {
  handleUpdatePersonalModal,
  setEditPersonal,
} from "../../../../../../Profile/ProfileAction";
import {
  getPersonalDetails,
  setCurrentPersonal,
} from "../../../../../../Profile/ProfileAction";
import { Leaflet } from "../../../../../../../Components/Utils";
import { Field, Form, Formik } from "formik";
import MapPopupMarker from "../../../../../../Profile/Child/ProfileCards/MapPopupMarker";
import { AddressComponent } from "../../../../../../../Components/Common";
import FormikPlacesAutoComplete from "../../../../../../../Components/Forms/Formik/FormikPlacesAutoComplete";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { deleteEmergencyTable } from "../../../../../../Profile/ProfileAction";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PhoneIcon from '@mui/icons-material/Phone';
import ContactsIcon from '@mui/icons-material/Contacts';

const EmptyPage = lazy(() => import("../../../../../../Main/EmptyPage"));
const UpdatePersonalModal = lazy(() => import("../Personal/UpdatePersonalModal"));

class PersonalTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapModalVisible: false,
      addAddressVisible: false,
      translatedMenuItems: [],
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
    this.fetchMenuTranslations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "110",//0 Name0
      "546",  // "Mobile No"1
      "300",  // "Phone No2
      "154",  // Submit8
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
 

    if (fetchingPersonalDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky z-10">
          <div className=" max-md:w-[6.5rem] w-[6.5rem] text-sm text-[#00A2E8]"> {/* Name */}  <ContactsIcon className="!text-icon  "/> {this.state.translatedMenuItems[0]}</div>
 
        <div className="max-md:w-[10.1rem] w-[10.1rem]"> <PhoneIcon className="!text-icon  text-[#4B2206]"/> {this.state.translatedMenuItems[1]}</div>
       <div className="max-md:w-[10.1rem] w-[10.1rem]"><PhoneIcon className="!text-icon text-[#D64045] "/>{this.state.translatedMenuItems[2]}</div>
              
        
        <div className="w-[10.2rem] max-md:w-[10.2rem]"></div>

      </div>
   
        
      {personal =="" ? <EmptyPage/>:personal.map((item) => { 
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
                        <div>
                            <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1"
                                >
                                     
                                     <div className=" flex w-[14rem] max-md:w-[14rem] max-sm:flex-row  max-sm:justify-between  ">
                                      <div className="flex max-sm: items-center"> 

                                        <div class="max-sm:">
                                        <Tooltip>
                                          <div class=" flex max-sm: justify-between w-[8rem] max-md:w-[8rem]">
                                          
                                            <div class="  text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
                                            <span>{` ${item.contactSalutation} 
                                                    ${item.contactFirstName}
                                                    ${item.contactMiddleName}
                                                    ${item.contactLastName}`}</span>
                                          
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">
                                <div className=" flex  max-md:w-[12.3rem] w-[12.3rem] max-sm:flex-row  max-sm:justify-between">
                                
                                  <div class="   font-poppins">
                                  {item.mobileNo}
                                  </div>
                              </div>

                              <div className=" flex  max-md:w-[10.3rem] w-[10.3rem max-sm:flex-row  max-sm:justify-between">
                                
                                <div class="   font-poppins">
                                {item.phoneNo}
                                </div>
                            </div>
                         
                              </div>
                              <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
                              <>
                              <Tooltip overlayStyle={{ maxWidth: "300px" }}
          title={dataLoc}>

          <LocationOnIcon className=" cursor-pointer !text-icon" 
            // handleIconClick={() => {
            //   this.props.setCurrentPersonal(item);
            //   this.handleMapModalVisible();
            // }}
          />
           </Tooltip>
          </>
                 
                  </div>
                                <div className=" flex ml-2 max-md:w-[2rem] w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                                    

                                    <div class="    font-poppins text-center">
                                    <BorderColorIcon 
            className=" !text-icon cursor-pointer"
            onClick={() => {
              //debugger
              setEditPersonal(item);
              handleUpdatePersonalModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex ml-2 max-md:w-[2rem] w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                                    

                                    <div class="    font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteEmergencyTable(item.id)}
          >
            <DeleteIcon
              type="delete"   className=" !text-icon cursor-pointer text-red-600"
       
            />
          </StyledPopconfirm>

                                    </div>
                                </div>

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
        {/* {emailCredential && ( */}
        {/* <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={personal}
          Loading={fetchingPersonalDetails || fetchingPersonalDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}
  <Suspense>
        <UpdatePersonalModal
          updatePersonalModal={updatePersonalModal}
          handleUpdatePersonalModal={handleUpdatePersonalModal}
        /></Suspense>
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
            <div class=" flex">
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
              <div class=" flex justify-between items-start flex-no-wrap"
              >
                <div>
                  <div classname="flex flex-col w-[11rem] h-[40%] px-2 py-5 bg-[f5f5f5] justify-left items-left mb-2 mt-2">
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
                <div class=" flex self-end" >
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
              </div>
            </div>
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
