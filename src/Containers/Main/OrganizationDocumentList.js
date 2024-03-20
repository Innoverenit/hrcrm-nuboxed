import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyledPopconfirm} from "../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { getRepositoryDocuments ,deleteOrgDocata,LinkOrgDocPublish,LinkOrgDocPrivate} from "../Auth/AuthAction";
import { base_url } from "../../Config/Auth";
import {  Button} from "antd";
import DownloadIcon from "@mui/icons-material/Download";
import { DeleteOutlined } from "@ant-design/icons";
import { BundleLoader } from '../../Components/Placeholder';

class OrganizationDocumentList extends Component {
    constructor(props) {
        super(props);
        this.formRef = null;
        this.state = {
          fields: {},
          activeKey: "0",
          // viewAll:false,
          // setIsViewAll:false,
          change: true,
          isTextOpen:false,
          isTextInputOpen: false,
          addingStage: false,
          stageName: "",
          probability: null,
          days: null,
          visible: false,
          isViewAll: false,
          currentProcess: [],
          currentProcessItem:{},
          currentProcessItem1:{},
          currentStageId: "",
          currentStage: [],
          currentStageName: "",
          exist: false,
          responsible:"",
          isProcessTextInputOpen: false,
          workflowName: "",
          publish: false,
        };
      }
  componentDidMount() {
    this.props.getRepositoryDocuments(this.props.userId);
  }
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
       this.props.getRepositoryDocuments(this.props.userId);
      this.setState({ currentProcess: data });
    }
  };



  handlePublishClick = (item) => {
console.log(item)
this.setState({
  currentProcessItem:item
})

    const Id = item.organizationDocumentLinkId;
    let data = {
      organizationDocumentLinkId: Id,
      publishInd: item.publishInd ? false : true,
    };

     this.props.LinkOrgDocPublish(data, this.handleCallBack1);
  };

  handlePrivateClick = (item) => {
    console.log(item);
    this.setState({
      currentProcessItem1: item,
    });

    const organizationDocumentLinkId = item.organizationDocumentLinkId;

    let data = {
      organizationDocumentLinkId: organizationDocumentLinkId,
      publicInd: item.publicInd ? false : true,
    };

    this.props.LinkOrgDocPrivate(data, this.handleCallBack1);
};

  render() {
     console.log("karisma",this.state.currentProcessItem1)
    const{user,fetchingRepositoryDocuments}=this.props;
    if (fetchingRepositoryDocuments) return <BundleLoader/>;
    return (
      <div className="overflow-y-auto h-[60vh] overflow-x-hidden">
     <div className="flex flex-col justify-center flex-wrap w-full max-sm:justify-between max-sm:items-center">
          {this.props.repositoryData.map((item) => (
            <>
            {item.shareInd === true &&(
            <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[3rem] 
            text-[#444444] m-3 p-1 w-wk flex flex-col  "
            
            key={item.id}>
             
              <div className="flex flex-row justify-between w-wk max-sm:flex-col">
                <div className="flex">
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Name
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.name}
                    </div>
                  </div>
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Category
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.catagory}
                    </div>
                  </div>
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Department
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.department}
                    </div>
                  </div>
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Description
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.description}
                    </div>
                  </div>
                  <div class="flex">
                  <div className=" flex font-medium flex-col max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                 
                    </div>
                  {/* {(item.userId === "EMP16818052295222021" && item.shareInd === true && user.repositoryCreateInd ===true  || user.role === "ADMIN")  ? (
                      <Button
                        
                        onClick={() => {
                        
                          this.handlePublishClick(item);
                        }}
                      >
                       
                        {item.publishInd
                          ? "Unpublish"
                          : "Publish"}
                      </Button>
                    ):null}  */}
                  </div>
                  <div className=" flex font-medium flex-col  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                  {(item.userId === "EMP16818052295222021" && item.shareInd === true && user.repositoryCreateInd ===true || user.role === "ADMIN") ? (
                 <Button
                 onClick={() => this.handlePrivateClick(item)}
             >
                 {item.publicInd ? "Private" : "Public"}
             </Button>
                      ):null} 
                  </div>
                  </div>
                  <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
             onConfirm={() => this.props.deleteOrgDocata(item.documentId)}
          >
           {(user.repositoryCreateInd ===true || user.role === "ADMIN") && (
            <DeleteOutlined
            style={{
              verticalAlign: "center",
              marginLeft: "1rem",
              fontSize:"1rem",
              color: "red",
            }}
            />
            )} 
          </StyledPopconfirm>
                        </div>
                        <div>
                        <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DownloadIcon
              type="download"

              className=" !text-base cursor-pointer"
            />
                </a>
            {/* )} */}
       
                        </div>
                </div>
              </div>
               
            </div>
            )}
               </>
          ))}
       
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ location, auth }) => ({
  repositoryData: auth.repositoryData,
  fetchingRepositoryDocuments:auth.fetchingRepositoryDocuments,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRepositoryDocuments,
      deleteOrgDocata,
      LinkOrgDocPublish,
      LinkOrgDocPrivate
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDocumentList);

