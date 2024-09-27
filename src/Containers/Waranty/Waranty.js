import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from "react-intl";
import AddWarantyDrawerModal from "../Waranty/AddWarantyDrawerModal"
import ButtonGroup from "antd/lib/button/button-group";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Tooltip, Button,message, Popconfirm, Select,Switch } from "antd";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { HeartOutlined } from '@ant-design/icons';
import {handleWarantyDrawerModal} from "../Waranty/WarantyAction"



const { Option } = Select;
const data=[
    {
        mfgId:"MFG23678",
        customer:"Ramesh",
        orderId:"ORD289054",
        category:"Automobile",
        attribute:"Vehicle",
        date:"27/09/2024",
        Address:"Mumbai"
    },
     {
        mfgId:"MFG13678",
        customer:"Rakesh",
         orderId:"ORD189054",
        category:"Hospital",
        attribute:"Tseting",
        date:"29/09/2024",
        Address:"Mumbai"
    },
    ]

export const Waranty = (props) => {
  const [page, setPage] = useState(0);
  const [zone, setZone] = useState([]);
  const [rack, setRack] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);






  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
        "774",//  "Manufacture ID",
         "110", // "Name",
         "74" ,// "Date",//2
         "142", // "Status",//3
        "778" , // "To Dispatch",//4
         "76", // "Assignedto",//5
        "1042",  // "Manufacture",//6
         "1043" ,// "Step",//7
        "143" ,  //  To Start8
       "1098", //  Select zone"9
        "1508",//  "Select rack" 10
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);



 

  return (
    <>
    <div className='flex sticky z-auto'>
            <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[100%]  p-1 bg-transparent font-bold sticky text-xs font-poppins  z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]">
                    {translatedMenuItems[0]}
                      {/* <FormattedMessage id="app.manufactureid" defaultMessage="Manufacture ID" /> */}
                      </div>
                    <div className="md:w-[22.12rem]">
                    {/* {translatedMenuItems[1]} */}
                    Order Id
                      {/* <FormattedMessage id="app.name" defaultMessage="Name" /> */}
                      </div>
                    <div className="md:w-[15.5rem]">
                    {/* {translatedMenuItems[2]} */}
                    Customer
                      {/* <FormattedMessage id="app.date" defaultMessage="Date" /> */}
                      </div>
                    <div className="md:w-[15.5rem]">
                    {/* {translatedMenuItems[3]} */}
                    Address
                      {/* <FormattedMessage id="app.status" defaultMessage="Status" /> */}
                      </div>
                    <div className=""></div>
                    <div className="md:w-[15.5rem]">
                  Category
                      {/* <FormattedMessage id="app.todispatch" defaultMessage="To Dispatch" /> */}
                      </div>
                      <div className="md:w-[15.5rem]">
                 Attribute
                      {/* <FormattedMessage id="app.todispatch" defaultMessage="To Dispatch" /> */}
                      </div>
                      <div className="md:w-[15.5rem]">
                 Date
                      {/* <FormattedMessage id="app.todispatch" defaultMessage="To Dispatch" /> */}
                      </div>
                
                </div>
           
                {data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                <div className="flex  md:w-[12.1rem] max-sm:w-full ">
                                    <div 
                                    className="flex justify-between text-xs text-[#1890ff] underline font-semibold font-poppins cursor-pointer"
                                    // onClick={() => {
                                    //     props.handleQualityManufactureModal(true);
                                    // handleSetCurrentManufacture(item);
                                    //   }}
                                    >
                                        {item.mfgId}
                                    </div>
                                </div>

                                <div className="flex  md:w-[20rem] max-sm:justify-between  max-sm:flex-row">
                                    <div className="text-xs text-[0.85rem]  font-poppins ml-[9em] " style={{ marginLeft: "9em" }}>
                                   {/* {item.categoryName} {item.subCategoryName} {item.attributeName} {item.subAttributeName} */}
                                   {item.orderId}
                                    </div>
                                </div>

                                <div className="flex md:w-[22rem] max-sm:justify-between max-sm:flex-row">
                                    <div className="text-xs text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    {/* {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`} */}
                                    {item.customer}
                                    </div>
                                </div>



                                <div className="flex md:w-[22rem] max-sm:justify-between max-sm:flex-row">
                                    <div className="text-xs text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    {/* {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`} */}
                                    {item.Address}
                                    </div>
                                </div>
                                <div className="flex md:w-[22rem] max-sm:justify-between max-sm:flex-row">
                                    <div className="text-xs text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    {/* {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`} */}
                                    {item.category}
                                    </div>
                                </div>


                                <div className="flex md:w-[22rem] max-sm:justify-between max-sm:flex-row">
                                    <div className="text-xs text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    {/* {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`} */}
                                    {item.attribute}
                                    </div>
                                </div>

                                <div className="flex md:w-[22rem] max-sm:justify-between max-sm:flex-row">
                                    <div className="text-xs text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    {`  ${dayjs(item.date).format("DD-MM-YYYY")}`}
                                   
                                    </div>
                                </div>


                                <div className="flex md:w-[22rem] max-sm:justify-between max-sm:flex-row">
                                    <div className="text-xs text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                    <HeartOutlined
                                     onClick={() => {
              
                                       props.handleWarantyDrawerModal(true);
                                      
                                      }}
                                    />
                                   
                                    </div>
                                </div>




                                               

                            

                            </div>
                        </div>
                    );
                })}
             
            </div>
        </div>
   <AddWarantyDrawerModal
   handleWarantyDrawerModal={props.handleWarantyDrawerModal}
   addDrawerWarantyModal={props.addDrawerWarantyModal}
   />
        </>
  )
}


const mapStateToProps = ({ waranty, auth,production }) => ({
    addDrawerWarantyModal:waranty.addDrawerWarantyModal

});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    handleWarantyDrawerModal
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Waranty)