import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { Button } from 'antd';
import { createAwbNo,handleAddAWB } from "../../../InventoryAction"
import { StyledModal } from '../../../../../../Components/UI/Antd';

const AddAWBNo = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [awbFieldValue, setAwbFieldValue] = useState(""); 

    const initialValues = {
        awbNo: awbFieldValue, // Initialize AWB input field value from state
        pickUp: props.formValue.pickUp || "",
        shipperId: props.rowData.shipperId || "",
        packages: props.formValue.packages || "",
        weight: props.formValue.weight || "",
        api: props.formValue.api || "",
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
    };
    const handleSubmit = (values, { resetForm }) => {
        setAwbFieldValue(values.awbNo); 
        setShowModal(true);
        resetForm();
    };

    const handleModalConfirm = () => {
        props.createAwbNo(initialValues, props.locationDetailsId); 
        setAwbFieldValue(""); 
        setShowModal(false); 
    };
    const handleModalNoo = () => {
        props.createAwbNo(initialValues, props.locationDetailsId); 
        setAwbFieldValue(""); 
        setShowModal(false); 
        props.handleAddAWB(false);
    };
    const handleModalCancel = () => {
        setShowModal(false); 
        props.handleAddAWB(false)
    };
console.log(props.rowData.shipperId)
    return (
        <>
        <Formik
        initialValues={initialValues}
         onSubmit={handleSubmit}
        >
           {() => (
                <Form>
                   <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                        <div class=" w-[60%]"  >
                            <Field
                                label="AWB"
                                name="awbNo"
                                component={InputComponent}
                                inlineLabel
                                width={"100%"}
                                isColumn
                            />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <Button
                                htmlType="Submit"
                                loading={props.addingReceivedUser}>
                                Add
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
        <StyledModal
       visible={showModal}
       onCancel={handleModalCancel}
        footer={[<>
        <Button key="cancel" onClick={handleModalCancel}>
             Cancel
            </Button>
            <Button key="cancel" onClick={handleModalNoo}>
                No
            </Button>
            <Button key="confirm" type="primary" onClick={handleModalConfirm}>
                Yes
            </Button>
            </>
        ]}
    >
      Do you want to add AWB No ?
    </StyledModal>

    </>
    );
}
const mapStateToProps = ({ inventory, shipper }) => ({
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createAwbNo,
            handleAddAWB
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddAWBNo);

