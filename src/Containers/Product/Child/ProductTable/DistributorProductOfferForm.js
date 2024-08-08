import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { setClearbitProductDistributorData } from "../../../Product/ProductAction";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { addDistributorOffer } from "../../ProductAction";

class DistributorProductOfferForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { distributorStartDate, distributorEndDate } = this.props;
        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        distributorOfferProductFullName: "",
                        distributorOfferProductQty: 0,
                        distributorProductQty: 0,
                        distributorOfferProductId: "",
                        distributorStartDate: distributorStartDate || dayjs(),
                        distributorEndDate: distributorEndDate || null,
                        distributorEndDate: dayjs(),
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

                        this.props.addDistributorOffer({
                            ...values,
                            distributorStartDate: `${newStartDate}T00:00:00Z`,
                            distributorEndDate: `${newEndDate}T00:00:00Z`,
                        });
                        resetForm();
                    }
                    }
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
                           <div class="flex justify-between">
                                <div class="h-full w-full">

                                <div class="flex justify-between">
                                <div class="w-[12%]">
                                            <Field
                                                isRequired
                                                name="distributorProductQty"
                                                isColumn
                                                placeholder="value1"
                                                component={InputComponent}
                                                inlineLabel
                                                // value={values.product}
                                            />
                                        </div>
                                        <div class="w-[35%]">
                                            <Field
                                                isRequired
                                                name="productFullName"
                                                placeholder={"product"}
                                                isColumn
                                                disabled="true"
                                                component={InputComponent}
                                                inlineLabel
                                            />
                                        </div>
                                        <div class="w-[12%] mt-8">
                                            <Field
                                                isRequired
                                                name="distributorOfferProductQty"
                                                isColumn
                                                placeholder={"value2"}
                                                component={InputComponent}
                                                // value={values.startDate}
                                                inlineLabel
                                            />
                                        </div>
                                        <div class="w-[33%]">
                                            <Field
                                                isRequired
                                                name="label"
                                                type="text"
                                                // label="Search"
                                                placeholder="Search..."
                                                isColumn
                                                // setClearbitProductDistributorData={
                                                //     this.props.setClearbitProductDistributorData
                                                // }
                                                // component={DistributorProductClearbit}
                                                component={InputComponent}
                                                inlineLabel
                                                style={{ flexBasis: "80%" }}
                                            />
                                        </div>
                                    </div>


                                    <div class="flex justify-between mt-5">
                                        <div class="w-[47%]">
                                            <Field
                                                isRequired
                                                name="distributorStartDate"
                                                label="Start Date"
                                                isColumn
                                                component={DatePicker}
                                                value={values.distributorStartDate}
                                                inlineLabel
                                            />
                                        </div>
                                        <div class="w-[47%]">
                                            <Field
                                                isRequired
                                                name="distributorEndDate"
                                                label="End Date"
                                                component={DatePicker}
                                                isColumn
                                                value={values.distributorEndDate || values.distributorStartDate}
                                                defaultValue={dayjs("2015-01-01")}
                                                inlineLabel
                                                disabledDate={(currentDate) => {
                                                    if (values.startDate) {
                                                        if (
                                                            dayjs(currentDate).isBefore(
                                                                dayjs(values.startDate)
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

                            <div class="flex justify-end">
                                <Button
                                className="mt-5 ml-[286px]"
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.addingDistributorOffer}
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

const mapStateToProps = ({ product, distributor }) => ({
    addingDistributorOffer: product.addingDistributorOffer,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setClearbitProductDistributorData,
            addDistributorOffer,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributorProductOfferForm);
