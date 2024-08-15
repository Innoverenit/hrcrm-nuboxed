import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyledPopconfirm} from "../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import AddRepositoryDocumentDrawerModal from "./AddRepositoryDocumentDrawerModal"
import { getRepositoryDocuments ,setEditRepositoryList,deleteOrgDocata,LinkOrgDocPublish,LinkOrgDocPrivate,handleRepositoryDocumentDrawerModal} from "../Auth/AuthAction";
import { base_url } from "../../Config/Auth";
import {  Button,Avatar,Tooltip} from "antd";
import DownloadIcon from "@mui/icons-material/Download";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getDepartments } from "../../Containers/Settings/Department/DepartmentAction";
import { BundleLoader } from '../../Components/Placeholder';

class OrganizationDocumentList extends Component {
    constructor(props) {
        super(props);
        this.formRef = null;
        this.state = {
          
          fields: {},
          activeKey: "0",
          editedIndex: -1,
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
          data: [],
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
    this.props.getDepartments();
    this.setState({ data: this.props.repositoryData });
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

handleEdit = (index, field, value) => {
  const newData = [...this.state.data];
  newData[index][field] = value;
  this.setState({ data: newData });
};

saveChanges = () => {
  // this.setState({ editedIndex: -1 });
  const { repositoryData } = this.props;
  const { editedIndex, fields } = this.state;
  const editedItem = repositoryData[editedIndex];

  console.log("Changes made:");
  console.log("Before:", editedItem);

  const newData = repositoryData.map((item, index) => {
    if (index === editedIndex) {
      return { ...item, ...fields }; // Merge edited fields into the item
    }
    return item;
  });

  console.log("After:", newData[editedIndex]);

  this.setState({ editedIndex: -1 });
};

  render() {
     console.log("karisma",this.state.currentProcessItem1)
    const{user,fetchingRepositoryDocuments}=this.props;
    if (fetchingRepositoryDocuments) return <BundleLoader/>;
//     return (
//     <>
//       <div className="overflow-y-auto h-[60vh] overflow-x-hidden">
       
//      <div className="flex flex-col justify-center flex-wrap w-full max-sm:justify-between max-sm:items-center">
//           {this.props.repositoryData.map((item,index) => (
//             <>
           
//             <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[3rem] 
//             text-[#444444] m-3 p-1 w-wk flex flex-col  "
            
//             key={item.id}>
             
//               <div className="flex flex-row justify-between w-wk max-sm:flex-col">
//                 <div className="flex">
//                   <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full max-sm:justify-between">
//                     <div className="text-sm  font-semibold font-poppins max-sm:hidden">
//                       Name
//                     </div>
//                     <div className="font-normal text-sm  font-poppins">
//                       {item.name}
//                       {/* {this.state.editedIndex === index ? (
//                 <input value={item.name} onChange={(e) => this.handleEdit(index, 'name', e.target.value)} />
//               ) : (
//                 item.name
//               )} */}
//                     </div>
//                   </div>
//                   <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
//                     <div className="text-sm  font-semibold font-poppins max-sm:hidden">
//                       Category
//                     </div>
//                     <div className="font-normal text-sm  font-poppins">
//                       {item.catagory}
//                       {/* {this.state.editedIndex === index ? (
//                 <select value={item.catagory} onChange={(e) => this.handleEdit(index, 'catagory', e.target.value)}>
//                   <option value="Document">Document</option>
//                   <option value="Spreadsheet">Spreadsheet</option>
//                   <option value="Presentation">Presentation</option>
//                   <option value="Image">Image</option>
                 
//                 </select>
//               ) : (
//                 item.catagory
//               )} */}
//                     </div>
//                   </div>
//                   <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
//                     <div className="text-sm  font-semibold font-poppins max-sm:hidden">
//                       Department
//                     </div>
//                     <div className="font-normal text-sm  font-poppins">
//                       {item.department}
//                       {/* {this.state.editedIndex === index ? (
//                 <select value={item.department} onChange={(e) => this.handleEdit(index, 'department', e.target.value)}>
                 
//                  {this.props.departments.map((item)=>{
//                   return(
//                     <option value={item.departmentId}>{item.departmentName}</option>
//                   )
//                  })}
                 
              
//                 </select>
//               ) : (
//                 item.department
//               )} */}
//                     </div>
//                   </div>
//                   <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
//                     <div className="text-sm  font-semibold font-poppins max-sm:hidden">
//                       Description
//                     </div>
//                     <div className="font-normal text-sm  font-poppins">
//                       {item.description}
//                       {/* {this.state.editedIndex === index ? (
//                 <input value={item.description} onChange={(e) => this.handleEdit(index, 'description', e.target.value)} />
//               ) : (
//                 item.description
//               )} */}
//                     </div>
//                   </div>
//                   <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
//                     <div className="text-sm  font-semibold font-poppins max-sm:hidden">
//                       Include
//                     </div>
//                     <div className="font-normal text-sm  font-poppins">
//                       {/* {item.description} */}
//                       <Avatar.Group
//                    maxCount={7}
//                   maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
//                 >
//                     {item.includeds &&
//                   item.includeds.map((candidate, i) => {
                    
//                     const data1 = candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : "None"
//                     return (
//                       <Tooltip title={candidate.empName} key={i}>
//                       <Avatar style={{ backgroundColor: "#f56a00" }}>
//                       {data1}
                    
//                     </Avatar>
//                     </Tooltip>
                     

                   
//                     );
//                   })}

//             </Avatar.Group>
//                     </div>
//                   </div>
//                   <div class="flex">
//                   <div className=" flex font-medium flex-col max-sm:flex-row w-full mt-1 max-sm:justify-between">
//                     <div className="text-sm  font-semibold font-poppins max-sm:hidden">
                 
//                     </div>
                 
//                   </div>
//                   <div className=" flex font-medium flex-col  max-sm:flex-row w-full mt-1 max-sm:justify-between">
//                   {(item.userId === "EMP16818052295222021" && item.shareInd === true && user.repositoryCreateInd ===true || user.role === "ADMIN") ? (
//                  <Button
//                  onClick={() => this.handlePrivateClick(item)}
//              >
//                  {item.publicInd ? "Private" : "Public"}
//              </Button>
//                       ):null} 
//                   </div>
//                   </div>
//                   <div>
//                         <StyledPopconfirm
//             title="Do you want to delete?"
//              onConfirm={() => this.props.deleteOrgDocata(item.documentId)}
//           >
//            {(user.repositoryCreateInd ===true || user.role === "ADMIN") && (
//             <DeleteOutlined
//             style={{
//               verticalAlign: "center",
//               marginLeft: "1rem",
//               fontSize:"1rem",
//               color: "red",
//             }}
//             />
//             )} 
//           </StyledPopconfirm>
//                         </div>
//                         <div>
//                         <a
//                 href={`${base_url}/document/${item.documentId}`}
//                 target="_self"
//               >
//             {/* {user.opportunityDeleteInd ===true && ( */}
//             <DownloadIcon
//               type="download"

//               className=" !text-base cursor-pointer"
//             />
//                 </a>
//             {/* )} */}
       
//                         </div>
//                         <div style={{ flex: 1 }}>
            
//                 <button 
//                 onClick={() => {
//                 this.props.setEditRepositoryList(item)
//                  this.props.handleRepositoryDocumentDrawerModal(true)
//                 }}
//                   >Edit</button>
              
//             </div>
//                 </div>
//               </div>
               
//             </div>
            
//                </>
//           ))}
       
//         </div>
//       </div>
      
//       <AddRepositoryDocumentDrawerModal
//  addDrawerRepositoryDocumentModal={this.props.addDrawerRepositoryDocumentModal}
//  handleRepositoryDocumentDrawerModal={this.props.handleRepositoryDocumentDrawerModal}
//     />
//     </>
//     );

return (
  <>
   
   <div className=' flex justify-center sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          <div className=" w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[6.1rem]">
          Name
          </div>
          <div className=" w-[9.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
          Category
          </div>
          <div className="w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.6rem] max-lg:w-[7.6rem]">
          Department
          </div>
          <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
          Description
          </div>
          <div className="w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.6rem] max-lg:w-[7.6rem]">
          Include
          </div>
          <div className="w-[4.3rem]"></div>
        </div>
        {/* <InfiniteScroll
          dataLength={filteredData.length} 
          height={"75vh"}
        > */}
        <div className=' overflow-auto h-[63vh]'>
            {this.props.repositoryData.map((item) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              //const countryCode = item.address[0].country_alpha2_code
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
             // console.log(countryCode)
              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  w-[8.2rem] max-xl:w-[9.2rem] max-lg:w-[7.8rem] max-sm:w-auto  ">                                  
                            <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                            {item.name}
                              {date === currentdate ? (
                                <span class="!text-icon font-bold text-[tomato]">
                                  New
                                </span>
                              ) : null}

                            </div>
                         
                       

                      </div>


                      <div className=" flex font-medium  w-[9.2rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                        {item.catagory}
                        </div>
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium  w-[10.5rem]    max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      

                      <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                      {item.department}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[9.5rem] max-xl:w-[14.5rem] max-lg:w-[8.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    

                      <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                      {item.description}

                      </div>
                    </div>


                    

                      <div className=" flex font-medium items-center justify-center  max-sm:flex-row  ">
                      <div className=" flex font-medium  w-[5.5rem] max-xl:w-[14.5rem] max-lg:w-[8.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                    {item.includeds &&
                  item.includeds.map((candidate, i) => {
                    
                    const data1 = candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : "None"
                    return (
                      <Tooltip title={candidate.empName} key={i}>
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                    </Tooltip>
                     

                   
                    );
                  })}

            </Avatar.Group>
            </div>
           
                 
                  <div className=" flex font-medium flex-col  max-sm:flex-row w-[5rem] mt-1 max-sm:justify-between">
                  {(item.userId === "EMP16818052295222021" && item.shareInd === true && user.repositoryCreateInd ===true || user.role === "ADMIN") ? (
                 <Button
                 onClick={() => this.handlePrivateClick(item)}
             >
                 {item.publicInd ? "Private" : "Public"}
             </Button>
                      ):null} 
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
                target="_self"
              >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DownloadIcon
              type="download"

              className=" !text-base cursor-pointer"
            />
                </a>
            {/* )} */}
       
                        </div>
                        <div style={{ flex: 1 }}>
            
                <button 
                onClick={() => {
                this.props.setEditRepositoryList(item)
                 this.props.handleRepositoryDocumentDrawerModal(true)
                }}
                  >Edit</button>
              
            </div>
                      </div>
                  
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
         </div>

        {/* </InfiniteScroll> */}
      </div>
    
    
    <AddRepositoryDocumentDrawerModal
 addDrawerRepositoryDocumentModal={this.props.addDrawerRepositoryDocumentModal}
  handleRepositoryDocumentDrawerModal={this.props.handleRepositoryDocumentDrawerModal}
     />
 
  </>
);

  }
}

const mapStateToProps = ({ location, auth,departments }) => ({
  repositoryData: auth.repositoryData,
  fetchingRepositoryDocuments:auth.fetchingRepositoryDocuments,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  addDrawerRepositoryDocumentModal:auth.addDrawerRepositoryDocumentModal,
  user: auth.userDetails,
  departments: departments.departments,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRepositoryDocuments,
      deleteOrgDocata,
      LinkOrgDocPublish,
      LinkOrgDocPrivate,
      setEditRepositoryList,
      getDepartments,
      handleRepositoryDocumentDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDocumentList);

