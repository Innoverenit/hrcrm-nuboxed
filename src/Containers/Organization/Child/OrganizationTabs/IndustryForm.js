import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, FastField } from "formik";
import {
  Select,
} from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Button, } from "antd";
import {
  updateOrganizationType,
  getOrgType
  //getRequirementsDuration,
} from "../../../Settings/SettingsAction";


const { Option } = Select;
function IndustryForm(props) {
  const [anniversary, setAnniversary] = useState(props.requirementDuration.jobAniEmailInd);
  const [birthday, setBirthday] = useState(props.requirementDuration.birthdayEmailInd);

  const handleAnniversay = (checked) => {
    setAnniversary(checked);
  };
  const handleBirthday = (checked) => {
    setBirthday(checked);
  };
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    
          " Update"
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
    props.getOrgType(props.orgId);
  }, []);

  useEffect(() => {
    // Check if data is available
    if (props.orgTypeData.length > 0) {
    }
  }, [props.orgTypeData]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          orgType: props.orgTypeData.orgType,
         

        }}
        onSubmit={(values) => {
          console.log(values)
        
          props.updateOrganizationType(
            {
              ...values,
              orgType:values.orgType,                
            },
            // props.orgId
          );
        }}
      >
        {({ values }) => (
        <div class="mr-5 ml-5 overflow-auto">
            <div class=" flex flex-row   ">
            <div class=" h-h86 overflow-auto overflow-x-hidden">
              <Form className="form-background">
                <div class=" flex justify-between w-[61rem] ">       
                  <div class=" mt-[0.625em] ml-[1em]">               
                    <div class=" flex flex-col justify-between w-full mt-4">
                                   
<div class=" w-[47%]" >
                          <FastField
                            name="orgType"
                            type="text"
                            style={{width:"16em"}}
                            // label="Salutation"                       
                            options={["Real Estate", "Retail", "Manufacture"]}
                            component={SelectComponent}
                            inlineLabel                        
                            isColumn
                          />
                        </div>                                            
                    </div>
                  </div>
                </div>              
                <div class=" flex justify-end mt-[1.25em]" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.organizationType}
                  >
                    {translatedMenuItems[0]}
                    {/* Update */}
                  </Button>
                </div>


              </Form>
              </div>
           
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  requirementDuration: settings.requirementDuration,
  orgId: auth.userDetails.organizationId,
  updateRequirement: settings.updateRequirement,
  organizationType:settings.organizationType,
  orgTypeData:settings.orgTypeData,
  updateRequirementError: settings.updateRequirementError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateOrganizationType,
      getOrgType
    //   updateRequirement,
    //   getRequirementsDuration,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IndustryForm);
