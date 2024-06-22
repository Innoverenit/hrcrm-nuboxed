import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { FormattedMessage } from 'react-intl';
import {getPrograms} from "../../ProgramAction"
import { Link } from "../../../../Components/Common";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";

function ProgramTable (props)  {
    console.log(props.programs)
    useEffect(() => {
           props.getPrograms();  
    }, [])

    return (
        <>        
              <div className='flex justify-end sticky top-28 z-auto'>
         <OnlyWrapCard style={{backgroundColor:"#eaedf1",height:"75vh"}}>
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[4.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
        <div className=" md:w-[6.1rem]"><FormattedMessage id="app.duration" defaultMessage="Duration"/></div>
        <div className=" md:w-[4.2rem] "><FormattedMessage id="app.price" defaultMessage="Price"/></div>
        <div className="md:w-[5.8rem]"><FormattedMessage id="app.creationdate" defaultMessage="Creation Date" /></div>
        <div className="w-12"></div>
            </div>
             {props.programs.map((item) => {
               const currentdate = moment().format("DD/MM/YYYY");
               const date = moment(item.creationDate).format("DD/MM/YYYY");
               const content = item.description;
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
    <Link
          toUrl={`/program/${item.programDetailsId}`}
          title={`${item.program}`}
        >{item.program}</Link>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class="text-xs"
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

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs text-cardBody font-poppins">
                        {item.duration} 
                    </div>
    </div></div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
    {item.currency}  {item.price} 
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
       

        <div class=" text-xs text-cardBody font-semibold  font-poppins">
        {` ${moment.utc(item.creationDate).format("ll")}`}
                    </div>
    </div>

{/* <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div class=" text-xs text-cardBody font-poppins">
<Tooltip title="Edit">
                                        <EditOutlined
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                            // onClick={() => {
                                            //     props.setEditProducts(item);
                                            //     handleUpdateProductModal(true);
                                            // }}
                                        />
                                    </Tooltip>
</div>


</div> */}
</div>
</div>
          );
        })}
             
              </OnlyWrapCard>
              </div> 

        </>
    )
}

