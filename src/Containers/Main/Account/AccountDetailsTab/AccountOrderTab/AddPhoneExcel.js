import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { addCarDetails,handleOpenNewModal } from "../../AccountAction"
import DraggableUpload1 from "../../../../../Components/Forms/Formik/DraggableUpload1";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import AddOpenNewModal from "./AddOpenNewModal";

function AddPhoneExcel(props) {

    const [bulkQr, setBulkQr] = useState(false)
    const [nonRepaied, setNonRepaired] = useState(false)

    function handleBulkQr(checked) {
        setBulkQr(checked)
    }
    function handleRepaired(checked) {
        setNonRepaired(checked)
    }

    return (
        <>
            <Formik
                initialValues={{
                    orderPhoneId: props.orderDetailsId.orderId,
                    excelId: "",
                    userId: props.userId,
                    orgId: props.orgId,
                    totalPhoneCount: "",
                    bulkQrInd: bulkQr,
                    sendBackNonRepairInd:nonRepaied,

                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.addCarDetails(

                        {
                            ...values,
                            distributorId: props.distributorId,
                            type: "Non-Catalogue"
                        },
                        props.distributorId,
                        props.setIsModalOpen(false)
                    );

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
                    <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
                        <Form class="form-background">
                            <div class="justify-between flex mt-3">
                                <div class="h-full w-[45%] flex flex-col">
                                    <div class="mt-3">
                                        <Field
                                            name="excelId"
                                            isRequired
                                            component={DraggableUpload1}
                                        />
                                                   <p style={{color: "tomato",
    fontWeight: "600",
    padding: "0.1rem 0", 
    borderRadius: "0.1rem" }}>
                {values.excelId===""? "Please upload File" :""}
              </p>
                                    </div>
                                    <AddBoxIcon className=" !text-icon  ml-1 items-center
 text-[#6f0080ad]"
                                onClick={() => {
                                    props.handleOpenNewModal(true);
                                }}
                                />
                                </div>
                               
                                <div class="h-full w-[45%]">
                                    <div class="mt-3">
                                        <Field
                                            label="AWB No"
                                            name="awbNo"
                                            component={InputComponent}
                                            inlineLabel
                                            width={"100%"}
                                            isColumn
                                        />
                                    </div>
                                    <div class=" flex justify-between">
                                        <div class="w-[45%]">
                                            <Field
                                                label= {props.translatedMenuItems[125]}
                                                name="totalPhoneCount"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                        <div class="w-[45%]">
                                            <div class="font-bold text-xs font-poppins text-black">Required bulk QR code</div>
                                            <Switch
                                                onChange={handleBulkQr}
                                                checked={bulkQr}
                                                checkedChildren="Yes"
                                                unCheckedChildren="No" />
                                        </div>
                                      
                                    </div>
                                    <div class=" flex justify-between">
                                    <div class="w-[70%] mt-2">
                                            <div class="font-bold text-xs font-poppins text-black">Send back non repaired units </div>
                                            <Switch
                                                onChange={handleRepaired}
                                                checked={nonRepaied}
                                                checkedChildren="Yes"
                                                unCheckedChildren="No" />
                                        </div>
                                        </div>
                                </div>
                            </div>
                            <div class="justify-end flex mt-3">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingCar}
                                >
                                     {props.translatedMenuItems[141]}  
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
            <AddOpenNewModal           
                handleOpenNewModal={props.handleOpenNewModal}
                addNewModal={props.addNewModal}
                distributorId={props.distributorId}
            />
        </>
    );
}
const mapStateToProps = ({ auth, distributor }) => ({
    userId: auth.userDetails.userId,
    orderDetailsId: distributor.orderDetailsId,
    addingCar: distributor.addingCar,
    orgId: auth.userDetails.organizationId,
    addNewModal: distributor.addNewModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addCarDetails,
            handleOpenNewModal
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPhoneExcel);

