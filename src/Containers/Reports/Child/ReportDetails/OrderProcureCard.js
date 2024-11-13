import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Tooltip, Button,  } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm, } from "../../../../Components/UI/Antd";
import StairsIcon from '@mui/icons-material/Stairs';
import { MultiAvatar, } from "../../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyPage from "../../../Main/EmptyPage";


const ButtonGroup = Button.Group;

const OrderProcureCard = (props) => {
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
        const response = await axios.get(`${base_url2}/dashboard/procure/${props.userId}/${props.startDate}/${props.endDate}/${page}`,{
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
      if (props.selectedCategory==="Orders" && props.selectedButtonIcon==="Procure"){
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
        <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" w-[8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7rem] max-lg:w-[9rem]"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] "><FormattedMessage
                          id="app.end"
                          defaultMessage="end"
                        /></div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]"><FormattedMessage
                          id="app.ageing"
                          defaultMessage="Ageing"
                        /></div>
                        <div className="w-[12.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.51rem] max-lg:w-[6.51rem]">Info</div>
        <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></div>
        <div className="w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.5rem] max-lg:w-[13.5rem]"><FormattedMessage
                          id="app.owner"
                          defaultMessage="owner"
                        /></div>
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
      {!loading1 && data1.length===  0 ? <EmptyPage/>:data1.map((item) => { 
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
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 max-sm:h-[8rem] max-sm:flex-col">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:flex-row justify-between max-sm:w-auto ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
  // <div class="rounded-full h-10 w-16 bg-red-500"></div>
                      <div class="rounded-[50%] h-[2.1875em] w-[3.1875em] bg-[red]"></div>
                    )}
                    {item.priority === "Medium" && (
                      <div class="rounded-[50%] h-[2rem] w-[3rem] bg-[orange]" ></div>
                    )}
                    {item.priority === "Low" && (
                      <div class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]" ></div>
                    )}
                    <div class=" w-2"></div>
          <div class=" flex w-[8rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex justify-center  max-sm:justify-between flex-row w-full md:flex-col ">
                                            {/* <div class="text-sm  font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs flex items-center  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">                                       
                                            {item.newOrderNo}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium justify-center flex-col  w-[5.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto ">
                                    {/* <div class=" text-sm  font-sm font-poppins max-sm:hidden"> Name </div> */}
                                    <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <span   
     
                className="cursor-pointer text-[#042E8A]"
                          
               >

                 {`${item.orderType} `} &nbsp;


               </span>
                                    </div>
                                </div>
                               </div>
                               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className="flex font-medium flex-col w-[5.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto ">
                       
                      
                       <div class="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"> 
                        {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}</div>
                   </div>
                                <div class="flex flex-col w-[5.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                                  
                    <div class="">
                   
                 
        <div></div>
                        </div>

                    </div>
                   
                    <div className="flex font-medium flex-col w-[3.23rem] max-xl:w-[3.23rem] max-lg:w-[2.23rem]  max-sm:flex-row  max-sm:w-auto ">
                       
            
                    
                     
                   </div>
                   <div className="flex font-medium  justify-between w-[16.6rem] max-xl:w-[10.23rem] max-lg:w-[6.23rem]  max-sm:flex-row  max-sm:w-auto ">
                   <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                  <MultiAvatar
                  primaryTitle={item.name}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />

                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium flex-col w-[6.23rem] max-xl:w-[3.22rem] max-lg:w-[2.22rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                  {/* <div class="text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                                  <div class="text-xs  font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                  <span>
              {item.assignedToName === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedToName === item.submittedBy ? (
                  
                  null
                ) : (
                <MultiAvatar
                  primaryTitle={item.assignedToName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                )}
                </>
              )}
            </span>
                                  </div>
                              </div>
                        
                    
                                <div className=" flex font-medium flex-col  w-[5.28rem] max-xl:w-[2.28rem] max-lg:w-[2.28rem] max-sm:flex-row justify-between max-sm:w-auto ">
                                    
                                    
                                </div>
                                                           
                              
<div>

     </div>
     <div className="flex font-medium flex-col w-[1.9rem] max-xl:w-[1.25rem] max-lg:w-[1.2rem]  max-sm:flex-row  max-sm:w-auto  justify-center ">
    
     
     </div> 


     <div className="flex font-medium flex-col w-[1.7rem] max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
                        

     
     </div> 
     <div className="flex font-medium flex-col w-[2.6rem] max-xl:w-[1.25rem] max-lg:w-[1.2rem] max-sm:flex-row  max-sm:w-auto  justify-center ">
           
      </div> 
  
                  
                   
                   <div class="flex flex-col w-[8.21rem] max-xl:w-[6.2rem] max-lg:w-[5.1rem] justify-center  max-sm:flex-row max-sm:w-auto">
                    <div class=" w-36">
  </div>
</div>
</div>
                          
<div class="flex  max-sm:justify-end max-sm:w-wk items-center">    
      
                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-auto justify-evenly ">

            <div>
           
           
      
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
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
      
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(OrderProcureCard);
   
    
    