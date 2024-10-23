import React, {Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Button, Switch} from "antd";
import { Formik, Form, Field} from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { setClearbitOrderData } from "../../../Main/Account/AccountAction";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import OrderClearbit from "../../../../Components/Forms/Autocomplete/OrderClearbit";
import { addDiscountDistributor } from "../../ProductAction";

class DistributorProductDiscountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cash: true,
            amount: true,

        };
    }
    handleCashChange = (checked) => {
        console.log(checked);
        this.setState({
            cash: checked,
        });
    };
    handleAmountChange = (checked) => {
        console.log(checked);
        this.setState({
            amount: checked,
        });
    };

    render() {
        const { addingDiscount,
            distributorStartDate,
            distributorEndDate, } = this.props;
        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        distributorAllowedDiscount: "",
                        distributorDiscountSubType: this.state.amount ? "Amount" : "Percentage",
                        distributorDiscountType: this.state.cash ? "Cash" : "Cash",
                        distributorStartDate: distributorStartDate || dayjs(),
                        distributorEndDate: dayjs(),
                        distributorEndDate: distributorEndDate || null,
                        distributorDiscountName: "",
                        // productId: this.props.particularDiscountData.productId,
                        userId: this.props.userId,
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        console.log(values);
                        let timeZoneFirst = "GMT+05:30";

                        let mytimeZone = timeZoneFirst.substring(4, 10);
                        console.log(mytimeZone);

                        var a = mytimeZone.split(":");
                        console.log(a);
                        var timeZoneminutes = +a[0] * 60 + +a[1];
                        console.log(timeZoneminutes);
                        if (!values.distributorEndDate) {
                            values.distributorEndDate = values.distributorStartDate;
                        }
                        let newStartDate = dayjs(values.distributorStartDate).format("YYYY-MM-DD");
                        console.log(newStartDate);
                        //Time calculation
                        let firstStartTime = dayjs(values.startTime).format(
                            "HH:mm:ss.SSS[Z]"
                        ); // getting start time from form input
                        console.log(firstStartTime);

                        let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
                        console.log(firstStartHours);

                        let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
                        console.log(timeEndPart);

                        var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
                        console.log(firstStartTimeSplit);

                        var minutes =
                            +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
                        console.log(minutes);

                        var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
                        console.log(firstStartTimeminutes);

                        let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
                        let m = firstStartTimeminutes % 60;
                        h = h < 10 ? "0" + h : h;
                        m = m < 10 ? "0" + m : m;
                        let finalStartTime = `${h}:${m}`;
                        console.log(finalStartTime);

                        let newStartTime = `${finalStartTime}${timeEndPart}`;
                        console.log(newStartTime);

                        let newEndDate = dayjs(values.distributorEndDate).format("YYYY-MM-DD");
                        let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
                        console.log(firstEndTime);
                        let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
                        console.log(firstEndHours);

                        var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
                        console.log(firstEndTimeSplit);
                        var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
                        console.log(endMinutes);
                        var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
                        console.log(firstEndTimeminutes);
                        let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
                        console.log(hr);
                        let mi = firstEndTimeminutes % 60;
                        console.log(hr);
                        hr = hr < 10 ? "0" + hr : hr;
                        mi = mi < 10 ? "0" + mi : mi;
                        let finalEndTime = `${hr}:${mi}`;
                        console.log(finalEndTime);
                        console.log(timeEndPart);
                        console.log(`${finalEndTime}${timeEndPart}`);

                        let newEndTime = `${finalEndTime}${timeEndPart}`;


                        this.props.addDiscountDistributor(
                            {
                                ...values,
                                userId: this.props.userId,
                                distributorDiscountSubType: this.state.amount ? "Amount" : "Percentage",
                                distributorDiscountType: this.state.cash ? "Cash" : "Cash",
                                distributorStartDate: `${newStartDate}T00:00:00Z`,
                                distributorEndDate: `${newEndDate}T00:00:00Z`,
                            },
                        );
                        resetForm();
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
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >



                                    {this.state.cash ? (
                               <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                            <div style={{ width: "47%" }}>
                                                <Switch
                                                    style={{ width: "80px", marginTop: "30px" }}
                                                    onChange={this.handleAmountChange}
                                                    checked={this.state.amount}
                                                    checkedChildren="Amount"
                                                    unCheckedChildren="%"
                                                />
                                            </div>
                                            <div style={{ width: "47%" }}>
                                                <Field
                                                    isRequired
                                                    name="distributorAllowedDiscount"
                                                    placeholder={"Amount"}
                                                    isColumn
                                                    component={InputComponent}
                                                    use12Hours
                                                    // value={values.startTime}
                                                    inlineLabel
                                                    style={{
                                                        flexBasis: "80%",
                                                        marginTop: "0px",
                                                        width: "100%",
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    ) : (
                                        <>
                                            <mt-3 style={{ marginBottom: "15px" }} />
                                            <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                                <div style={{ width: "12%" }}>
                                                    <Field
                                                        isRequired
                                                        name="value1"
                                                        isColumn
                                                        placeholder="value1"
                                                        component={InputComponent}
                                                        inlineLabel
                                                        // value={values.product}
                                                        style={{
                                                            flexBasis: "80%",
                                                            height: "29px",
                                                            marginTop: "0px",
                                                            width: "80%",
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: "35%" }}>
                                                    <Field
                                                        isRequired
                                                        name="categoryName"
                                                        placeholder={"product"}
                                                        isColumn
                                                        disabled="true"
                                                        component={InputComponent}
                                                        inlineLabel
                                                        style={{
                                                            flexBasis: "80%",
                                                            height: "29px",
                                                            marginTop: "0px",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ marginTop: "31px" }}>
                                                    =
                                                </div>

                                                <div style={{ width: "12%" }}>
                                                    <Field
                                                        isRequired
                                                        name="value2"
                                                        isColumn
                                                        placeholder={"value2"}
                                                        component={InputComponent}
                                                        // value={values.startDate}
                                                        inlineLabel
                                                        style={{
                                                            flexBasis: "80%",
                                                            height: "29px",
                                                            marginTop: "0px",
                                                            width: "80%",
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: "33%" }}>
                                                    <Field
                                                        isRequired
                                                        name="label"
                                                        type="text"
                                                        // label="Search"
                                                        placeholder="Search..."
                                                        isColumn
                                                        setClearbitOrderData={this.props.setClearbitOrderData}
                                                        component={OrderClearbit}
                                                        inlineLabel
                                                        style={{ flexBasis: "80%" }}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <mt-3 style={{ marginBottom: "15px" }} />
                                    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                isRequired
                                                name="distributorStartDate"
                                                label="Start Date"
                                                isColumn
                                                component={DatePicker}
                                                value={values.distributorStartDate}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                isRequired
                                                name="distributorEndDate"
                                                label="End Date"
                                                component={DatePicker}
                                                isColumn
                                                value={values.distributorEndDate || values.distributorStartDate}
                                                defaultValue={dayjs("2015-01-01")}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "100%",
                                                }}
                                                disabledDate={(currentDate) => {
                                                    if (values.distributorStartDate) {
                                                        if (
                                                            dayjs(currentDate).isBefore(
                                                                dayjs(values.distributorStartDate)
                                                            )
                                                        ) {
                                                            return true;
                                                        } else {
                                                            return false;
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={addingDiscount} style={{
                                        marginTop: "20px",
                                        marginLeft: "286px",
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ product, auth }) => ({
    addingDiscount: product.addingDiscount,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setClearbitOrderData,
            addDiscountDistributor,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorProductDiscountForm);
