import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Tabs } from "antd";
import { Select } from "../../../../Components/UI/Elements";
import{getAlLoCell,getCatalogueCell} from "../../../Event/Child/Location/LocationAction";
import ProductCellToggle from "./ProductCellToggle";

const { Option } = Select;

const { TabPane } = Tabs;


const ProductCellCard = (props) => {
  const users = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'David Johnson' },
    { value: '4', label: 'Emily Brown' },
  ];
    useEffect(()=>{
        props.getAlLoCell();
        props.getCatalogueCell(props.orgId)
    },[]);



    return (
      <>
       <Tabs type="card" 
      //  activeKey={activeTab} 
      //  onChange={handleTabClick}
       >
      {props.catalogueCell.filter(item => item.productionInd === true)
      .map(item => (
        <TabPane key={item.locationDetailsId} tab={item.locationName}>
         {/* {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
             <Spin />
           </div>
          ) : (
          <MatrixData
            activeTab={activeTab}
            matrixData={props.matrixData}
          />
        
          )} */}
        </TabPane>
   ))}
    </Tabs>

<div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">          <div className=""></div>
            <div className=" md:w-[6rem]">Cell Code</div>
            <div className=" md:w-[4.2rem] ">#Cell</div>
         
            <div className=" md:w-[5.1rem]">Description</div>
            <div className="w-12"></div>             </div>

           {props.allLoCell.map((item) => {
            return (
              <div >
                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3">

                  <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.cell}</div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs text-cardBody font-poppins">
                    
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.cellChamber}</div>
                      </div>
                
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                   
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.description}</div>
                      </div>
                    </div>
                  </div>
                 

                  <div class="flex md:items-center">


                    <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                   <div>
                    <ProductCellToggle item={item}  particularDiscountData={props.particularDiscountData}/>
                   </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })} 

        </div>
      </div> 
      </>
    );
   }

const mapStateToProps = ({ auth,location,distributor, departments, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId,
    allLoCell:location.allLoCell,
    catalogueCell:location.catalogueCell

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAlLoCell,
            getCatalogueCell
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCellCard);
