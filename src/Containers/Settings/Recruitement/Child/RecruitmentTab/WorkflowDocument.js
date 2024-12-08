import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button,Input } from "antd";
import { MainWrapper} from "../../../../../Components/UI/Layout";
import {
  removeDocuments,
  updateDocuments,
  searchDocumentsName,
} from "../../../../Settings/Documents/DocumentsAction";
const WorkflowSingleDocument = lazy(() => import( "./WorkflowSingleDocument"));

class WorkflowDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDocuments: [],
      isTextInputOpen: false,
      addingDocument: false,
      documentTypeName: "",
      singleDocument: "",
      editInd:true,
      currentData: "",
      processId: this.props.processId,
    };
  }
  handleClear = () => {
    // this.setState({ currentData: "" });
    // this.props.getAllDocumentsType(this.props.processId);
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
 
  handleUpdateDocument = (documentTypeName,documentTypeId,editInd, cb) => {
    this.props.updateDocuments(documentTypeName, documentTypeId,editInd,cb);
    this.setState({ documentTypeName: "", singleDocument: "",editInd:true,});
  };
 
  componentDidMount() {

  }
  render() {
    const {
      fetchingAllDocuments,
      fetchingAllDocumentsError,
      allDocuments,
      addingDocuments,
      updatingDocuments,
    } = this.props;
    const {
      isTextInputOpen,
      documentTypeName,
      singleDocument,
      linkedDocuments,
    } = this.state;
    if (fetchingAllDocuments) return <p>Loading ...</p>;
    if (fetchingAllDocumentsError) return <p>Error ...</p>;
    return (
      <>
     <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div style={ {width: "18vw",display:"flex"}} >
          <Input
            placeholder="Search by Name"
            width={"100%"}
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.props.searchDocumentsName(this.state.currentData);

          }}
        >
          Submit
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
      Clear
      
        </Button>
        </div>
        <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <Suspense fallback={"Loading..."}>
              <MainWrapper style={{ height: "30em", marginTop: "0.62em" }}>
                {allDocuments.length &&
                  allDocuments.map((document, i) => (
                    
                    <WorkflowSingleDocument
                      key={i}
                      value={singleDocument}
                      name="singleDocument"
                      document={document}
                      linkedDocuments={linkedDocuments}
                      updatingDocuments={updatingDocuments}
                      handleChange={this.handleChange}
                      handleUpdateDocument={this.handleUpdateDocument}
                      handleDeleteDocument={this.handleDeleteDocument}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                    />
                  ))}
              </MainWrapper>
              </Suspense>
            </div>
           
          </MainWrapper>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ document }) => ({
  addingDocuments: document.addingDocuments,
  addingDocumentsError: document.addingDocumentsError,
  allDocuments: document.allDocuments,
  removingDocuments: document.removingDocuments,
  removingDocumentsError: document.removingDocumentsError,
    updatingDocuments: document.updatingDocuments,
    updatingDocumentsError: document.updatingDocumentsError,
    fetchingAllDocuments: document.fetchingAllDocuments,
    fetchingAllDocumentsError: document.fetchingAllDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeDocuments,
      updateDocuments,
      searchDocumentsName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDocument);
