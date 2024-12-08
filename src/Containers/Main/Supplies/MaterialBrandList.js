import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select,Tooltip } from "antd";
import { Link } from 'react-router-dom';
import {getBrandProductList} from "./SuppliesAction"
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import WidgetsIcon from '@mui/icons-material/Widgets';


const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function MaterialBrandList(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
 
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);



  useEffect(() => {
   
    props.getBrandProductList(props.currentBrandId.brand);
   
  }, []);

  return (
    <>
    
 
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky z-10">
            <div></div>
            <div className=" w-[0.01rem] truncate max-md:w-[12.9rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            {/* {translatedMenuItems[0]} */}
           {/* name */}
            </div>
            <div className=" w-[39.5rem] text-[#00A2E8] truncate max-md:w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            <WidgetsIcon className='!text-icon    text-[#42858c]' />  Catagory Name
             {/* work */}
            </div>
            <div className=" w-[8.63rem] truncate max-md: w-[8.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
       Article No
              {/* "Sector" */}
          
            </div>                                           
            <div className="w-[13.12rem]"></div>

          </div>
       

          {props.brandProductListData.length === 0 ? <NodataFoundPage /> : props.brandProductListData.map((item, index) => {
      
              return (
                <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1  items-center py-ygap max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex w-[17.54rem]  border-l-2 border-green-500 bg-[#eef2f9] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col w-[18rem] h-8  border-l-2 border-green-500 bg-[#eef2f9]">
                                <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.categoryName}
                                  </Link>
                                                      
                              </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  justify-center max-sm:w-auto  w-[17.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">



                      </div>
                      <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9]  justify-center max-sm:w-auto  w-[20rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                  
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.articleNo}
                        </div>

                      </div>
                    </div>
                
                    
                  </div>
                </div>
              )
            })} 
         
        </div>
      </div>
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
  product,
  supplies
}) => ({
  userId: auth.userDetails.userId,
  addingProductBrand:product.addingProductBrand,
  
 
  user: auth.userDetails,
  //brandProduct:product.brandProduct,
  brandProductListData:supplies.brandProductListData

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getBrandProductList
        // addProductBrand,
        // getBrandProduct
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MaterialBrandList);

