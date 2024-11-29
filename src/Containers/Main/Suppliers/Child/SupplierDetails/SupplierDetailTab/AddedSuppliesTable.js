import React, { useEffect ,useState } from 'react'
import { getGeneratorSuppliersList } from "../../../SuppliersAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from '../../../../../../Components/Placeholder';
import WidgetsIcon from "@mui/icons-material/Widgets";
import AttractionsIcon from "@mui/icons-material/Attractions";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ApartmentIcon from "@mui/icons-material/Apartment";
import QrCodeIcon from '@mui/icons-material/QrCode';

function AddedSuppliesTable(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
const [loading, setLoading] = useState(true);
    useEffect(() => {
        props.getGeneratorSuppliersList()
    }, [])
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
            "110", //  "Name",//0
             "14", // 'Category',//2
             "1154",    // Sub-category 3
             "259", // 'Attribute',//4
             "263",      //  Sub-attribute 5
             "654",// 'Quality',//6
             "260", // Units 7
            
        
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage])
      if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class=" m-3 p-1 h-62vh overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between  p-1 bg-transparent font-bold font-poppins sticky top-0 items-end !text-lm z-10">
                        <div className="w-[19.1rem] truncate max-md:w-[19.1rem]">
                        <ApartmentIcon className="  !text-icon"/> 
                         {/* {translatedMenuItems[0]} */}
                          Name
                        </div>
                        <div className="w-[14.1rem] truncate max-md:w-[14.1rem]">
                        <WidgetsIcon className=" !text-icon"/>
                         {/* {translatedMenuItems[1]}  */}
                         Category
                        </div>
                        <div className="w-[14.1rem] truncate max-md:w-[14.1rem]">
                        {/* {translatedMenuItems[2]}  */}
                          Sub-category
                        </div>
                        <div className="w-[14.1rem] truncate max-md:w-[14.1rem]">
                        < AttractionsIcon className=" !text-icon"/>
                         {/* {translatedMenuItems[3]}   */}
                         Attribute
                        </div>
                        <div className="w-[14.1rem] truncate max-md:w-[14.1rem]">
                        {/* {translatedMenuItems[4]}  */}
                         Sub-attribute
                        </div>
                       
                        <div className="w-[5.1rem] truncate max-md:w-[5.1rem]">
                        <VerifiedUserIcon className=" !text-icon" />
                         {/* {translatedMenuItems[5]}  */}
                          Quality
                        </div>
                        <div className=" w-[5.1rem] truncate max-md:md:w-[5.1rem]">
                        <QrCodeIcon className=" !text-icon"/> 
                         {/* {translatedMenuItems[6]}   */}
                         Units
                        </div>

                    </div>
                    <div class="overflow-x-auto h-[57vh]">

                        <>
                            {props.generatorSuppliers.map((item) => {


                                return (
                                    <>
                                        <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center py-ygap" >
                                            <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                <div className=" flex font-medium flex-col w-[10.1rem] border-l-2 h-8 border-green-500 bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                    <div class=" font-normal text-xs  font-poppins">
                                                        {item.suppliesFullName}

                                                    </div>
                                                </div>
                                                <div className=" flex w-[5rem] justify-center h-8 ml-gap bg-[#eef2f9] items-center max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs ml-gap font-poppins">
                                                        {item.categoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex  w-[5rem]  justify-center h-8 ml-gap bg-[#eef2f9] items-center max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs ml-gap font-poppins">

                                                        {item.subCategoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[6rem]  justify-center h-8 ml-gap bg-[#eef2f9] items-center max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs ml-gap font-poppins">

                                                        {item.attributeName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[8rem]  justify-center h-8 ml-gap bg-[#eef2f9] items-center max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs ml-gap font-poppins">
                                                        {item.subAttributeName}
                                                    </div>
                                                </div>
                                               
                                                <div className=" flex  w-12  justify-center h-8 ml-gap bg-[#eef2f9] items-center max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs ml-gap font-poppins">
                                                        {item.quality}
                                                    </div>
                                                </div>
                                                <div className=" flex  w-12  justify-center h-8 ml-gap bg-[#eef2f9] items-center max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs ml-gap font-poppins">
                                                        {item.unit}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </>


                    </div>
                </div>
            </div>



        </>
    )
}
const mapStateToProps = ({ suppliers }) => ({
    generatorSuppliers: suppliers.generatorSuppliers
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getGeneratorSuppliersList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddedSuppliesTable);


