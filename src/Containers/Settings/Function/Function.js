import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button,message } from "antd";
import { MainWrapper} from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import {
  getFunctions,
  addFunctions,
  //   removeSectors,
  updateFunctions,
} from "./FunctionAction";
import SingleFunctions from "./SingleFunction";


class Function extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedFunctions: [],
      isTextInputOpen: false,
      addingFunction: false,
      functionType: "",
      type: "",
      singleFunction: "",
    };
  }
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddFunctions = () => {
    const { addFunctions, functions } = this.props;
    const { functionType, addingFunctions, isTextInputOpen } = this.state;
    let Function = { functionType };

    let exist =
      functions &&
      functions.some((element) => element.functionType == functionType);

    if (exist) {
      message.error(
        "Can't create as another functionType exists with same name!"
      );
    } else {
      addFunctions(Function, () => console.log("add function callback"));
    }

    this.setState({
      functionType: "",
      singleFunction: "",
      isTextInputOpen: false,
    });
  };
 
  handleUpdateFunction = (functionType, functionTypeId, cb) => {
    this.props.updateFunctions(functionType, functionTypeId, cb);
    this.setState({ functionType: "", singleFunction: "" });
  };
 
  componentDidMount() {
    const { getFunctions } = this.props;
    console.log();
    getFunctions();
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingFunctions,
      fetchingFunctionsError,
      functions,
      addingFunctions,
      updatingFunctions,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      functionType,
      singleFunction,
      linkedFunctions,
    } = this.state;
    if (fetchingFunctions) return <p>Loading ...</p>;
    if (fetchingFunctionsError) return <p>We are unable to load data</p>;
    return (
      <>
 <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
           <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {functions.length &&
                  functions.map((Function, i) => (
                    <SingleFunctions
                      key={i}
                      value={singleFunction}
                      name="singleFunction"
                      Function={Function}
                      linkedFunctions={linkedFunctions}
                      updatingFunctions={updatingFunctions}
                      handleChange={this.handleChange}
                      handleUpdateFunction={this.handleUpdateFunction}
                      //   handleDeleteSector={this.handleDeleteSector}
                    />
                  ))}
              </MainWrapper>
            </div>
            {isTextInputOpen ? (
              <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ml-1 mt-1">           
                <br />
                <br />
                <TextInput
                  placeholder="Add More"
                  name="functionType"
                  value={functionType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!functionType}
                  Loading={addingFunctions}
                  onClick={this.handleAddFunctions}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingFunctions}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
              </>
            )}
          </MainWrapper>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ functions }) => ({
  addingFunctions: functions.addingFunctions,
  addingFunctionsError: functions.addingFunctionsError,
  functions: functions.functions,

//   removingEducations: education.removingEducations,
//   removingEducationsError: education.removingEducationsError,
  fetchingFunctions: functions.fetchingFunctions,
  fetchingFunctionsError: functions.fetchingFunctionsError,

  updatingFunctions: functions.updatingFunctions,
  updatingFunctionsError: functions.updatingFunctionsError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFunctions,
      addFunctions,
      //   removeSectors,
      updateFunctions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Function);
