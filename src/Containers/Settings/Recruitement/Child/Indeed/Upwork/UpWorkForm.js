import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch,  Popconfirm } from "antd";
import { Formik, Form } from "formik";
import { Input } from "antd";
import { addingUpWorkAccess,getUpWorkAccess } from "../../../../SettingsAction";
const { Search } = Input;

function UpWorkForm(props) {
    useEffect(() => {
        props.getUpWorkAccess(props.orgId);
      }, []);
      const { upworkInd } = props.upWorkAccess;
      console.log(upworkInd);
     const [toggle, setToggle] = useState(upworkInd)
     function handleCandidateClick(checked) {
      console.log(upworkInd);
     if (upworkInd) {
       //disable url
       props.addingUpWorkAccess({
         orgId: props.orgId,
         upworkInd:upworkInd? false : true,
       }, );
        setToggle( upworkInd ? false : true);
     } else {
 
       props.addingUpWorkAccess({
         orgId: props.orgId,
         upworkInd:upworkInd? false : true,
       }, props.orgId);
       setToggle(upworkInd ? false : true);
     }
 
   }
   function handleCancel() {
     if (upworkInd) {
       setToggle(true);
     } else {
       setToggle(false);
     }
   }
  return (
    <>
      <Formik
        initialValues={{
          type: undefined,
        }}
        onSubmit={(values) => {}}
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >

<div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  w-[52%]">
        <p>Enable</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleCandidateClick}
            onCancel={handleCancel}
            okText="Ok"
            cancelText="Cancel"
          >
            <Switch
              style={{ width: "5em" }}
               checked={toggle||upworkInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div>
           
              </div>
            
            </div>
         
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  upWorkAccess:settings.upWorkAccess,
  fetchingUpWorkAccess: settings.fetchingUpWorkAccess,
  fetchingUpWorkAccessError:settings.fetchingUpWorkAccessError ,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUpWorkAccess,
  addingUpWorkAccess
},
 dispatch
 );

export default connect(mapStateToProps, mapDispatchToProps)(UpWorkForm);
