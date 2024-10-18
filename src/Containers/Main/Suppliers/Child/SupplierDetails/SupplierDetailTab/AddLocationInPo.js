import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import dayjs from "dayjs";
import { getLocationList } from "../../../../Account/AccountAction"
import { movePoToInventory } from "../../../SuppliersAction"
import { BundleLoader } from "../../../../../../Components/Placeholder";

function AddLocationInPo(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

           "658", // "Location",//0
           "154"// "Submit",//1

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
    useEffect(() => {
        props.getLocationList(props.orgId);
    }, []);
    dayjs.addRealYear = function addRealYear(y) {
        var fm = dayjs(y).add(10, "Y");
        var fmEnd = dayjs(fm).endOf("year");
        return y.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
            ? fm.add(10, "y")
            : fm;
    };
    const locationsName = props.locationlist.filter((item) => {
        return item.inventoryInd === true
    }).map((item) => {
        return {
            label: item.locationName || "",
            value: item.locationDetailsId,
        };
    });
    return (
        <>
            {props.fetchingLocationList ? <BundleLoader /> : <Formik
                initialValues={{
                    locationId: "",
                    userId: props.userId,
                    supplierId: props.supplierId,
                    poSupplierDetailsId: props.rowData.poSupplierDetailsId
                }}
                onSubmit={(values, { resetForm }) => {
                    props.movePoToInventory({
                        ...values,
                    },
                        props.supplierId
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
                    <Form>
                        <div class="flex justify-between">
                            <div class="w-[50%]">
                                <div className=" text-xs font-bold font-poppins">{translatedMenuItems[0]}</div>
                               <Field
                                    name="locationId"
                                    type="text"
                                    width={"100%"}
                                    placeholder="Location"
                                    // label="Location"
                                    isRequired
                                    component={SelectComponent}
                                    options={Array.isArray(locationsName) ? locationsName : []}
                                />
                            </div>
                            <div class="flex justify-end mt-2">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.moveToInventory}
                                >
                                   {translatedMenuItems[1]} {/* Submit */}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>}
        </>
    );
}
const mapStateToProps = ({ distributor, suppliers, auth }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    locationlist: distributor.locationlist,
    moveToInventory: suppliers.moveToInventory,
    fetchingLocationList: distributor.fetchingLocationList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getLocationList,
        movePoToInventory
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddLocationInPo);
