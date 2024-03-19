import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { Button,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import {
  getDocuments,
  getDocumentCount,
  addDocuments,
  removeDocuments,
  updateDocuments,
  searchDocumentsName,
  ClearReducerDataOfDocument
} from "./DocumentsAction";
const SingleDocuments = lazy(() =>
  import("./Child/SingleDocuments")
);

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDocuments: [],
      isTextInputOpen: false,
      addingDocument: false,
      documentTypeName: "",
      singleDocument: "",
      editInd:true,
      currentData: ""
    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getDocuments();
      this.props.ClearReducerDataOfDocument();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchDocumentsName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getDocuments();
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
  handleAddDocument = () => {
    const { addDocuments, documents } = this.props;
    const { documentTypeName, addingDocuments, isTextInputOpen,editInd} = this.state;
    let document = { documentTypeName,editInd };

    let exist =
      documents &&
      documents.some((element) => element.documentTypeName == documentTypeName);

    // if (exist) {
    //   message.error(
    //     "Can't create as another documentTypeName exists with same name!"
    //   );
    // } else {
      addDocuments(document, () => console.log("add document callback"));
    // }

    this.setState({
      documentTypeName: "",
      singleDocument: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleUpdateDocument = (documentTypeName,documentTypeId,editInd, cb) => {
    this.props.updateDocuments(documentTypeName, documentTypeId,editInd,cb);
    this.setState({ documentTypeName: "", singleDocument: "",editInd:true,});
  };
  handleDeleteDocument = (documentTypeId={documentTypeId}) => {
    this.props.removeDocuments(documentTypeId);
    this.setState({ documentTypeName: "", singleDocument: "" });
  };
  componentDidMount() {
    const { getDocuments,getDocumentCount,orgId } = this.props;
    console.log();
    getDocuments(getDocuments);
    getDocumentCount(orgId)
  }
  render() {
    const {
      fetchingDocuments,
      fetchingDocumentsError,
      documents,
      addingDocuments,
      updatingDocuments,
    } = this.props;
    const {
      isTextInputOpen,
      documentTypeName,
      singleDocument,
      linkedDocuments,
    } = this.state;
    if (fetchingDocuments) return <BundleLoader/>;
    if (fetchingDocumentsError) return <p>Error ...</p>;
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
                  placeholder="Add Document"
                  name="documentTypeName"
                  value={documentTypeName}
                  onChange={this.handleChange}
                  width="55%"
                />
                &nbsp;
                <Button
                  type="primary"
                  disabled={!documentTypeName}
                  htmlType="submit"
                  Loading={addingDocuments}
                  onClick={this.handleAddDocument}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                  
                </Button>
                &nbsp;
                <Button type="cancel"  onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
              </div>
            ) : (
              <>
               
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    Loading={addingDocuments}
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
              {documents.length ? (
  documents
    .slice() 
    .sort((a, b) => a.documentTypeName.localeCompare(b.documentTypeName)) 
    .map((document, i) => (
                    <SingleDocuments
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
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </div>
         
          </MainWrapper>
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.documents && this.props.documents.length && this.props.documents[0].updationDate).format('YYYY-MM-DD')} by {this.props.documents && this.props.documents.length && this.props.documents[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ document ,auth}) => ({
  addingDocuments: document.addingDocuments,
  addingDocumentsError: document.addingDocumentsError,
  documents: document.documents,
  documentCount:document.documentCount,
  orgId: auth.userDetails.organizationId,
  removingDocuments: document.removingDocuments,
  removingDocumentsError: document.removingDocumentsError,
    updatingDocuments: document.updatingDocuments,
    updatingDocumentsError: document.updatingDocumentsError,
  fetchingDocuments: document.fetchingDocuments,
  fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocuments,
      getDocumentCount,
      addDocuments,
      removeDocuments,
      updateDocuments,
      ClearReducerDataOfDocument,
      searchDocumentsName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Documents);
