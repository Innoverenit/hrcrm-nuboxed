import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Switch, Checkbox, Button, Popconfirm, message } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer, MainWrapper } from "../../../../../../Components/UI/Layout";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { Input } from "antd";
import * as Yup from "yup";
import { addMonster, getMonster } from "../../../../SettingsAction";
const { Search } = Input;

const MonsterSchema = Yup.object().shape({
  userName: Yup.string().required("Input needed!"),
  password: Yup.string().required("Input needed!"),
  // startDate:Yup.string().required("Input needed!"),
  // endDate:Yup.string().required("Input needed!"),
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
                <StyledLabel>User Name</StyledLabel>
                <div >
                 <Field
                  // label="User Name"
                  name="userName"
                  type="email"
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />
                </div>
               
                  <StyledLabel>Password</StyledLabel>
                  <div >
                  <Field
                  // label="Password"
                  name="password"
                  type="password"
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />
            </div>
              </div>
            </div>
            <div>Updated on {dayjs(props.monster.lastUpdatedOn).format("ll")} by {props.monster.name}</div>
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                Loading={props.addingMonster}

                style={{ width: "7%", height: "2.5em" }}
              // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
              >
                Update
              </Button>
            </FlexContainer>
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
