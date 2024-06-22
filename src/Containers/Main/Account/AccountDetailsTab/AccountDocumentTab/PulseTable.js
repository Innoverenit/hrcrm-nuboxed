import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Popconfirm, Switch, Select } from "antd";
import dayjs from "dayjs";
import {
    getLobList,getPulseList
} from "../../AccountAction";
import {getSaleCurrency} from "../../../../Auth/AuthAction";
import { Input } from "antd";
import LobToggle from "./LobToggle";
const { Option } = Select;
const PulseTable = (props) => {
   
    useEffect(() => {
        props.getLobList(props.orgId);
        props.getSaleCurrency();
        props.getPulseList(props.RowData.distributorId);
      }, []);
    
        const {
           
        } = props;
       

        return (
            <>
                <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[7.4rem]">Name</div>
                        <div className=" md:w-[7.1rem]">Type</div>
                        <div className=" md:w-[5.1rem]"># Orders</div>
                        <div className=" md:w-[6.1rem]">Potential</div>
                        
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        {props.pulseList.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex ">
                                            <div className=" flex font-medium flex-col md:w-[6.56rem] max-sm:w-full  ">

                                                  {item.name}
                                           
                                            </div>
                                            <div className=" flex font-medium   md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                         <div class=" text-xs text-cardBody font-poppins text-center">
                                            {/* <LobToggle/> */}
                                               </div>
                                                </div>
                                            <div className=" flex font-medium   md:w-[5.04rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                 {/* <Input/> */}
                                                </div>
                                            </div>
                                           
                                              <div className=" flex font-medium   md:w-[4.41rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                          <div class=" text-xs text-cardBody font-poppins text-center">
                                          {/* <Select
                                              style={{width:"8rem"}}            
                                                            //value={item.zone}
                                                           // onChange={(e) => handleChangeRoomRack(e, item.manufactureId)}
                                                        >
                                                            {props.saleCurrencies.map((sd) => (
                                                                <Option key={sd.roomRackId} value={sd.roomRackId}>
                                                                    {sd.currency_name}
                                                                </Option>
                                                            ))}
                                                        </Select> */}
                                            </div>
                                              </div>
                                          
                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </div>
     
                </div>
            </div>
            </>
        );
    
}

const mapStateToProps = ({ auth,distributor }) => ({
    orgId: auth.userDetails.organizationId,
    lobList: distributor.lobList,
    pulseList:distributor.pulseList,
    saleCurrencies:auth.saleCurrencies
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getLobList,
            getSaleCurrency,
            getPulseList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PulseTable);

