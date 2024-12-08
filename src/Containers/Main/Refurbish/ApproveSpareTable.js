import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllSpareList } from "./RefurbishAction"
import { OnlyWrapCard } from "../../../Components/UI/Layout";

import ApprovedSpareToggle from "./ApprovedSpareToggle";
import { BundleLoader } from '../../../Components/Placeholder';

const ApproveSpareTable = (props) => {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
             "1282", //  "Spare Name",//0
              "184",  // "Phone imei",//1
              "1285" , // "Phone Model",//2             
            //  "", //   OEM
              
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
        props.getAllSpareList(props.rowData.orderPhoneId)
    }, [])
    const [selectedRow, setselectedRow] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setselectedRow(selectedRows);
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };

if (props.fetchingALlSPareList){
    return <BundleLoader/>
}

    return (
        <>
         <div className='flex  sticky z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "white" }}>
                    <div className=" flex  w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[8.1rem]">
                        {translatedMenuItems[0]} 
                      </div>
                        <div className=" md:w-[10.1rem]">
                        {translatedMenuItems[1]} 
                      </div>
                        <div className=" md:w-[5.8rem] ">
                        {translatedMenuItems[2]}  
                      </div>
                        <div className="md:w-[4.6rem]">
                        OEM 
                      </div>
                       
                        <div className="md:w-[7.2rem]"></div>
                    </div>
                    {props.allSpareById.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                    <div class="flex">
                                        <div className=" flex   md:w-[7.6rem] max-sm:w-full  ">
                                                {item.suppliesName}
                                        </div>

                                        <div className=" flex    md:w-[10.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.phoneIMEI}
                                            </h4>

                                        </div>
                                        <div className=" flex   md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.model}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className=" flex   md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.company}
                                        </div>
                                    </div>
                                    <div className=" flex   md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                           <ApprovedSpareToggle phoneSpareId={item.phoneSpareId}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </OnlyWrapCard>
            </div>

        </>
    )
}
const mapStateToProps = ({ refurbish, auth }) => ({
    allSpareById: refurbish.allSpareById,
    fetchingALlSPareList: refurbish.fetchingALlSPareList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllSpareList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ApproveSpareTable);
