import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { MainWrapper } from "../../../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { Input } from "antd";
import * as Yup from "yup";
import { addMonster, getMonster } from "../../../../SettingsAction";
const { Search } = Input;

const MonsterSchema = Yup.object().shape({
  userName: Yup.string().required("Input needed!"),
  password: Yup.string().required("Input needed!"),
});
// const {
//   addingMonster,
//   addMonster

// } = this.props;

function MonsterForm(props) {

  useEffect(() => {
    props.getMonster(props.organizationId);
  }, []);
  console.log(props.monster.length && props.monster[0].password)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          // type: undefined,
          orgId: props.organizationId,
          userName: props.monster.userName || "",
          password: props.monster.password || "",
          monsterInd: "true"
        }}
        validationSchema={MonsterSchema}
        onSubmit={(values) => {
          props.addMonster(
            {
              ...values,
            },
            props.organizationId


          )
        }}
      >
        {({ values }) => (
          <Form className="form-background">
          <MainWrapper>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                 
                }}
              >
                <div class=" text-xs font-bold font-poppins text-black">User Name</div>
                <div >
                 <Field
                  // label="User Name"
                  name="userName"
                  type="email"              
                  component={InputComponent}
                />
                </div>
               
                  <div class=" text-xs font-bold font-poppins text-black">Password</div>
                  <div >
                  <Field
                  // label="Password"
                  name="password"
                  type="password"            
                  component={InputComponent}
                />
            </div>
              </div>
            </div>
            <div>Updated on {dayjs(props.monster.lastUpdatedOn).format("ll")} by {props.monster.name}</div>
            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
              <Button
                type="primary"
                htmlType="submit"
                Loading={props.addingMonster}

                style={{ width: "7%", height: "2.5em" }}
      
              >
                Update
              </Button>
            </div>
          </MainWrapper>
        </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ settings, auth }) => ({
  organizationId: auth.userDetails.organizationId,
  monster: settings.monster,
  userId: auth.userId,
  addingMonster: settings.addingMonster,
  addingMonsterError: settings.addingMonsterError,
  fetchingMonster: settings.fetchingMonster,
  fetchingMonsterError: settings.fetchingMonsterError,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addMonster,
  getMonster
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MonsterForm);
