import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Button,Tooltip,Checkbox} from "antd"
import { bindActionCreators } from "redux";
import {getProductBrandDetails,addBrandProductList} from "./ProductAction"
import { MultiAvatar } from "../../Components/UI/Elements";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
function ProductBrandDetails(props) {
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

   "110", // 'Name', // 0
   "1455",// '  Product Id', // 1
   "1456",// 'Brand Name', // 2
   "141",// 'Workflow Name', // 3
 
   
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
       props.getProductBrandDetails(props.currentBrandId.brand)
      }, []);

      const handleCheckboxChange = (e, productId) => {
        if (e.target.checked) {
          setSelectedCards([...selectedCards, productId]);  // Add to selected cards
        } else {
          setSelectedCards(selectedCards.filter((cardId) => cardId !== productId)); // Remove from selected cards
        }
      };

      const handleSubmit = () => {
        const productList = selectedCards.map((id) => ({ productId: id }));
        console.log({ active:true,productList });
      props.addBrandProductList({ active:true,productList },props.currentBrandId.brand)
      };
  return (
    <div className=' flex  sticky  z-auto'>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky z-10">
        <div></div>
        <div className="font-poppins w-[12.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
        {/* {translatedMenuItems[0]} */}
       {/* name */}
        </div>
        <div className="font-poppins w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
        {/* Name */}
        {translatedMenuItems[0]}
         {/* work */}
        </div>
        <div className="font-poppins w-[8.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
    {/* Product Id */}
    {`${translatedMenuItems[1]} Id`}
          {/* "Sector" */}
      
        </div>
        <div className="font-poppins w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
      
        {/* Brand Name */}
        {translatedMenuItems[2]}
     
        </div>
        <div className="font-poppins w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">
          

        </div>
        <div className="font-poppins w-[5.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
        {/* Workflow Name */}
        {translatedMenuItems[3]}
          {/* Quotation" */}
 
        </div>
          
      
        <div className="w-[4.12rem]"></div>

      </div>
   

     {props.productBrandDetails.length === 0 ? <NodataFoundPage /> : props.productBrandDetails.map((item, index) => {
  
          return (
            <div>
              <div
            className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
          >
                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex  w-[13rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                    <div className="flex max-sm:w-auto">
                      <div>
                      <Checkbox
                style={{ marginTop: '10px' }}
                onChange={(e) => handleCheckboxChange(e, item.productId)}
              >
                {/* Select */}
              </Checkbox>
                        </div>
                      <div>
                        
                        <MultiAvatar
                          primaryTitle={item.productFullName}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                 
                      </div>
                      <div class="w-[4%]"></div>

                      <div class="max-sm:w-full md:flex items-center">
                        <Tooltip>
                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                            <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                              {/* <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}> */}
                                {item.productFullName}
                              {/* </Link> */}

                              &nbsp;&nbsp;
                            

                            </div>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className=" flex  items-center max-sm:w-auto  w-[7.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">



                  </div>
                  <div className=" flex  items-center max-sm:w-auto  w-[9.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
              
                    <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {item.productId}
                    </div>

                  </div>
                </div>
                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex max-sm:w-auto  items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                    <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {item.brandName}
                    </div>

                  </div>

                  
                 
                </div>

                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  <div className=" flex max-sm:w-auto  items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                    <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {item.workflowName}
                    </div>

                  </div>

                  
                 
                </div>
                
              </div>
            </div>
          )
        })} 
     
    </div>
    <Button
        type="primary"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
  </div>
  )
}

const mapStateToProps = ({ auth, account, opportunity,product }) => ({
    userId: auth.userDetails.userId,
    productBrandDetails:product.productBrandDetails

  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getProductBrandDetails,
        addBrandProductList
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandDetails);

