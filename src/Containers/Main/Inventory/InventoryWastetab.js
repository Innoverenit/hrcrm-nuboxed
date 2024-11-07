import React  from "react";
import { FormattedMessage } from "react-intl";
import CategoryIcon from '@mui/icons-material/Category'
import FactoryIcon from '@mui/icons-material/Factory';


function InvenoryWastetab (props) {

    
    return(
        <>
       
               
       <div className=' flex sticky  z-auto h-[79vh]'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs items-end sticky z-10">
                        <div className=""></div>
                        <div className="text-[#00A2E8] text-base w-[19.5rem]"><FormattedMessage id="app.po" defaultMessage="PO ID" /></div>
                        <div className=" w-[11.52rem]" >
                            {/* <FormattedMessage id="app.created" defaultMessage="Created" /> */}
                         Item 
                        </div>
             
                       
               
                        <div className=" w-[12.122rem]" >       
                        <FactoryIcon className='!text-base  text-[#e4eb2f]' />   Supplier Name
                        </div>

                        <div className=" w-[4.122rem]">       
                      HSN
                        </div>

                        <div className=" w-[8.12rem]">       
                        <CategoryIcon className='!text-base  text-[#e4eb2f]'/> Supplies Id

                        </div>    
                        <div className=" w-[5.12rem]" >       
                   Country

                        </div>
                        <div className=" w-[8.12rem]" >       
                   Best Use Date

                        </div>

                        <div className=" w-[5.12rem]" >       
                    Units

                        </div>
                        <div className=" w-[9.2rem]" >       
                    Zone

                        </div>
                        <div className=" w-[13.2rem]">       
                    Aisle

                        </div>
                        <div className=" w-[7.12rem]">       
                    Rack

                        </div>
                   

                        <div className=" w-[3.22rem]"></div>
                    </div>
                    </div>
              </div>
        </>
    );
}

export default InvenoryWastetab;