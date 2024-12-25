import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { message, Button, Upload } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledSteps } from "../../../Components/UI/Antd";
import { MainWrapper} from "../../../Components/UI/Layout";
import { Title, HeaderText } from "../../../Components/UI/Elements";
import { SelectComponent } from "../ImportSelect";
import ImportHeader from "./ImportHeader";
import ImportHelpGuide from "./ImportHelpGuide";

import InboxIcon from '@mui/icons-material/Inbox';

import {
  importExcel,
  getExcelHeaders,
  getAccountMatchingFields,
  mapExcelToAccount,
} from "../ImportAction";
import { BundleLoader } from "../../../Components/Placeholder";

const Step = StyledSteps.Step;
const { Dragger } = Upload;

class AccountImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      fileList: null,
      accountNumber: "",
    };
  }
  handleBeforeUpload = (file) => {
    console.log(file);
    const isJPG = file.type === "xlx" || "xlxs";
    if (!isJPG) {
      message.error("You can only upload excel file!");
    }
    return false;
  };

  handleChange = (info) => {
    this.setState({ fileList: info.fileList });
    if (info.file.status === "done") {
      this.props.input.onChange(info.file.response);
      this.setState({
        uploadResponse: info.file.response,
      });
    }
  };
  handleUpload = (file) => {
    this.props.importExcel(file.file, "account", this.afterImportCallback);
  };
  afterImportCallback = () => this.next();
  afterMappingCallback = (data) => {
    this.setState({ accountNumber: data });
    this.next();
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    const {
      exportingExcelFile,
      excelFileId,
      excelHeaders,
      accountMatchingFields,
      mapExcelToAccount,
      mappingExcelToAccount,
    } = this.props;
    const accountRequiredFields =
      accountMatchingFields &&
      accountMatchingFields
        .filter((field) => {
          if (field.required === true) {
            return field.fieldKey;
          }
        })
        .map((field) => field.fieldKey);
    return (
      <>
        <ImportHeader />
        <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
          <div style={{ width: "65%" }}>
            <MainWrapper>
              <HeaderText style={{ textAlign: "center" }}>
                Upload Customers here
              </HeaderText>
              <StyledSteps current={current} labelPlacement="vertical">
                <Step
                  title={"Upload"}
                  icon={exportingExcelFile && <BundleLoader />}
                // type="loading"
                />
                <Step
                  title={"Map"}
                  icon={mappingExcelToAccount && <BundleLoader />}
                // type="loading" 
                />
                <Step title={"Finish"} icon={null} />
              </StyledSteps>
              <div className="steps-content">
                {current === 0 && (
                  <div class=" flex flex-row flex-wrap items-center self-start justify-center grow shrink mr-auto w-[full] h-[400px]">
                   
                    <div className="clearfix" style={{ height: "200px" }}>
                      <Dragger
                        accept=".csv,.xls,.xlsx"
                        {...this.props}
                        customRequest={this.handleUpload}
                        // listType="picture-card"
                        name="file"
                        onChange={this.handleChange}
                      >
                        <p className="ant-upload-drag-icon">
                           < InboxIcon  className="!text-icon" />
                          {/* type="inbox" */}
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p
                          className="ant-upload-hint"
                          style={{ margin: "0px 3.12em 0px 3.12em" }}
                        >
                          The import tool accepts CSV, XLS, or XLSX files with
                          single tab, multi tab files cannot be uploaded..
                        </p>
                      </Dragger>
                    </div>
                  </div>
                )}
                {current === 1 && (
                  <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto overflow-auto mt-[10px] max-h-[400px]:">          
                    {accountMatchingFields && (
                      <Formik
                        onSubmit={(values) => {
                          console.log(values);
                          const errors = [];
                          Object.values(values).map((value) => {
                            console.log(value);
                            if (accountRequiredFields.includes(value)) {
                              errors.push(value);
                            }
                          });
                          const array3 = accountRequiredFields.filter(function (
                            obj
                          ) {
                            return errors.indexOf(obj) == -1;
                          });
                          if (array3.length < 0) {
                            message.error(
                              `${array3.join(", ")} fields are required`,
                              3.5
                            );
                          } else {
                            const arr = Object.entries(values).map(
                              ([key, val]) => ({
                                excelHeader: key,
                                mappingField: val,
                              })
                            );
                            mapExcelToAccount(
                              arr,
                              excelFileId,
                              this.props.history,
                              this.afterMappingCallback
                            );
                          }
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
                          <Form style={{ width: "100%" }}>
                            {excelHeaders &&
                              excelHeaders.map((header, i) => { 
                                return (
                                  <>
                                    <Field
                                      key={i}
                                      name={header}
                                      placeholder="Select"
                                      component={SelectComponent}
                                      label={header}
                                      options={
                                        accountMatchingFields &&
                                        accountMatchingFields
                                      } 
                                    />
                                  </>
                                 ); 
                               })} 
                               <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-[0.62rem] ">
                          
                              <Button
                                style={{ marginRight: 8 }}
                                onClick={() => this.prev()}
                              >
                                {" "}
                                Previous{" "}
                              </Button>
                              <Button
                                type="primary"
                                htmlType="submit"
                                loading={mappingExcelToAccount}
                              >
                                Map
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                 )} 
                  </div>
              )} 
                {current === 2 && (
                  <div class=" flex flex-row flex-wrap items-center self-start justify-center grow shrink h-[400px] w-full mr-auto ">
             
             <div class=" flex flex-row flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
                      <Title
                        style={{
                          fontSize: "1.37em",
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "3.12em",
                        }}
                      >
                        You have successfully imported{" "}
                        {this.state.accountNumber}
                        Customer data.
                      </Title>
                      {/* <Link toUrl="/account" title="Go to Customer" /> */}
                    </div>
                  </div>
              )} 
              </div>
          </MainWrapper>
          </div>
          <div style={{ width: "35%" }}>
            <ImportHelpGuide />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ importReducer }) => ({
  exportingExcelFile: importReducer.exportingExcelFile,
  excelFileId: importReducer.excelFileId,
  fetchingExcelHeaders: importReducer.fetchingExcelHeaders,
  excelHeaders: importReducer.excelHeaders,
  // fetchingAccountMatchingFields: importReducer.fetchingAccountMatchingFields,
  // accountMatchingFields: importReducer.accountMatchingFields,
  // mappingExcelToAccount: importReducer.mappingExcelToAccount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      importExcel,
      getExcelHeaders,
      // getAccountMatchingFields,
      // mapExcelToAccount,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountImport)

