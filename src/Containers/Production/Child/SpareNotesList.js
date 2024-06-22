import React, { useState,useEffect,useRef } from 'react';
import { base_url } from "../../../Config/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductDesc} from "../../../Containers/Product/ProductAction";
import { Form, Input, Button, Upload, message , Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { MultiAvatar } from '../../../Components/UI/Elements';



const SpareNoteList = (props) => {
  

 


    useEffect(() => {
    props.getProductDesc(props.step.productionBuilderId);
   
  }, []);

  return (
    <>
    
    <div className=" flex justify-end sticky top-28 z-auto">
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[2rem] max-xl:w-[2rem]"></div>
            <div className=" w-[8.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Description</div>
           
            {/* <div className="md:w-[4.2rem]">Scan</div> */}
            <div className="w-[3.8rem]"></div>
          </div>

        
          
              <>
                {props.productsDesc.map((item) => {
                    
                  return (
                    <>
                      <div className="flex rounded-xl justify-center bg-white mt-[0.5rem]  h-[2.75rem]  p-3 max-sm:h-[7.5rem] max-sm:flex-col">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                       
                       
                          
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.description}
                            </div>
                          </div>
                          
                          
                          
                          </div>
                   
                        
                        </div>
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                       
                       
                          
                       <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                       <div className=" flex font-medium flex-col w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                         <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <MultiAvatar
                          
                          imageId={item.imageId}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                       />
                          
                         </div>
                       </div>
                       
                       
                       
                       </div>
                
                     
                     </div>
                      </div>
                    </>
                  );
                })}
              </> 
        
        </div>
      </div>
    
    </>
  );
};


const mapStateToProps = ({ auth, product, production }) => ({
 
  user: auth.userDetails,
  userId: auth.userDetails.userId,

  orgId: auth.userDetails.organizationId,
  productsDesc:product.productsDesc
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   addProductDesc,
      getProductDesc
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SpareNoteList);