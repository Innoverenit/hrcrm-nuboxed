import React, { useEffect, useState ,Suspense,lazy} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchIcon from '@mui/icons-material/Search';
import { getCustomerTask } from "../../../Containers/Task/TaskAction"
import { Tooltip, Button, Input, Space } from "antd";
import Highlighter from 'react-highlight-words';
import "jspdf-autotable";
import { getDesignationWiseBilling } from "../BillingAction";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ContactsIcon from '@mui/icons-material/Contacts';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import EmptyPage from '../../../Containers/Main/EmptyPage';
const BundleLoader = lazy(() => import("../../../Components/Placeholder"));

function BillingListTable(props) {
   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "1153",//Talent
          "248", // 'Customer', // 1
           "137", // 'project', // 2
   "1010",//Billing //3
    // "",// Billable Hour
    // "",//Actual Hour (Total)
    // "",//  Actual Amount (Total) 
    // "",// Projected Hour
    // "",// Projected Amount(Total)
    // "",//  Deviation Hour (Total)
    // "",// Deviation amount (Total)
    
  

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
  const type = props.departmentType === "Management" ? "Management" : props.departmentType === "Recruit" ? "RecruitWoner" : "SalesWoner";
  useEffect(() => {

    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    const { userId, startDate, endDate, organizationId } = props;
    if (props.departmentType === "Management") {
      props.getDesignationWiseBilling(organizationId, startDate, endDate, type);
      props.getCustomerTask(props.orgId);
    } else {
      props.getDesignationWiseBilling(userId, startDate, endDate, type);
      props.getCustomerTask(props.orgId);
    }

  }, [props.userId, props.endDate,props.startDate, type])

  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters, b
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchIcon />}
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
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchIcon style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
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
  const customerlistType = props.customerTaskList.map((item) => {
    return {
      text: item.name || "",
      value: item.name,
    };
  });



  // const columns = [
  //   {
  //     title: "",
  //     //dataIndex: "logo",
  //     width: "2%",
  //   },
  //   {
  //     title: "",
  //     dataIndex: "candidateName",
  //     width: "10%",
  //   },
  //   {
  //     title: "Customer",
  //     dataIndex: "customerName",
  //     width: "10%",
  //     filters: customerlistType,
  //     onFilter: (value, record) => {
  //       return record.customerName === value;
  //     },
  //     render: (name, item, i) => {
  //       return (
  //         <>
  //           <Tooltip title={item.customerName}>
  //             <span>
  //               <MultiAvatar
  //                 primaryTitle={item.customerName}
  //                 // imageId={item.ownerImageId}
  //                 // imageURL={item.imageURL}
  //                 imgWidth={"2.1em"}
  //                 imgHeight={"2.1em"}
  //               />
  //             </span>
  //           </Tooltip>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     title: "Project",
  //     dataIndex: "projectName",
  //     width: "10%",
  //     render: (name, item, i) => {
  //       return (
  //         <>
  //           <Tooltip title={item.projectName}>
  //             <span>
  //               <MultiAvatar
  //                 primaryTitle={item.projectName}
  //                 imgWidth={"2.1em"}
  //                 imgHeight={"2.1em"}
  //               />
  //             </span>
  //           </Tooltip>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     title: "Billing",
  //     dataIndex: "billingAmount",
  //     render: (text, item) => {
  //       return (
  //         <>
  //           <span>
  //             <CurrencySymbol currencyType={item.billableCurency} />
  //             &nbsp;
  //             {`${Number(item.billingAmount).toFixed(2)}`}
  //           </span>
  //         </>
  //       )
  //     },
  //     width: "10%",
  //   },
  //   {
  //     title: "Billable Hour",
  //     dataIndex: "hour",
  //     width: "10%",
  //   },
  //   {
  //     title: "Actual Hour (Total)",
  //     dataIndex: "finalBillableHour",
  //     width: "10%",
  //   },
  //   {
  //     title: "Actual Amount (Total)",
  //     render: (text, item) => {
  //       return (
  //         <>
  //           <span>
  //             <CurrencySymbol currencyType={item.billableCurency} />
  //             &nbsp;
  //             {`${Number(item.finalBillableAmount).toFixed(2)} `}
  //           </span>
  //         </>
  //       )
  //     },
  //     dataIndex: "finalBillableAmount",
  //     width: "10%",
  //   },
  //   {
  //     title: "Projected Hour (Total)",
  //     dataIndex: "actualBillableHour",
  //     width: "10%",
  //   },
  //   {
  //     title: "Projected Amount(Total)",
  //     dataIndex: "actualBillableAmount",
  //     render: (text, item) => {
  //       return (
  //         <>
  //           <span>
  //             <CurrencySymbol currencyType={item.billableCurency} />
  //             &nbsp;
  //             {`${Number(item.actualBillableAmount).toFixed(2)}  `}
  //           </span>
  //         </>
  //       )
  //     },
  //     width: "10%",
  //   },
  //   {
  //     title: "Deviation Hour (Total)",
  //     width: "10%",
  //     dataIndex: "deviationBillableHour",
  //     render: (text, item) => {
  //       const deviationBillableHr = Number(item.deviationBillableHour)
  //       // const amt = item.actualBillableAmount - item.finalBillableAmount
  //       // const devAmt=Number(amt).toFixed(2)
  //       return (
  //         <>
  //           <div
  //             style={{
  //               color:
  //                 deviationBillableHr < 0
  //                   ? "green"
  //                   : "red"

  //             }}
  //           >

  //             {deviationBillableHr}
  //           </div>
  //         </>
  //       )
  //     },
  //   },
  //   {
  //     title: "Deviation Amount(Total)",
  //     dataIndex: "deviationBillableAmount",
  //     render: (text, item) => {
  //       return (
  //         <>
  //           <div
  //             style={{
  //               color:
  //                 item.deviationBillableAmount < 0
  //                   ? "green"
  //                   : "red"

  //             }}
  //           >
  //             <CurrencySymbol currencyType={item.billableCurency} />
  //             &nbsp;
  //             {`${Number(item.deviationBillableAmount).toFixed(2)}  `}
  //           </div>
  //         </>
  //       )
  //     },
  //     width: "10%",
  //   },

  // ]

  if (props.fetchingLeadsTabData) {
    return <Suspense > <BundleLoader /> </Suspense>
  }
  return (
    <>
     <div className=' flex   sticky  z-auto'>
     <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
     <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent items-end sticky  z-10">
        <div className=" flex justify-between w-[100%] !text-lm font-poppins">
        <div className="  w-[16.7rem] text-sm text-[#00A2E8]  truncate ">            
        < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[0]}
         {/* Talent */}
     
        </div>
        <div className=" w-[14.9rem] truncate ">   <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' />  {translatedMenuItems[1]}
          {/* Customer */}
          </div>
        <div className="   w-[15.9rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>{translatedMenuItems[2]}
        {/* Project */}
        </div>
        <div className="  w-[15.6rem] truncate "> <DateRangeIcon className="!text-icon  mr-1"/>{translatedMenuItems[3]}
        {/* Billing */}
        </div>
        <div className="   w-[15.99rem] truncate "><GroupsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
        {/* {translatedMenuItems[4]} */}
        Billable Hour</div> 
        <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
        {/* {translatedMenuItems[5]} */}
        Actual Hour (Total) </div>
        <div className=" w-[16.1rem] truncate ">   <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' />
        {/* {translatedMenuItems[6]} */}
          Actual Amount (Total)</div>
        <div className="   w-[16.3rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>
        {/* {translatedMenuItems[7]} */}
        Projected Hour (Total)</div>
        <div className="  w-[13.2rem] truncate "> <DateRangeIcon className="!text-icon  mr-1"/>
        {/* {translatedMenuItems[8]} */}
        Projected Amount(Total)</div>
        <div className="   w-[14.01rem] truncate "><GroupsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
        {/* {translatedMenuItems[8]} */}
        Deviation Hour (Total)</div> 
        <div className="  w-[14.02rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
        {/* {translatedMenuItems[10]} */}
        Deviation Amount(Total)</div>
         </div>    
      </div>
      { !props.fetchingDesignationWiseBilling && props.billingByDesignation.length ===0 ?<EmptyPage/>: props.billingByDesignation.map((item, index) => {
    return (
        <div className="flex rounded justify-between bg-white py-ygap  max-sm:rounded  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
           >
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              <div class="flex  w-[8.1rem] items-center justify-start  border-l-2 border-green-500 h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
              <div className='text-xs ml-gap font-poppins'>
           {item.candidateName}
           </div>
                </div>
                </div>
                <div class="flex  w-[8.2rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 2 */}
          </div>
          </div> 
          <div class="flex  w-[8.3rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 3 */}
          </div>
          </div> 
          <div class="flex  w-[8.4rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 4 */}
          </div>
          </div> 
          <div class="flex  w-[8.5rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 5 */}
          </div>
          </div> 
          <div class="flex  w-[8.6rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'> 
            {/* 6 */}
          </div>
          </div> 
          <div class="flex  w-[8.7rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'> 
            {/* 7 */}
          </div>
          </div> 
          <div class="flex  w-[8.8rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 8 */}
          </div>
          </div> 
          <div class="flex  w-[7.1rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 9 */}
          </div>
          </div> 
          <div class="flex  w-[7.2rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 10 */}
          </div>
          </div> 
          <div class="flex  w-[7.3rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
            {/* 11 */}
          </div>
          </div> 
                </div>             
    ) }
            )} 
      </div>    
      </div>
      {/* <StyledTable
        columns={columns}
        dataSource={props.billingByDesignation}
        pagination={false}
        scroll={{ y: 600 }}
      /> */}
    </>
  )
}

const mapStateToProps = ({ billings, auth, task }) => ({
  billingByDesignation: billings.billingByDesignation,
  startDate: billings.startDate,
  endDate: billings.endDate,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  customerTaskList: task.customerTaskList,
  organizationId: auth.userDetails.organizationId,
  fetchingDesignationWiseBilling: billings.fetchingDesignationWiseBilling

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getDesignationWiseBilling,
    getCustomerTask,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingListTable);