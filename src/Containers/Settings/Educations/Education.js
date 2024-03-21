import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, message,Input } from "antd";
import { MainWrapper, } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getEducations,
  getEducationCount,
  addEducations,
  removeEducation,
  updateEducations,
  searchEducationsName,
  ClearReducerDataOfEducation
} from "./EducationAction";
import dayjs from "dayjs";
const SingleEducations = lazy(() =>
  import("./SingleEducation")
);



class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedEducations: [],
      isTextInputOpen: false,
      addingEducation: false,
      educationType: "",
      type: "",
      singleEducation: "",
      editInd:true,
      currentData: ""
    };
  }
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getEducations();
      this.props.ClearReducerDataOfEducation();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchEducationsName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getEducations();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleSearchChange = (e) => {
    this.setState({ currentData: e.target.value })
  };

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddEducations = () => {
    const { addEducations, educations } = this.props;
    const { educationType, addingEducations, isTextInputOpen,editInd} = this.state;
    let education = { educationType,editInd};

    let exist =
      educations &&
      educations.some((element) => element.educationType == educationType);

    if (exist) {
      message.error(
        "Can't create as another education type exists with same name!"
      );
    } else {
      addEducations(education, () => console.log("add education callback"));
    }

    this.setState({
      educationType: "",
      singleEducation: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleDeleteEducation = (educationTypeId={educationTypeId}) => {
    this.props.removeEducation(educationTypeId);
    this.setState({ educationType: "", singleEducation: "" });
  };
  handleUpdateEducation = (educationType, educationTypeId, cb) => {
    this.props.updateEducations(educationType, educationTypeId, cb);
    this.setState({ educationType: "", singleEducation: "",editInd:true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { getEducations,getEducationCount,orgId } = this.props;
    console.log();
    getEducations();
    getEducationCount(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingEducations,
      fetchingEducationsError,
      educations,
      addingEducations,
      updatingEducations,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      educationType,
      singleEducation,
      linkedEducations,
    } = this.state;
    if (fetchingEducations) return <BundleLoader/>;
    // if (fetchingEducationsError) return <p>We are unable to load data</p>;
    return (
      <>
      <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div class=" flex flex-row justify-between">
        <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            {isTextInputOpen ? (
             <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
             >
              
                <TextInput
                  placeholder="Add Education"
                  name="educationType"
                  value={educationType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!educationType}
                  loading={addingEducations}
                  onClick={this.handleAddEducations}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="cancel"  onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
              
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    loading={addingEducations}
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
               </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
              {educations.length ? (
  educations
    .slice() 
    .sort((a, b) => a.educationType.localeCompare(b.educationType)) 
    .map((education, i) => (
                    <SingleEducations
                      key={i}
                      value={singleEducation}
                      name="singleEducation"
                      education={education}
                      linkedEducations={linkedEducations}
                      updatingEducations={updatingEducations}
                      handleChange={this.handleChange}
                      handleUpdateEducation={this.handleUpdateEducation}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                      handleDeleteEducation={this.handleDeleteEducation}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </div>
        
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.educations && this.props.educations.length && this.props.educations[0].updationDate).format('YYYY-MM-DD')} by {this.props.educations && this.props.educations.length && this.props.educations[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ education ,auth}) => ({
  addingEducations: education.addingEducations,
  addingEducationsError: education.addingEducationsError,
  educations: education.educations,
  educationCount:education.educationCount,
  orgId: auth.userDetails.organizationId,
  removingEducations: education.removingEducations,
  removingEducationsError: education.removingEducationsError,
  fetchingEducations: education.fetchingEducations,
  fetchingEducationsError: education.fetchingEducationsError,

  updatingEducations: education.updatingEducations,
  updatingEducationsError: education.updatingEducationsError,
  // fetchingDocuments: document.fetchingDocuments,
  // fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducations,
      getEducationCount,
      addEducations,
      removeEducation,
      updateEducations,
      searchEducationsName,
      ClearReducerDataOfEducation
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Education);
