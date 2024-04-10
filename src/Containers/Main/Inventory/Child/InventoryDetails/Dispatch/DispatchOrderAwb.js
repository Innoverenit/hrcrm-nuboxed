import React, { useEffect, useState } from 'react'
import AddressFieldArray1 from '../../../../../../Components/Forms/Formik/AddressFieldArray1';
import { Formik, Form, Field, FieldArray, FastField } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { StyledLabel } from '../../../../../../Components/UI/Elements';
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import moment from 'moment';
import { Button } from 'antd';
import { getAllShipper } from "../../../../Shipper/ShipperAction"
import { createAwbNo, handleAddAWB } from "../../../InventoryAction"
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import AddressFieldArray2 from '../../../../../../Components/Forms/Formik/AddressFieldArray2';
import APIAwbNoModal from './APIAwbNoModal';

const DispatchOrderAwb = (props) => {
    console.log(props.rowData.unloadingAddresses)
    const shipperOption = props.allShipperList.map((item) => {

        return {
            label: item.shipperName,
            value: item.shipperId
        }
    })
    useEffect(() => {
        props.getAllShipper(props.orgId)
    }, [])

    function handleSHipper(a, setFieldValue) {
        return props.allShipperList.map((item) => {
            if (item.shipperId === a) {
                setFieldValue("api", item.api);
            }
        });
    }
    const [formValue, setFormValue] = useState({})

    const handleFormValue = (values) => {
        setFormValue(values)
    }
    return (
        <>
            <Formik
                initialValues={{
                    pickUp: "",
                    shipperId: "",
                    packages: "",
                    weight: "",
                    api: "",
                    orderId: props.rowData.orderPhoneId,
                    unloadingAddressId: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].addressId || "",
                    pickUpAddressId: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].addressId || "",
                    pickUpAddress: [
                        {
                            address1: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].address1 || "",
                            addressId: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].addressId || "",
                            state: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].state || "",
                            city: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].city || "",
                            street: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].street || "",
                            postalCode: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].postalCode || "",
                            countryId: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].countryId || "",
                            latitude: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].latitude || "",
                            longitude: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].longitude || "",
                            country: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].country || "",
                        },
                    ],
                    loadingAddress: [
                        {
                            address1: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].address1 || "",
                            addressId: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].addressId || "",
                            state: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].state || "",
                            city: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].city || "",
                            street: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].street || "",
                            postalCode: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].postalCode || "",
                            countryId: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].countryId || "",
                            latitude: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].latitude || "",
                            longitude: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].longitude || "",
                            country: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].country || "",
                        },
                    ],

                }}

                // validationSchema={FormSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.createAwbNo({
                        ...values,
                    },
                        props.locationDetailsId
                    )
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
                    <Form>
                        <div>
                            <div class=" flex justify-between" >
                                <div class=" w-[47%]" >
                                    <StyledLabel><h3> Pickup Address</h3></StyledLabel>
                                    <FieldArray
                                        disabled
                                        name="pickUpAddress"
                                        render={(arrayHelpers) => (
                                            <AddressFieldArray2
                                                singleAddress
                                                arrayHelpers={arrayHelpers}
                                                values={values}
                                            />
                                        )}
                                    />
                                </div>
                                <div class=" w-[47%]" >
                                    <StyledLabel><h3> Delivery Address</h3></StyledLabel>
                                    <FieldArray
                                        name="loadingAddress"
                                        disabled
                                        render={(arrayHelpers) => (
                                            <AddressFieldArray1
                                                singleAddress
                                                arrayHelpers={arrayHelpers}
                                                values={values}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div class=" flex justify-between mt-4" >

                                <div class=" w-[47%]"  >
                                    {/* <FastField
                                        name="shipperId"
                                        isColumnWithoutNoCreate
                                        label="Shipper"
                                        isColumn
                                        selectType="shipper"
                                        component={SearchSelect}
                                        inlineLabel
                                    /> */}
                                    <Field
                                        label="Shipper"
                                        name="shipperId"
                                        placeholder="Value"
                                        onSelect={(e) => {
                                            console.log(values)
                                            handleSHipper(e, setFieldValue, values);
                                        }}
                                        component={SelectComponent}
                                        options={Array.isArray(shipperOption) ? shipperOption : []}
                                        inlineLabel
                                        width={"100%"}
                                        isColumn
                                    />
                                </div>

                                <div class=" w-[45%]"  >
                                    <Field
                                        name="pickUp"
                                        label="Available Date "
                                        isColumn
                                        inlineLabel
                                        width={"100%"}
                                        disabledDate={(currentDate) => {
                                            const date = new Date()
                                            if (
                                                moment(currentDate).isBefore(moment(date).subtract(1, 'days'))
                                            ) {
                                                return true;
                                            } else {
                                                return false;
                                            }

                                        }}
                                        component={DatePicker}
                                        value={values.pickUp}

                                    />
                                </div>
                            </div>

                            <div class=" flex justify-between mt-4" >
                                <div class=" w-[47%]" >

                                    <Field
                                        width={"100%"}
                                        name="packages"
                                        label="Package"
                                        isColumn
                                        inlineLabel
                                        component={InputComponent}
                                    />
                                </div>
                                <div class=" w-[47%]" >
                                    <Field
                                        label="Weight"
                                        name="weight"
                                        component={InputComponent}
                                        inlineLabel
                                        width={"100%"}
                                        isColumn
                                    />
                                </div>


                            </div>
                            <div class=" flex justify-between mt-4" >
                                <div class=" flex justify-end w-[47%] " style={{ margin: "67px 39px 17px -33px" }} >
                                    {values.api ?
                                        <Button
                                            style={{
                                                backgroundColor: "#3695cd",
                                                color: "white",
                                                fontSize: "15px",
                                                padding: "0px 12px",
                                            }
                                            }
                                            loading={props.addingReceivedUser}
                                            htmlType="Submit"
                                        >Save</Button>
                                        :
                                        <Button
                                            style={{
                                                backgroundColor: "#3695cd",
                                                color: "white",
                                                fontSize: "15px",
                                                padding: "0px 12px",
                                            }
                                            }
                                            onClick={() => {
                                                props.handleAddAWB(true);
                                                handleFormValue(values)
                                            }}

                                        >Save</Button>}
                                </div>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
            <APIAwbNoModal
                rowData={props.rowData}
                formValue={formValue}
                addAwbNo={props.addAwbNo}
                handleAddAWB={props.handleAddAWB}

            />
        </>
    );
}
const mapStateToProps = ({ inventory, shipper, auth }) => ({
    addingReceivedUser: inventory.addingReceivedUser,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
    allShipperList: shipper.allShipperList,
    addAwbNo: inventory.addAwbNo,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createAwbNo,
            handleAddAWB,
            getAllShipper
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DispatchOrderAwb);

