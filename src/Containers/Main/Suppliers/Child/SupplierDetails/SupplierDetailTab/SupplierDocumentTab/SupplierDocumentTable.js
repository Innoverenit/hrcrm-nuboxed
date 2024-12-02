// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import dayjs from "dayjs";
// import {
//   getSupplierDocument,
//   // deleteErpDocument
// } from "../../../../SuppliersAction";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
// import DescriptionIcon from '@mui/icons-material/Description';
// import ArticleIcon from '@mui/icons-material/Article';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import { BundleLoader } from "../../../../../../../Components/Placeholder";
// import EmptyPage from "../../../../../EmptyPage";
// class SupplierDocumentTable extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       translatedMenuItems: [],
//       loading: true
//     };
//   }
//   componentDidMount() {
//     this.props.getCustomerData(this.props.userId);
//     this.props.getDepartments();
    
//   }
//   componentDidMount() {
//     this.fetchMenuTranslations();
//     this.props.getSupplierDocument(this.props.supplier.supplierId);
//   }
//   async fetchMenuTranslations() {
//     try {
//       this.setState({ loading: true });
//       const itemsToTranslate = [
//        '74', // 0Date
// '110', // 1 Name
// '147', // 2 Description
// '1207', // 3Uploaded By


//       ];
//       const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
//       this.setState({ translatedMenuItems: translations ,loading: false});
     
//     } catch (error) {
//       this.setState({ loading: false });
//       console.error('Error translating menu items:', error);
//     }
//   }

//   render() {
//     const {
//       documentsBySupplierId,
//       documentsByDistributorId,
//       fetchingDocumentsBySupplierId,
//       fetchingDocumentsBySupplierIdError,
//     } = this.props;
//     if (fetchingDocumentsBySupplierId) {
//       return <BundleLoader />;
//     }
//     const {loading,translatedMenuItems } = this.state;
//     if (loading) {
//       return <div><BundleLoader/></div>;
//     } 
//     return (
//       <>
//        <div className="flex justify-end sticky  z-auto">
//           <div className="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
//             <div className="flex max-sm:hidden justify-between w-[100%]  p-2 bg-transparent font-bold sticky items-end top-0 z-10">
//               <div className="md:w-[0.5rem]"></div>
//               <div className="max-md:w-[7.4rem] truncate w-[7.4rem] text-[#00A2E8] text-base font-poppins font-bold"><DateRangeIcon className='!text-icon  '  /> {translatedMenuItems[0]} 
//               {/* Date */}
//               </div>
//               <div className="max-md:w-[5.1rem] truncate w-[5.1rem] font-poppins font-bold text-xs"><ArticleIcon className='!text-icon text-[#a379c9] '  /> {translatedMenuItems[1]} 
//               {/* Name */}
//               </div>
//               <div className="max-md:w-[8.8rem] truncate w-[8.8rem] font-poppins font-bold text-xs">  <DescriptionIcon className='!text-icon text-[#9ad5ca] '  /> {translatedMenuItems[2]} 
//                {/* Description */}
//               </div>
//               <div className="max-md:w-[8.8rem] truncate w-[8.8rem] font-poppins font-bold text-xs"><AccountCircleIcon className="!text-icon  text-[#f28482]"/>  {translatedMenuItems[3]} 
//                {/* Uploaded By */}
//               </div>
//             </div>
//             <div className="overflow-x-auto h-[64vh]">
//               {documentsBySupplierId.length > 0 ? (
//                 documentsBySupplierId.map((item) => (
//                   <div key={item.id}>
//                     <div className="flex rounded mt-1 bg-white py-ygap  items-center max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
//                       <div className="flex w-3/4 ">
//                         <div className="flex border-l-2 h-8 border-green-500 bg-[#eef2f9] max-md:w-[1.56rem] w-[1.56rem] max-sm:w-full">
//                           {dayjs(item.creationDate).format("ll")}
//                         </div>
//                         <div className="flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[7.4rem] w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
//                           <div className="text-xs ml-gap font-poppins text-center">
//                             {item.contactDocumentName}
//                           </div>
//                         </div>
//                         <div className="flex  items-center  h-8 ml-gap bg-[#eef2f9] max-md:w-[6.2rem] w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
//                           <div className="text-xs ml-gap  font-poppins text-center">
//                             {item.description}
//                           </div>
//                         </div>
//                         <div className="flex items-center h-8 ml-gap bg-[#eef2f9] max-md:w-[6.2rem] w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
//                           <div className="text-xs  font-poppins text-center">
//                             {item.uploadedBy}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center p-5">
//                   <EmptyPage />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* {true && (
//           <StyledTable
//             // rowSelection={rowSelection}
//             pagination={{ pageSize: 50 }}
//             scroll={{ y: 280 }}
//             expandedRowRender={(record) => {
//               //debugger;
//               // return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
//             }}
//             rowKey="CustomerId"
//             columns={columns}
//             dataSource={this.props.documentsBySupplierId}
//             Loading={
//               fetchingDocumentsBySupplierId ||
//               fetchingDocumentsBySupplierIdError
//             }
//           />
//         )} */}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ suppliers }) => ({
//   suppliers: suppliers.suppliers,
//   fetchingDocumentsBySupplierId: suppliers.fetchingDocumentsBySupplierId,
//   fetchingDocumentsBySupplierIdError:
//     suppliers.fetchingDocumentsBySupplierIdError,
//   documentsBySupplierId: suppliers.documentsBySupplierId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getSupplierDocument,
//       //   deleteErpDocument,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SupplierDocumentTable);


