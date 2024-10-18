import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddProductBrandDetailsModal from "./AddProductBrandDetailsModal"

import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import { Select,Switch,  Popconfirm } from "antd";

import {
  MultiAvatar,
  MultiAvatar2,
} from "../../Components/UI/Elements";

import {
  
    getBrandDeleteProduct,
    handleProductBrandDetailsModal

} from "./ProductAction"

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function BrandDeletedList(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [currentBrandId, setCurrentBrandId] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  //const [currentBrandId, setCurrentPhoneId] = useState("");
  const [newimageId, setnewimageId] = useState("");


  const [newbrandName, setNewBrandName] = useState('');

  useEffect(() => {
   
    props.getBrandDeleteProduct();
   
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

   "110", // 'Name', // 0
   "264",// 'Brand Id', // 1
   "1431",// 'Live', // 2
   "1004",// 'Inactive', // 3
   "84",// 'Delete', // 4
   "154",// 'Submit', // 5
 "1584", //  Are you sure to switch?
 "80", //  Yes
 "81" //  "No"
   
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
    setData(props.brandProduct);
}, [props.brandProduct]);

 

function handleSetCurrentPhoneId(item) {
    setCurrentBrandId(item);
    // console.log("opp",item);
  }








  return (
    <>
     
 
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold font-poppins text-xs sticky z-10">
            <div></div>
            <div className=" w-[12.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
           
            </div>
            <div className=" w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            {translatedMenuItems[0]}
             {/* work */}
            </div>
            <div className=" w-[8.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
        {/* Brand Id */}
        {`${translatedMenuItems[1]}Id`}
              {/* "Sector" */}
          
            </div>
            <div className=" w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
          
            {/* Live */}
            {translatedMenuItems[2]}
         
            </div>
            <div className=" w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">
              

            </div>
            <div className=" w-[5.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
           {/* Inactive */}
           {translatedMenuItems[3]}
              {/* Quotation" */}
     
            </div>
            <div className=" w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
          {/* Delete */}
          {translatedMenuItems[4]}
             {/* Pipeline" */}
            </div>       
          
            <div className="w-[4.12rem]"></div>

          </div>
       

         {props.brandDeleteProduct.length === 0 ? <NodataFoundPage /> : props.brandDeleteProduct.map((item, index) => {
        
              return (
                <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex  w-[13rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                        <div class=" text-xs  max-sm:text-sm  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">


                      <div className=" text-xs  ">
                        <div> 
                           
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8rem"}
                              imgWidth={"1.8rem"}
                            />
                       
                          </div>
                      </div>
                
                      
</div>
                         

                          
                        </div>
                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[7.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">

                      <div class=" text-xs  max-sm:text-sm  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                    
                      <div className=" text-xs  ">
                        <div>  {item.brandName}</div>
                      </div>
                  
                        </div>

                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[9.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                  
                        <div class=" text-xs   max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]"
                        //  onClick={() => {
                        //   props.handleProductBrandModal(true);
                        //   handleSetCurrentBrandId(item);
                        // }}
                        >
                          {item.brand}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex max-sm:w-auto  items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs   max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.brandCount}
                        </div>

                      </div>


                      <div className=" flex max-sm:w-auto  items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                      <div className="flex max-sm:w-auto items-center w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row max-sm:justify-between">
                    {/* Add the Popconfirm and Switch */}
                    <Popconfirm
                      title={translatedMenuItems[6]}
                      onConfirm={() => {
                        props.handleProductBrandDetailsModal(true);
                        handleSetCurrentPhoneId(item);
                    }}
                      //onCancel={handleCancel}
                      okText={translatedMenuItems[7]}
                      cancelText={translatedMenuItems[8]}
                    >
                      <Switch 
                        checkedChildren={translatedMenuItems[7]}
                        unCheckedChildren={translatedMenuItems[8]}
                      />
                    </Popconfirm>
                  </div> 

                      </div>

    

                      
                   
                    </div>
                
                  </div>
                </div>
              )
            })} 
         
        </div>
      </div>
  
<AddProductBrandDetailsModal
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
currentBrandId={currentBrandId}
addProductBrandDetailsModal={props.addProductBrandDetailsModal}
handleProductBrandDetailsModal={props.handleProductBrandDetailsModal}
/>
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
  product
}) => ({
//   userId: auth.userDetails.userId,
//   addingProductBrand:product.addingProductBrand,
  
brandDeleteProduct:product.brandDeleteProduct,
addProductBrandDetailsModal:product.addProductBrandDetailsModal
//   user: auth.userDetails,
//   brandProduct:product.brandProduct,
//   addProductBrandModal:product.addProductBrandModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getBrandDeleteProduct,
        handleProductBrandDetailsModal
    //     addProductBrand,
    //     updateBrandProduct,
    //     getBrandProduct,
    //     deleteProductBrandData,
    //   handleProductBrandModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BrandDeletedList);