const mapStateToProps = ({ program }) => ({
  programs:program.programs,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
       getPrograms
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgramTable);

// import React, { useEffect, useState,useMemo,lazy } from 'react'
// import { StyledTable } from '../../../../Components/UI/Antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import moment from "moment";
// import { FormattedMessage } from 'react-intl';
// import {Button,Input } from "antd";
// import SearchIcon from '@mui/icons-material/Search';
// import Highlighter from 'react-highlight-words';
// import "jspdf-autotable";
//  import {getPrograms} from "../../ProgramAction"
// import { BundleLoader } from '../../../../Components/Placeholder';
// import ProgramDetailsView from './ProgramDetailsView';



// function ProgramTable (props)  {
//     console.log(props.programs)
//     useEffect(() => {
//            props.getPrograms();  
//     }, [])

//     const [isExpanded, setIsExpanded] = useState(false);
  
  



//     const [rowdata, setrowData] = useState({});
    
//     const handleRowData = (data) => {
//       setrowData(data);
//     };
//     const [searchText, setSearchText] = useState("");
//     const [searchedColumn, setSearchedColumn] = useState("");
    
//     function handleSearch(selectedKeys, confirm, dataIndex) {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//       }

//       const handleExpandClick = () => {
//         setIsExpanded(true);
//       };
    
//       const handleCollapseClick = () => {
//         setIsExpanded(false);
//       };
    
//       function handleReset(clearFilters) {
//         clearFilters();
//         setSearchText("");
//       }
//     function getColumnSearchProps(dataIndex) {
//         return {
//           filterDropdown: ({
//             setSelectedKeys,
//             selectedKeys,
//             confirm,
//             clearFilters,
            
//           }) => (
//             <div style={{ padding: 8 }}>
//               <Input               
//                 placeholder={`Search ${dataIndex}`}
//                 value={selectedKeys[0]}
//                 onChange={(e) =>
//                   setSelectedKeys(e.target.value ? [e.target.value] : [])
//                 }
//                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                 style={{ width: 240, marginBottom: 8, display: "block" }}
//               />
              
//                 <Button
//                   type="primary"
//                   onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                   size="small"
//                   style={{ width: 90 }}
//                 >
//                   Search
//                 </Button>
//                 <Button
//                   onClick={() => handleReset(clearFilters)}
//                   size="small"
//                   style={{ width: 90 }}
//                 >
//                   Reset
//                 </Button>
//                 <Button
//                   type="link"
//                   size="small"
//                   onClick={() => {
//                     confirm({ closeDropdown: false });
//                     setSearchText(selectedKeys[0]);
//                     setSearchedColumn(dataIndex);
//                   }}
//                 >
//                   Filter
//                 </Button>
              
//             </div>
//           ),
//           filterIcon: (filtered) => (
//             <SearchIcon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
//           ),
//           onFilter: (value, record) =>
//           record[dataIndex]
//           ? record[dataIndex]
//               .toString()
//               .toLowerCase()
//               .includes(value.toLowerCase()) : "",
//           onFilterDropdownVisibleChange: (visible) => {
//             if (visible) {
//             }
//           },
//           render: (text) =>
//             searchedColumn === dataIndex ? (
//               <Highlighter
//                 highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//                 searchWords={[searchText]}
//                 autoEscape
//                 textToHighlight={text ? text.toString(): ""}
//               />
//             ) : (
//               text
//             ),
//         };
//       }
    
//     const columns = [
//         {
//             title: "",
//             //dataIndex: "logo",
//             width:"2%",
//         },
//         {
//           //title: "Name",
//           title: <FormattedMessage id="app.name" defaultMessage="Name" />,
//           dataIndex: "program",
      
//           width: "15%",
//           render: (name, item, id) => {
//             const currentdate = moment().format("DD/MM/YYYY");
//             const date = moment(item.creationDate).format("DD/MM/YYYY");
//             return (
//               <>
//                 <ProgramDetailsView  programDetailsId={item.programDetailsId} 
//                 program={item.program} 
//                 />
//                 &nbsp;&nbsp;
//                 {date === currentdate ? (
//                   <span
//                     style={{
//                       color: "tomato",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     New
//                   </span>
//                 ) : null}
//               </>
//             );
//           },
//         },
//       {
//         title: "Duration",
//          dataIndex: "duration",
//         width:"10%",
//     },
//     {
//         title: "Price",
//          dataIndex: "price",
//         width:"10%",
//         render: (name, item, i) => {
//           return (
//             <span>
//             {item.currency}  {item.price} 
//             </span>
//           );
//         },
//     },
//     {
//       title: "Creation Date",
//       dataIndex: "creationDate",
//       width:"10%",
//       render: (text, item) => {
//         // const creationDate = moment(item.creationDate).format("ll");
//         return <span>{` ${moment.utc(item.creationDate).format("ll")}`}</span>;
//     },
//   },
//     // {
//     //     title: "Description",
//     //     dataIndex: "description",
//     //     width:"10%",
//     //     render: (text, item) => {
//     //       const content=item.description
//     //     //  console.log(content);
//     //     // const content = "sdfghjklxcvbnm,wertyuiopcvbnmxm";
//     //       return <>
          
//     //       {item.description === null ? "No Data" : 
//     //        <div>
//     //       <p>{isExpanded ? content : `${content && content.slice(0, 7)}...`}</p>
//     //       {isExpanded ? (
//     //         <button onClick={handleCollapseClick}>Read Less</button>
//     //       ) : (
//     //         <button onClick={handleExpandClick}>Read More</button>
//     //       )}
//     //     </div>
        
//     //       }
//     //       </>
//     //     },
//     // },

     
//     ]

//     if (props.fetchingLeadsTabData) {
//       return <BundleLoader/>;
//     }
//     return (
//         <>        
//             <StyledTable
//                 columns={columns}
//                 dataSource={props.programs}
//                 pagination={false}
//             />
//         </>
//     )
// }

// const mapStateToProps = ({ program }) => ({
//   programs:program.programs,
// });
// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//        getPrograms
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(ProgramTable);