import React, { useState, useEffect, useRef,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Highlighter from "react-highlight-words";
import {
  Tooltip,
  Button,
  Input,
  Popconfirm
} from "antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../../Components/UI/Elements";
import {
  getSupplierDocument,
  deleteErpDocument,
  getErpDocumentCount,
  updateErpDocument
} from "../../../../SuppliersAction";
import dayjs from "dayjs";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import GavelIcon from '@mui/icons-material/Gavel';
import { base_url2 } from "../../../../../../../Config/Auth";
import ContractErpToggle from "./ContractErpToggle";
import EmptyPage from "../../../../../EmptyPage";
import { elipsize } from "../../../../../../../Helpers/Function/Functions";


const SupplierDocumentTable = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);
  const [isEditingName, setIsEditingName] = useState(null);
  const [nameInput, setnameInput] = useState();
  const [isDescVisible, setIsDescVisible] = useState(null);
    const [descType, setDescType] = useState();

  useEffect(() => {
    props.getSupplierDocument(props.uniqueId,props.type);
    props.getErpDocumentCount(props.uniqueId,props.type);
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "74" ,  // "Date",//0
           "110" , // "Name",//1
           "147" ,   // "Description",//2
           "1207" ,   // "Uploaded By",//3
          "1208" , // "File Name",//4
          "1205" , // "Contract",//5
          "1305" ,  // Search  6
           "1307" ,   // Reset 7   
          "100" ,  // New8
           "1351" , // "Download"9
           "1259" ,  // Do you want to delete?10
            "84" , // "Delete"11
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
 
  const handleUpdateName = (documentId) => {
    const updatedName = {
      documentTitle:nameInput,
    };
    props.updateErpDocument(updatedName,documentId);
    setIsEditingName(null); // Close the input box after updating
  };


  const handleDescChange = (documentId) => {
    const updatedPayload = {
      documentDescription:descType // Use the selected country ID
    };
  
    props.updateErpDocument(updatedPayload,documentId);
    setIsDescVisible(null); // Hide the dropdown after the request
  };




  const {
    documentsBySupplierId,
    fetchingdocumentsBySupplierId,
    fetchingdocumentsBySupplierIdError,
    deleteErpDocument,
  } = props;


    if (loading || fetchingdocumentsBySupplierId) {
      return <BundleLoader />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <div class="rounded m-1 p-1 w-[100%]  ">
          <div className=" flex justify-between w-[100%]  p-1 sticky font-bold font-poppins !text-lm items-end z-10">
          
        <div className=" text-[#00A2E8] truncate w-[10.8rem] text-sm max-md:w-[16.1rem]">
        <DateRangeIcon className='!text-icon  '  />  {translatedMenuItems[0]}</div>
        {/* Date */}
                <div className=" w-[15.2rem] truncate max-md:w-[16.2rem]">
                <ArticleIcon className='!text-icon mr-1 text-[#a379c9] '  />{translatedMenuItems[1]}</div>
                {/* Name */}
        <div className=" w-[15.4rem] truncate max-md:w-[13.13rem]">
        <DescriptionIcon className='!text-icon text-[#9ad5ca] '  /> {translatedMenuItems[2]}</div>
       
        <div className=" w-[10.7rem] truncate max-md:w-[15.1rem]">
        <AccountCircleIcon className="!text-icon  text-[#f28482]"/> {translatedMenuItems[3]}</div>
     
        <div className=" w-[14.2rem] truncate max-md:w-[12.2rem]">
        <  FileOpenIcon className='!text-icon text-[#7fb800] '  />  {translatedMenuItems[4]}</div>
          {/* fileName */}
        
                     <div className=" w-[9.5rem] truncate max-md:w-[9.5rem]">
                     <  GavelIcon className='!text-icon text-[red] '  />        {translatedMenuItems[5]}</div>
                     {/* Contract */}
        
        
      </div>
   
        
      { !fetchingdocumentsBySupplierId && documentsBySupplierId.length === 0 ?<EmptyPage className=" overflow-hidden"/>: documentsBySupplierId.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        
                    return (
                      <div>
                       <div
                className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:h-[9.1rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                               
                          <div className=" flex w-[9rem] maax-md:w-[9rem] h-8 border-l-2 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
<div className="flex  items-center"> 

    <div class="">
    <Tooltip>
                                          <div class=" flex  justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="flex text-xs ml-gap items-center   font-poppins   cursor-pointer">
                                                
                                            <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                  </div>
                                  </div>
                          </div>
                          <div class="flex">

                       
                          <div className=" flex w-[12.3rem] max-md:w-[12.3rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                             
                              <div class="flex text-xs ml-gap items-center  font-poppins">
                                 
         {isEditingName === item.documentId ? (
        <input
          type="text"
          className="h-7 w-[4rem] text-sm"
          value={nameInput}
          onChange={(e) => setnameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUpdateName(item.documentId)}
          onBlur={() => handleUpdateName(item.documentId)}
          autoFocus // Focus the input automatically when editing
        />
      ) : (
        <div onClick={() => {
          setIsEditingName(item.documentId); // Enable editing mode
            setnameInput(item.documentTitle); // Set the initial value from the batchNo of the item
          }} className="cursor-pointer text-sm font-[Poppins]">
            {item.documentTitle || "Enter Name"}
            
            </div> // Click to enter edit mode
      )}
                                   &nbsp;&nbsp;
        {date === currentdate ? (
    <span class="text-xs text-[tomato] font-bold"
    >
             {translatedMenuItems[8]}{/* New */}
          </span>
        ) : null} 
                              </div>
                          </div>
                          <div className=" flex w-[12.4rem]  max-md:w-[12.4rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row  max-sm:justify-between">
                          
                            <div class="text-xs  font-poppins">
         {isDescVisible === item.documentId ? (
        <textarea
          type="text"
          className="h-7 w-[4rem] text-sm"
          value={descType}
          onChange={(e) => setDescType(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleDescChange(item.documentId)}
          onBlur={() => handleDescChange(item.documentId)}
          autoFocus 
        />
      ) : (
        <div onClick={() => {
          setIsDescVisible(item.documentId); 
          setDescType(item.documentDescription); 
          }} className="cursor-pointer text-sm font-[Poppins]">
            {elipsize(item.documentDescription || "", 15) || "Enter Desc"}
            
            </div> 
      )}
                            </div>
                        </div>
                        </div>
                        <div className="flex  w-[9.1rem] max-md:w-[9.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">

<div className="text-xs  font-poppins text-center">
<div className="font-normal text-xs font-poppins">
                     <Tooltip title={item.uploadedBy}>
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.uploadedBy}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </SubTitle>
          </Tooltip>
                     </div>
</div>
</div>
<div className=" flex w-[12.1rem]  max-md:w-[12.1rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                              <div class="flex text-xs truncate ml-gap items-center font-poppins text-center">
                              {item.fileName}

                              </div>
                          </div>
                          <div className=" flex w-[5.22rem]  max-md:w-[5.22rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                              <div class=" text-xs  font-poppins text-center">
                              <ContractErpToggle
          contractInd={item.contractInd}
          documentId={item.documentId}
        />

                              </div>
                          </div>
                       
                              

                              <div class="flex items-center justify-center h-8 bg-[#eef2f9]">
                              <a
            href={`${base_url2}/document/${item.documentId}`}
            // target="_blank"
          > <Tooltip title= {translatedMenuItems[9]}>
            <DownloadIcon
            className="cursor-pointer !text-icon"
            /></Tooltip>
          </a>  
                 </div>
                 <div class="flex items-center justify-center h-8 bg-[#eef2f9]">
            
          <Popconfirm
                        title= {translatedMenuItems[10]}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteErpDocument(item.documentId,props.type)}
                      >
                         <Tooltip title= {translatedMenuItems[11]}>
      
                         <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
            </Tooltip>
          </Popconfirm>
            </div>
                         
                      </div>
                  </div>
)
                })}
                    
      </div>
      </>
    )
  };


const mapStateToProps = ({ suppliers }) => ({
  suppliers: suppliers.suppliers,
  fetchingDocumentsBySupplierId: suppliers.fetchingDocumentsBySupplierId,
  fetchingDocumentsBySupplierIdError:
    suppliers.fetchingDocumentsBySupplierIdError,
  documentsBySupplierId: suppliers.documentsBySupplierId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplierDocument,
      deleteErpDocument,
      getErpDocumentCount,
      updateErpDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDocumentTable);



