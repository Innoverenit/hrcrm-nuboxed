import React,{useEffect,useState} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { BundleLoader } from '../../../../../../Components/Placeholder';
import {getContactByContactId} from "../../../../../Contact/ContactAction"

function ContactReportData(props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    
                "110", //  "Name ",//0
                "140", //   "Email",//1
                "546", //   "Mobile",//2      
                "326", //   "Department",//3
                "325", //   "Designation",//4

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
        props.getContactByContactId(props.reportsToId);
    }, [])
    if (loading) {
        return <div><BundleLoader/></div>;
      }
      const item = props.contact
console.log(props.contactById)
  return (
    <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between  w-[100%] px-2 bg-transparent font-poppins text-xs font-bold items-end sticky top-0 z-10">
                        <div className="w-[2.5rem]"></div>
                        <div className="font-bold font-poppins text-[#00A2E8] text-base w-[16.5rem]  md:w-[10.5rem]">
        <LocationCityIcon className='!text-icon ml-1 '  />{translatedMenuItems[0]}
          {/* Name */}
        </div>
        <div className="font-bold font-poppins text-xs w-[10.1rem]  md:w-[9.1rem]">
        <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '  />
         {translatedMenuItems[1]}
{/* Email */}
        </div>
        <div className="font-bold font-poppins text-xs w-[10.1rem]  md:w-[8.1rem]">
        <MobileFriendlyIcon className='!text-icon text-[#41ead4] '  /> {translatedMenuItems[2]}
          {/* Mobile */}
        </div>
        <div className="font-bold font-poppins text-xs  w-[10.2rem] md:w-[8.2rem]">
        <ApartmentIcon className='!text-icon text-[#f0386b] '  />   {translatedMenuItems[3]}
          {/* Department */}
        </div>
                     <div className="font-bold font-poppins text-xs  w-[7.2rem] md:w-[7.2rem]">
                     <i className=" fab fa-artstation mr-1 text-[#b744b8]"></i>{translatedMenuItems[4]}
                      {/* Designation */}
                     </div>

                       
                    </div>
                   
                        {/* {props.contactById.map((item, index) => {
                            return ( */}
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                     

                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm  font-semibold  font-poppins ">
                                                    {item.fullName}
                                                </div>
                                            </div>
                                        </div>

                                      

                                     
                                        <div className=" flex font-medium flex-col  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.emailId}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.mobileNumber}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.tagWithCompany}
                                            </div>
                                        </div>
                                        
                                        <div className=" flex font-medium flex-col  md:w-[8.05rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.contactType}
                                            </div>
                                        </div>
                                     
                                     
                                      

                                    </div>
                                   
                                </div>
                            {/* );
                        })} */}
                   
                </div>
            </div>
  )
}


const mapStateToProps = ({ contact, auth }) => ({
    contact:contact.contact
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
             getContactByContactId
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ContactReportData)



