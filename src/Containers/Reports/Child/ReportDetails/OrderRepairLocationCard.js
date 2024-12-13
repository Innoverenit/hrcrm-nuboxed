import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Tooltip, Button,Select  } from "antd";
import { MultiAvatar, } from "../../../../Components/UI/Elements";
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";
import {getlocation} from "../../../Event/Child/Location/LocationAction";
import EmptyPage from "../../../Main/EmptyPage";


const ButtonGroup = Button.Group;
const { Option } = Select;

const OrderRepairLocationCard = (props) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [data1, setData1] = useState([]);
  const [loading1, setLoading1] = useState(false);

     const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
          const [loading, setLoading] = useState(true);
      
         useEffect(() => {
            const fetchMenuTranslations = async () => {
              try {
                setLoading(true); 
                const itemsToTranslate = [
            '71', // 0type
        '660', // 1Order
        '111', // 2end
        '218', // 3 Value
        '76', // assignedto
        '228',// all
        '268',// complete 
        // '', // incomplete
      
       
         
        
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
    const fetchData1 = async (ev) => {
        const start = `${startDate.format("YYYY-MM-DD")}T20:00:00Z`;
        const end = `${endDate.format("YYYY-MM-DD")}T20:00:00Z`;

      try {
        const response = await axios.get(`${base_url2}/dashboard/allOrderLocation/${ev}/${props.userId}/${props.startDate}/${props.endDate}`,{
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

    const [data2, setData2] = useState([]);
    const [loading2, setLoading2] = useState(false);
      const fetchData2 = async (ev) => {
        try {
          const response = await axios.get(`${base_url2}/dashboard/completeOrderLocation/${ev}/${props.userId}/${props.startDate}/${props.endDate}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData2(response.data);
          setLoading2(false);
        } catch (error) {
          setError(error);
          setLoading2(false);
        }
      };

      const [data3, setData3] = useState([]);
    const [loading3, setLoading3] = useState(false);
      const fetchData3 = async (ev) => {
        try {
          const response = await axios.get(`${base_url2}/dashboard/inCompleteOrderLocation/${ev}/${props.userId}/${props.startDate}/${props.endDate}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData3(response.data);
          setLoading3(false);
        } catch (error) {
          setError(error);
          setLoading3(false);
        }
      };

    useEffect(() => {
        props.getlocation(props.orgId);
    }, []);



    const handleChange = (ev) => {
        setSelectedValue(ev);
        fetchData1(ev);
        fetchData2(ev);
        fetchData3(ev);
      };


  return (
    <>
    <div class="w-32">
     <Select
                                    showSearch
                // value={selectedValue}
                style={{ width: "100%" }}
                onChange={handleChange}
                placeholder="Select"
              >  
        {props.showLocation.map(option => {
          return <Option key={option.locationDetailsId} value={option.locationDetailsId}>{option.locationName}</Option>
})}
      </Select>
      </div>

      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[5rem] text-[white] flex justify-center bg-[#ff5e00]">
        {translatedMenuItems[5]}
           </div>
           <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]">{translatedMenuItems[0]}</div>
        <div className=" w-[9.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">{translatedMenuItems[1]} #</div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">{translatedMenuItems[2]}</div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">{translatedMenuItems[3]}</div>
        <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]">{translatedMenuItems[4]}</div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
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
                            <div
                        className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                       <div class="flex  max-sm:w-wk items-center">
                       <div class="flex flex-row items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                       <div className="flex max-sm:w-full"> 
{item.priority === "High" && (
                    <div class="rounded-[50%] h-[2.1875em] w-[3.1875em] bg-[red]"></div>
                  )}
                  {item.priority === "Medium" && (
                    <div class="rounded-[50%] h-[2rem] w-[3rem] bg-[orange]" ></div>
                  )}
                  {item.priority === "Low" && (
                    <div class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]" ></div>
                  )}
                  <div class=" w-2"></div>
                  </div>
                          </div>
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.newOrderNo}
                         
                            </div> 
                           
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}
                         
                            </div>
                          </div>
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                 <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                 {item.offerprice}
              
                 </div>
               </div>
                          <div className=" flex   w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                            <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            <span>
            {item.contactPersonName === null ? (
              "Not available"
            ) : (
              <> 
              <MultiAvatar
                primaryTitle={item.contactPersonName}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              /> 
              </>
            )}
          </span>
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

           
      </div>

      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[5rem] text-[white] flex justify-center bg-[#0ba0db]">
        {translatedMenuItems[6]}
           </div>
           <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]">{translatedMenuItems[0]}</div>
        <div className=" w-[9.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">{translatedMenuItems[1]} #</div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">{translatedMenuItems[2]}</div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">{translatedMenuItems[3]}</div>
        <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]">{translatedMenuItems[4]}</div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                         {!loading2 && data2.length===  0 ? <EmptyPage/>:data2.map((item) => { 
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
                       <div className="flex max-sm:w-full"> 
{item.priority === "High" && (
                    <div class="rounded-[50%] h-[2.1875em] w-[3.1875em] bg-[red]"></div>
                  )}
                  {item.priority === "Medium" && (
                    <div class="rounded-[50%] h-[2rem] w-[3rem] bg-[orange]" ></div>
                  )}
                  {item.priority === "Low" && (
                    <div class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]" ></div>
                  )}
                  <div class=" w-2"></div>
                  </div>
                          </div>
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.newOrderNo}
                         
                            </div> 
                           
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}
                         
                            </div>
                          </div>
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                 <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                 {item.offerprice}
              
                 </div>
               </div>
                          <div className=" flex   w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                            <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            <span>
            {item.contactPersonName === null ? (
              "Not available"
            ) : (
              <> 
              <MultiAvatar
                primaryTitle={item.contactPersonName}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              /> 
              </>
            )}
          </span>
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

           
      </div>

   
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[5rem] text-[white] flex justify-center bg-[#db0bae]">
        incomplete{/* {translatedMenuItems[7]} */}
           </div>
        <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.5rem] max-lg:w-[11.5rem]">{translatedMenuItems[0]}</div>
        <div className=" w-[9.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">{translatedMenuItems[1]} #</div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">{translatedMenuItems[2]}</div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>
        <div className="w-[13.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.51rem] max-lg:w-[11.51rem]">{translatedMenuItems[3]}</div>
        <div className="w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[6.2rem]">{translatedMenuItems[4]}</div>
       
        <div className="w-[6.01rem]"></div>


                    </div>
    
                         {!loading3 && data3.length===  0 ? <EmptyPage/>:data3.map((item) => { 
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
                       <div className="flex max-sm:w-full"> 
{item.priority === "High" && (
                    <div class="rounded-[50%] h-[2.1875em] w-[3.1875em] bg-[red]"></div>
                  )}
                  {item.priority === "Medium" && (
                    <div class="rounded-[50%] h-[2rem] w-[3rem] bg-[orange]" ></div>
                  )}
                  {item.priority === "Low" && (
                    <div class="rounded-[50%] h-[2.1875em] w-[2.1875em] bg-[teal]" ></div>
                  )}
                  <div class=" w-2"></div>
                  </div>
                          </div>
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.newOrderNo}
                         
                            </div> 
                           
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}
                         
                            </div>
                          </div>
                          <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
                 
                 <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                 {item.offerprice}
              
                 </div>
               </div>
                          <div className=" flex   w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                            <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            <span>
            {item.contactPersonName === null ? (
              "Not available"
            ) : (
              <> 
              <MultiAvatar
                primaryTitle={item.contactPersonName}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              /> 
              </>
            )}
          </span>
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

           
      </div>




    </>
  );
};
  const mapStateToProps = ({ auth, location, report }) => ({
    userDetails: auth.userDetails,
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    startDate: report.startDate,
    endDate: report.endDate,
    orgId: auth.userDetails.organizationId,
    showLocation: location.showLocation,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getlocation
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(OrderRepairLocationCard);