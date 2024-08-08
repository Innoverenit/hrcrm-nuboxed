import React, {useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import "jspdf-autotable";
import { RotatingCircleLoader    } from 'react-loaders-kit';
import dayjs from "dayjs";
import Highlighter from 'react-highlight-words';
import { SearchOutlined,} from '@ant-design/icons';
import { Button,  Tooltip, Input} from "antd";
import { Link } from 'react-router-dom';



const ReportsCardList = (props) => {
  const{translatedMenuItems}=props;
  const [loading, setLoading] = useState(true);
  const loaderProps = {
    loading,
    size: 20,
    duration: 1,
    // alignItems:"centre",
    colors: ['#5e22f0', '#f6b93b']
}
    // useEffect(() => {
     
    //   props.getServiceProviderOptions();   

    // }, []);

    const [currentProvider, setCurrentProvider] = useState("");
    const [page, setPage] = useState(0);
    function handleSetCurrentProvider(name) {
      setCurrentProvider(name);
      //console.log(name);
    }
    function onChange(pagination, filters, sorter) {
      console.log("params", pagination, filters, sorter);
    }

    const [rowdata, setrowData] = useState({});
    const handleRowData = (data) => {
      setrowData(data);
    };
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
  
  
    function handleReset(clearFilters) {
      clearFilters();
      setSearchText("");
    }
  
    if (props.fetchingAllReportInvestors) {
      return  <div class=" flex justify-center items-center mt-[20rem]" >
        <RotatingCircleLoader    {...loaderProps} />
        </div>
        ;
    }

    return (
        <>
         
         <div>
         <div className="cwrapper">
         { !props.fetchingAllReportInvestors && props.allReportInvestors.length === 0 ?"None":props.allReportInvestors.map((item,index) =>  {
  
    //    const LocAdd=`${item.addressDetailsViewDTO.city}`;
    //    const country=`${item.addressDetailsViewDTO.country}`;
        const currentdate = dayjs().format("YYYY/MM/DD");
       const date = dayjs(item.creationDate).format("YYYY/MM/DD");
 
  
    return (
      <div className=" w-full my-2 h-16 scale-98 hover:scale-100 ease-in duration-100 ">
      <div class="bg-white rounded-md shadow border-solid w-w95 h-16 p-1 max-sm:h-28 m-0  md:m-auto ">
        <div class="flex max-sm:flex-col  md:flex flex-row justify-around ">
        <div class="w-full md:flex flex-col justify-center mb-auto">
           <div class="flex justify-evenly">
           <div className="Ccard__title w-40">
           <Link to={`/provider/${item.serviceId}`}>
           <Tooltip title={item.name}>
           <CatgryName>
           <label class=" text-black-600 cursor-pointer max-sm:text-sm md:text-xs">
          {/* Name */}
         {translatedMenuItems[0]}
          </label>
            </CatgryName>
            <label class=" text-black-600 cursor-pointer max-sm:text-sm md:text-xs">
            {item.name}
          </label>
            </Tooltip>
                </Link> 
             </div>
             <div className="Ccard__title w-20">
          <CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {/* KVK # */}
          {translatedMenuItems[1]}
          </label> 
          </CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
    {item.kvkNo}
            </label>
             </div>
        
             <div className="Ccard__title w-36">
          <CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {/* Phone # */}
          {translatedMenuItems[2]}
          </label> 
          </CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {item.dialCode} {item.mobileNo}
            </label>
             </div>
             <div className="Ccard__title w-36">
          <CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {/* Address */}
          {translatedMenuItems[3]}
          </label> 
          </CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {
                (item.addressDetailsDTO &&item.addressDetailsDTO.address1) ||""
              } 
            </label>
             </div>
             <div className="Ccard__title w-28">
          <CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {/* City */}
          {translatedMenuItems[4]}
          </label> 
          </CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {
       (item.addressDetailsDTO &&item.addressDetailsDTO.city) ||""
       } 
            </label>
             </div>

             <div className="Ccard__title w-32">
          <CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {/* Join Date */}
          {translatedMenuItems[5]}
          </label> 
          </CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {item.creationDate === null ? "No Transaction" :
                 <span>{dayjs(item.creationDate).format("l")}</span>
            
                }
            </label>
             </div>
           
             <div className="Ccard__title w-40">
          <CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {/* Last Payment */}
          {translatedMenuItems[6]}
          </label> 
          </CatgryName>
          <label class=" text-gray-600 max-sm:text-sm md:text-xs">
          {item.lastPaymentOn === null ? "No Transaction" :
                <span>
                  {dayjs(item.lastPaymentOn).format("l")} 
                </span>
              }
            </label>
             </div>
                   </div>
                   
           </div>
             
           
           
         
           </div>
           </div>
           </div>
     

    )  
    })}
             
       </div>
       </div>
         
   
        </>
    )
}

const mapStateToProps = ({ report }) => ({
    fetchingAllReportInvestors: report.fetchingAllReportInvestors,
   // serviceProviderOptions:reports.serviceProviderOptions
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        //getServiceProviderOptions
    

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReportsCardList);
const CatgryName= styled.div`
  font-size: 1rem;
  color: black;
    font-weight: 600;
    white-space: nowrap;
    @media only screen and (max-width: 600px) {
      width: 99%;
      font-size: 0.8rem;
  // text-overflow: ellipsis;
    white-space: nowrap;
    // overflow: hidden;
    }
`;
const SubCatgryName= styled.div`
  font-size: 1rem;
  color: black;
    font-weight: 600;
    white-space: nowrap;
    @media only screen and (max-width: 600px) {
      width: 85%;
      font-size: 0.8rem;
    white-space: nowrap;
    }
`;
