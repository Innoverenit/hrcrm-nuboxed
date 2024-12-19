import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductionBuilder } from "../ProductionAction";
import { MultiAvatar } from "../../../Components/UI/Elements";

function ProductionIDCard(props) {
  useEffect(() => {
    props.getProductionBuilder(props.particularDiscountData.productionProductId);
  }, []);

  return (
    <>
      <div className='flex sticky z-auto'>
        <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className="flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
            <div className=""></div>
            <div className="md:w-[7%]">Part ID</div>
            <div className="md:w-[4.2rem] ">Category</div>
            <div className="md:w-[5.8rem]">Sub Category</div>
            <div className="md:w-[4.2rem] ">Units</div>
            <div className="w-12"></div>
          </div>

          {props.ProdNbldr.map((item, index) => (
            <div key={item.suppliesId}>
              <div className="flex font-poppins rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                <div className="flex  w-[10rem] max-sm:w-full">
                  <div className="flex max-sm:w-full ">
                    <div>
                      <MultiAvatar
                        imageId={item.imageId}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                    <div className="w-[4%]"></div>
                    <div className="max-sm:w-full md:flex items-center">
                      <div className="flex  md:w-[6.1rem] max-sm:w-full  ">
                        <div className="text-sm    cursor-pointer">
                          {item.partNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="text-xs  font-poppins">
                    {item.categoryName}
                  </div>
                </div>
                <div className="flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="text-xs    font-poppins">
                    {item.subCategoryName}
                  </div>
                </div>
                <div className="flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="flex text-xs    font-poppins">
                      {item.quantity}
                  </div>
                </div>
  
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ production,auth }) => ({
  ProdNbldr: production.ProdNbldr,
  fetchingProdNbldr: production.fetchingProdNbldr,
  locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductionBuilder,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionIDCard);
