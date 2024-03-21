import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getDesignations,
  getDesignationCount,
  addDesignations,
   removeDesignations,
  updateDesignations,
  searchDesignationName,
  ClearReducerDataOfDesignation
} from "./DesignationAction";
const SingleDesignation = lazy(() =>
  import("./Child/SingleDesignation")
);

class Designation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDesignations: [],
      isTextInputOpen: false,
      addingDesignation: false,
      designationType: "",
      type:"",
      singleDesignation: "",
      editInd:true,
      currentData: "",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getDesignations();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getDesignations();
      this.props.ClearReducerDataOfDesignation();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchDesignationName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddDesignation = () => {
    const { addDesignations, designations } = this.props;
    const { designationType, addingDesignations, isTextInputOpen,editInd } = this.state;
    let designation = { designationType,editInd };

    let exist =
    designations &&
    designations.some((element) => element.designationType == designationType);

    // if (exist) {
    //   message.error(
    //     "Can't create as another designation type exists with same name!"
    //   );
    // } else {
      addDesignations(designation, () => console.log("add designation callback"));
    // }

    this.setState({
      designationType: "",
      singleDesignation: "",
      isTextInputOpen: false,
      editInd:true
    });
  };
  handleDeleteDesignation = (id) => {
    this.props.removeDesignations(id);
    this.setState({ documentTypeName: "", singleDocument: "" });
  };
  handleUpdateDesignation = (designationType,designationTypeId,editInd, cb) => {
    this.props.updateDesignations(designationType,designationTypeId,editInd,  cb);
    this.setState({ designationType: "", singleDesignation: "",editInd:true });
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
    const { getDesignations,getDesignationCount,orgId } = this.props;
    console.log();
    getDesignations();
    getDesignationCount(orgId);
  }
  render() {
    const {
      fetchingDesignations,
      fetchingDesignationsError,
      designations,
      addingDesignations,
      updatingDesignations,
    } = this.props;
    const {
      isTextInputOpen,
      designationType,
      singleDesignation,
      linkedDesignations,
    } = this.state;
    if (fetchingDesignations) return <BundleLoader/>;
    if (fetchingDesignationsError) return <p>We are unable to load data</p>;
    return (
      <>
     <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
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
                  placeholder="Add Designation"
                  name="designationType"
                  value={designationType}
                  onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!designationType}
                  loading={addingDesignations}
                  onClick={this.handleAddDesignation}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="cancel"  onClick={this.toggleInput}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
               
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    loading={addingDesignations}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </div>
               
              </>
            )}
            </div>
        <div class=" flex flex-col" >
        <MainWrapper className="!h-[69vh] !mt-2" >
              {designations.length ? (
  designations
    .slice() 
    .sort((a, b) => a.designationType.localeCompare(b.designationType)) 
    .map((designation, i) => (
                    <SingleDesignation
                      key={i}
                      value={singleDesignation}
                      name="singleDesignation"
                      designation={designation}
                      linkedDesignations={linkedDesignations}
                      updatingDesignations={updatingDesignations}
                      handleChange={this.handleChange}
                      handleUpdateDesignation={this.handleUpdateDesignation}
                       handleDeleteDesignation={this.handleDeleteDesignation}
                    />
                    ))
                    ) : (
                      <p>No Data Available</p>
                    )}
              </MainWrapper>
            </div>
          
          </MainWrapper>
    
        
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.designations && this.props.designations.length && this.props.designations[0].updationDate).format('YYYY-MM-DD')} by {this.props.designations && this.props.designations.length && this.props.designations[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ designations,auth }) => ({
  addingDesignations: designations.addingDesignations,
  addingDesignationsError: designations.addingDesignationsError,
  designations: designations.designations,
  orgId: auth.userDetails.organizationId,
  removingDesignations: designations.removingDesignations,
  removingDesignationsError: designations.removingDesignationsError,
     updatingDesignations: designations.updatingDesignations,
     updatingDesignationsError: designations.updatingDesignationsError,
  fetchingDesignations: designations.fetchingDesignations,
  fetchingDesignationsError: designations.fetchingDesignationsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDesignations,
      getDesignationCount,
      addDesignations,
       updateDesignations,
       searchDesignationName,
       removeDesignations,
       ClearReducerDataOfDesignation
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Designation);
