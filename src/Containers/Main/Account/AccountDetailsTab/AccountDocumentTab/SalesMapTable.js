import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import {
    getLobList
} from "../../AccountAction";
import {getSaleCurrency} from "../../../../Auth/AuthAction";
import { Input } from "antd";
import LobToggle from "./LobToggle";
const { Option } = Select;
const SalesMapTable = (props) => {
   
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
                     "280",   // "LOB",
                     "1227",   // "Applicable",
                      "407",  // "Potential",
                      "241",  // "Currency"
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
    useEffect(() => {
        props.getLobList(props.orgId);
        props.getSaleCurrency();
      }, []);
    
        const {
           
        } = props;
    
        return (
            <>
                <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky  z-10">
                        <div className="w-[7.4rem] truncate max-md:w-[7.4rem]">{translatedMenuItems[0]}</div>
                        <div className="w-[7.1rem] truncate max-md:w-[7.1rem]">{translatedMenuItems[1]}</div>
                        <div className="w-[5.1rem] truncate max-md:w-[5.1rem]">{translatedMenuItems[2]}</div>
                        <div className="w-[6.1rem] truncate max-md:w-[6.1rem]">{translatedMenuItems[3]}</div>                     
                    </div>
                    <div class="overflow-x-auto h-[69vh]">
                        {props.lobList.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex ">
                                            <div className=" flex items-center border-l-2 border-green-500 bg-[#eef2f9] md:w-[21.56rem] max-sm:w-full text-xs  ">
                                            <div class=" text-xs ml-gap font-poppins">  {item.name} </div>                             
                                            </div>
                                            <div className=" flex  w-[16.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-md:w-[16.2rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                         <div class=" text-xs  font-poppins text-center">
                                            <LobToggle/>
                                               </div>
                                                </div>
                                            <div className="flex items-center justify-center h-8 ml-gap  bg-[#eef2f9] w-[16.04rem]   max-md:w-[16.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins text-center">
                                                 <Input/>
                                                </div>
                                            </div>                                        
                                              <div className=" flex items-center justify-center h-8 ml-gap  bg-[#eef2f9]   md:w-[7.41rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                          <div class=" text-xs  font-poppins text-center">
                                          <Select
                                              style={{width:"8rem"}}            
                                                            //value={item.zone}
                                                           // onChange={(e) => handleChangeRoomRack(e, item.manufactureId)}
                                                        >
                                                            {props.saleCurrencies.map((sd) => (
                                                                <Option key={sd.roomRackId} value={sd.roomRackId}>
                                                                    {sd.currency_name}
                                                                </Option>
                                                            ))}
                                                        </Select>
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
    saleCurrencies:auth.saleCurrencies
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getLobList,
            getSaleCurrency
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SalesMapTable);

