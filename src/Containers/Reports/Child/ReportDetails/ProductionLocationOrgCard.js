import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import dayjs from "dayjs";
import { Button,  } from "antd";
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";
import InfiniteScroll from "react-infinite-scroll-component";


const ButtonGroup = Button.Group;

const ProductionLocationOrgCard = (props) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [error, setError] = useState(null);

  const [data1, setData1] = useState([]);
  const [loading1, setLoading1] = useState(false);

    const fetchData1 = async () => {
        const start = `${startDate.format("YYYY-MM-DD")}T20:00:00Z`;
        const end = `${endDate.format("YYYY-MM-DD")}T20:00:00Z`;

      try {
        const response = await axios.get(`${base_url2}/dashboard/location/${props.orgId}/${props.startDate}/${props.endDate}/${page}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setData1(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };

    useEffect(() => {
      if (props.selectedCategory==="Production"){
        fetchData1();
      }
        

    }, [props.userId,props.endDate,props.startDate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const handleLoadMore = () => {
    const PageMapd =  data1 &&  data1.length && data1[0].pageCount
    setTimeout(() => {
      if  (data1)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          fetchData1();
      }
      if (page === PageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  return (
    <>
    
    <div className=' flex justify-end sticky top-28 z-auto'>
          <div class="rounded-lg max-sm:m-1 m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]">
           Name
                        </div>
        <div className=" w-[9.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">
    WIP
    </div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">
         Quality
                        </div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] ">
                Dispatch
             </div>
    
        <div className="w-[6.01rem]"></div>
        <div className="w-[3%]"></div>
        <div className="w-[5%]"></div>
        <div className="w-[3.1rem]"></div>
        <div className="w-12"></div>
        {/* <div className="w-12"></div> */}
      </div>
      <InfiniteScroll
        dataLength={data1.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={loading1?<div class="flex justify-center" >Loading...</div>:null}
        height={"75vh"}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      {data1.map((item) => { 
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        // const incompleteDeviationDate = endDate.diff(currentDate, 'days');
        // const completeDeviation = endDate.diff(completionDate, 'days');
        const incompleteDeviationDate = currentDate.diff(endDate, 'days');
        const completeDeviation = completionDate.diff(endDate, 'days');
                    return (
                       
                        <div>
                            <div
                        className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                       <div class="flex  max-sm:w-wk items-center">
                       <div class="flex flex-row items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                     
                          </div>
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.locationName}
                            </div> 
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                     wip
                         
                            </div>
                          </div>
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                 <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
             quality
              
                 </div>
               </div>
                          
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                 <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                 
              
                 </div>
               </div>

               <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                 <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                
              
                 </div>
               </div>

               <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                 <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                 
              
                 </div>
               </div>
                        </div> 
                      </div>
                      </div>

                    )
                })}

              </InfiniteScroll> 
      </div>
</div>


    </>
  );
};
  const mapStateToProps = ({ auth, task, report }) => ({
    userDetails: auth.userDetails,
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    startDate: report.startDate,
    endDate: report.endDate,
    orgId:auth.userDetails.organizationId,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
      
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(ProductionLocationOrgCard);