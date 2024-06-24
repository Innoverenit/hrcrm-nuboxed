import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import InfoIcon from '@mui/icons-material/Info';
import {
  MultiAvatar,
} from "../../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  SearchOutlined,
} from "@ant-design/icons";
import { CurrencySymbol } from "../../../../../../Components/Common";
import { getOpportunityListByCustomerId,handleUpdateCustomerOpportunityModal,
  setEditCustomerOpportunity} from "../../../../CustomerAction";
import { Tooltip,Button,Input,Progress } from "antd";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const AddCustomerUpdateOpportunityModal =lazy(()=>import("./AddCustomerUpdateOpportunityModal")); 


function OpportunityTable(props) {
  useEffect(() => {
    props.getOpportunityListByCustomerId(props.customerId);
  }, []);
  console.log(props.customerId);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            // icon="search"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  
  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
  const {
    customer: { customerId, name },
    user,
    handleUpdateCustomerOpportunityModal,
    fetchingCustomerOpportunity,
    opportunityByCustomerId,
    fetchingCustomerOpportunityError,
    addUpdateCustomerOpportunityModal,
    setEditCustomerOpportunity,
  } = props;
//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },
//     // {
//     //   title: "",
//     //   dataIndex: "imageId",
//     //   width: "3%",
//     //   render: (name, item, i) => {
//     //     return (
//     //       <SubTitle>
//     //         <MultiAvatar
//     //           primaryTitle={item.accountName}
//     //           imageId={item.imageId}
//     //           imageURL={item.imageURL}
//     //           imgWidth={"1.8em"}
//     //           imgHeight={"1.8em"}
//     //         />
//     //       </SubTitle>
//     //     );
//     //   },
//     // },
//     {
//       title: "",
//       width: "1%",
//     },
//     { title: "Name",
//        dataIndex:"opportunityName",
//        width:"25%",
//        ...getColumnSearchProps('opportunityName'),
//        render(name, item, ) {
//         return (
//           <>
//            <Link
//               toUrl={`/opportunity/${item.opportunityId}`}
//               title={`${item.opportunityName || ""} `}
//             />
//           </>
//         );
//       }
//    },
//     {
//       //title: "Start Date",
//       title: (
//         <FormattedMessage id="app.startDate" defaultMessage="Start Date" />
//       ),
//       dataIndex: "startDate",
//       width: "20%",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => {
//         var startDateA = a.startDate; // ignore upper and lowercase
//         var startDateB = b.startDate; // ignore upper and lowercase
//         if (startDateA < startDateB) {
//           return -1;
//         }
//         if (startDateA > startDateB) {
//           return 1;
//         }

//         return 0;
//       },
//       render: (text, item) => {
//         const startDate = dayjs(item.startDate).format("ll");
//         return <span>{startDate}</span>;
//       },
//     },
//     {
//       //title: "End Date",
//       title: <FormattedMessage id="app.endDate" defaultMessage="End Date" />,
//       dataIndex: "endDate",
//       width: "20%",
//       defaultSortOrder: "descend",
//       render: (text, item) => {
//         const endDate = dayjs(item.endDate).format("ll");
//         return <span>{endDate}</span>;
//       },
//       sorter: (a, b) => {
//         var endDateA = a.endDate; // ignore upper and lowercase
//         var endDateB = b.endDate; // ignore upper and lowercase
//         if (endDateA < endDateB) {
//           return -1;
//         }
//         if (endDateA > endDateB) {
//           return 1;
//         }

//         return 0;
//       },
//     },
//     {
//       //title: "Value",
//       title: (
//         <FormattedMessage
//           id="app.proposalAmount"
//           defaultMessage="Value"
//         />
//       ),
//       dataIndex: "proposalAmount",
//       width: "20%",
//       onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
//       render: (name, item, i) => {        
//         return (
//           <>
//             {/* {item.proposalAmount} {item.currency} */}
//             <span>
//             <CurrencySymbol currencyType={item.currency} />
//             &nbsp;&nbsp;{item.proposalAmount}
//           </span>
//           </>
//         );
//       },
//     },
// {
// title:(
//   <FormattedMessage
//     id="app.status"
//     defaultMessage="Status"
//   />
// ),
// render: (name, item, i) => {
//   var findProbability = item.probability;
//   item.stageList.forEach((element) => {
//     if (element.oppStage === item.oppStage) {
//       findProbability = element.probability;}
//    });
//   return (
//     <>
//     <Tooltip title={item.oppStage}>
// {" "}
// <Progress
// type="circle"
// style={{ cursor: "pointer",color:"red" }}
// percent={findProbability}
// //disable={true}
// width={30}
//  strokeColor={"#005075"}

// />
  
// </Tooltip>

//     </>
//   );
// },
// dataIndex: "status",
// width: "7%",
// },

//     {
//       //title: "sponsor",
//       title: (
//         <FormattedMessage
//           id="app.sponsor"
//           defaultMessage="Sponsor"
//         />
//       ),
//       dataIndex: "contactName",
//       width: "10%",
//       onFilter: (value, record) => record.contactName.indexOf(value) === 0,
//       render: (name, item, i) => {        
//         return (
//           <>
//             {item.contactName} 
//           </>
//         );
//       },
//       render: (name, item, i) => {
//         return (
//           <>
//             <Tooltip title={item.contactName}>
//               <span>
//                 <MultiAvatar
//                   primaryTitle={item.contactName}
//                   imageId={item.imageId}
//                   imageURL={item.imageURL}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
//               </span>
//             </Tooltip>

//           </>
//         );
//       },
//     },
//     {
//       title: "",
//       // dataIndex: "documentId",
//       width:"2%",
//       render: (name, item, i) => {
//         return (
//           <Tooltip title={item.description}>
           
//           <InfoIcon 
          
//               // type="edit"
//               style={{ cursor: "pointer",fontSize:"1rem" }}
             
//             />
          
//           </Tooltip>
//         );
//       },
//     },
//     {
//       title: "",
//       width: "1%",
//     },
//     {

//       title: "",
//       dataIndex: "documentId",
//       width:"2%",
//       render: (name, item, i) => {
//         return (
//           <Tooltip title="Edit">
//              {user.opportunityUpdateInd ===true && (
//           <BorderColorIcon 
          
//               type="edit"
//               style={{ cursor: "pointer",fontSize:"0.8rem" }}
//               onClick={() => {
//                 props.setEditCustomerOpportunity(item);
//                 handleUpdateCustomerOpportunityModal(true);
//                 handleSetCurrentOpportunityId(item.opportunityId)
                
//               }}
//             />
//             )}
//           </Tooltip>
//         );
//       },
//     },
//     {
//       title: "",
//       width: "1%",
//     },
//   ];
if (fetchingCustomerOpportunity) return <BundleLoader/>;
  const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
    <div className=' flex  sticky z-auto'>
    <div class="rounded m-1 p-1 w-[99%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[16rem]">Name</div>
        <div className=" md:w-[5.1rem]">Start Date</div>
        <div className=" md:w-[6.21rem] ">End Date</div>
        <div className="md:w-[4.2rem]">Value</div>
        <div className="md:w-[5.51rem]">Status</div>
        <div className="md:w-[1.8rem]">Sponsor</div> 
        <div className="w-[7rem]"></div>

      </div>

      { !fetchingCustomerOpportunity && opportunityByCustomerId.length === 0 ?<NodataFoundPage />:opportunityByCustomerId.map((item,index) =>  {
              var findProbability = item.probability;
              item.stageList.forEach((element) => {
                if (element.oppStage === item.oppStage) {
                  findProbability = element.probability;}
               });
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");

          const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
               <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                <div class="flex ">
                <div className=" flex font-medium flex-col md:w-[15.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
          &nbsp;
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col ">
                                          
                                            <div class="text-sm flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>                                     
         {/* <Link
          toUrl={`/opportunity/${item.opportunityId}`}
          title={`${item.opportunityName || ""} `}
        >{item.opportunityName}</Link> */}
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs mt-[0.4rem]"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null}
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between ">
         
                    <div class=" text-xs  font-poppins">
                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                 
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <div class=" text-xs  font-poppins">
         {dayjs(item.endDate).format("DD/MM/YYYY")}
           {/* {item.endDate} */}
      
         </div>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium justify-center flex-col  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
                    <div class=" text-xs  font-poppins">
                    <span>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;&nbsp;{item.proposalAmount}
          </span>
                 
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col  md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <div class=" text-xs  font-poppins">
         <Tooltip title={item.oppStage}>
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={findProbability}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
  
</Tooltip>
      
         </div>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-14 max-sm:flex-row w-full max-sm:justify-between ">
         
                    <div class=" text-xs  font-poppins">
                    <Tooltip title={item.contactName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.contactName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </span>
            </Tooltip>
                 
                    </div>
                  </div>
      
                </div>
              
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                      <Tooltip title={item.description}>
           
          <InfoIcon  // type="edit"
             className=" !text-icon cursor-pointer text-blue-600  "
              />
          </Tooltip>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[2rem]  max-sm:flex-row w-full max-sm:justify-between">
                  <Tooltip title="Edit">
             {user.opportunityUpdateInd ===true && (
          <BorderColorIcon 
          className=" !text-icon cursor-pointer text-[tomato]"
              onClick={() => {
                props.setEditCustomerOpportunity(item);
                handleUpdateCustomerOpportunityModal(true);
                handleSetCurrentOpportunityId(item.opportunityId)
                
              }}
            />
            )}
          </Tooltip>
                  </div>
                
             
               
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <AddCustomerUpdateOpportunityModal
      opportunityId={currentOpportunityId}
      defaultCustomers={[{ label: name, value: customerId }]}
      customerId={{ value: customerId }}
       addUpdateCustomerOpportunityModal={addUpdateCustomerOpportunityModal}
        handleUpdateCustomerOpportunityModal={handleUpdateCustomerOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        
      />
    </>
  );
}
// }
const mapStateToProps = ({ customer,auth }) => ({
  user: auth.userDetails,
  fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
  fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
  customerId: customer.customer.customerId,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByCustomerId,
      handleUpdateCustomerOpportunityModal,
      setEditCustomerOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
