import React, { useState,useEffect } from 'react';
import { Switch } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getQualityProducts,} from "../../Product/ProductAction"

const ProductionQualityDta = (props) => {
  const [qualityProducts, setQualityProducts] = useState(props.qualityProducts);
useEffect(() => {
    props.getQualityProducts(props.particularDiscountData.productId);
    // setPage(page + 1);
  }, []);


  useEffect(() => {
    // Check if data is available
    if (props.qualityProducts.length > 0) {
      // Update activeTab when data is available
      setQualityProducts(props.qualityProducts);
    }
  }, [props.qualityProducts]); 

  return (
    <>
    
    <div className='flex  sticky z-auto'>
            <div className="rounded m-1 p-1 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className="flex w-[95%] p-1 bg-transparent font-bold sticky  z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]">Step</div>
                    <div className="md:w-[15.5rem]">Serial No</div>
                    <div className=""></div>
              
                  
                </div>
        <div  
       
        >
                {qualityProducts.map((item, index) => (
                  
                 
                      <div
                       
                        className="flex rounded-xl mt-2 bg-white h-12 items-center p-3"
                      >
                        <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                          <div className="flex justify-between text-sm font-semibold font-poppins">
                            {item.qualityName}

                
             
            
                          </div>
                        </div>

                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                          <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                            {item.steps}
                          </div>
                        </div>

                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                          <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                          

                          <Switch
        checked={item.mandatoryInd}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
                          </div>
                        </div>



                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                          <div className="font-normal text-[0.85rem] font-poppins" style={{ marginLeft: "9em" }}>
                          

                          {/* <Switch
        checked={item.mandatoryInd}
          checkedChildren="Yes"
          unCheckedChildren="No"
        /> */}
        {item.mandatoryInd===true?"Mandatory":"Not Mandatory"}
                          </div>
                        </div>


                      

                       
                      </div>
                  
                ))}
               
              </div>
    
            </div>
          
        </div>
      
    </>
  );
};


const mapStateToProps = ({ auth,location,departments,distributor,product }) => ({
    // userId: auth.userDetails.userId,
    // orgId:auth.userDetails.organizationId,
    // //locationId:auth.userDetails.locationId,
    // allLoCell:location.allLoCell,
    // cellCode:location.cellCode,
    // userCell:location.userCell,
    qualityProducts:product.qualityProducts
    // departments: departments.departments,
    // userListLocation:location.userListLocation,
    // locationMachine:location.locationMachine,
    // locationMachineData:location.locationMachineData

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          
            getQualityProducts,
           
        //   getLocationMachine,
        //   createMachinary,
        //   getLocationMachineData,
        //   createMachinaryCell
        //     getAlLoCell,
        //    getDepartments,
        //    getUserListLocation,
        //    createUserCell,
        //    getUserCell,
        //    getCellCode,
        //    deleteUserCell
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionQualityDta);