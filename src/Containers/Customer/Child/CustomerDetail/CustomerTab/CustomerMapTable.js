import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import {
    getLobList
} from "../../../../Main/Account/AccountAction"
import {getSaleCurrency} from "../../../../Auth/AuthAction";
import { Input } from "antd";
import LobToggle from "../../../../Main/Account/AccountDetailsTab/AccountDocumentTab/LobToggle";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
const { Option } = Select;

const CustomerMapTable = (props) => {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    useEffect(() => {
        props.getLobList(props.orgId);
        props.getSaleCurrency();
      }, []);
    
      useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
           "280", //  "LOB",//0
           "1227",  //   "Applicable",//1
           "407",  //   "Potential",//2
          "241",   //   "Currency",//3
             
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
        const {
           
        } = props;
       

        return (
            <>
                <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                        <div className="font-bold font-poppins text-xs w-[4.4rem] md:w-[18.4rem]">{translatedMenuItems[0]}</div>
                        {/* LOB */}
                        <div className="font-bold font-poppins text-xs w-[1.1rem] md:w-[13.1rem]">{translatedMenuItems[1]}</div>
                        {/* Applicable */}
                        <div className="font-bold font-poppins text-xs w-[2.1rem] md:w-[10.1rem]">{translatedMenuItems[2]}</div>
                        {/* Potential */}
                        <div className="font-bold font-poppins text-xs w-[19.1rem] md:w-[9.1rem]">   <CurrencyExchangeIcon
              className='!text-base  text-[#e4eb2f]'
              />{translatedMenuItems[3]}</div>
                        {/* Currency */}
                        
                     


                    </div>
                    <div class="overflow-x-auto h-[79vh]">
                        {props.lobList.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex">
                                            <div className=" flex items-center justify-center  border-l-2 border-green-500 bg-[#eef2f9] h-8  ml-gap md:w-[15.56rem] max-sm:w-full  ">

                                                  {item.name}
                                           
                                            </div>
                                            <div className=" flex md:w-[15.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">

                                         <div class=" text-xs  font-poppins text-center">
                                            <LobToggle/>
                                               </div>
                                                </div>
                                            <div className=" flex  md:w-[15.04rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins text-center">
                                                 <Input/>
                                                </div>
                                            </div>
                                           
                                              <div className=" flex md:w-[15.41rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMapTable);

