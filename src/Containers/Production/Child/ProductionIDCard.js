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
      <div className='flex justify-end sticky z-auto'>
        <div className="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className="flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className="md:w-[7%]">Part #</div>
            <div className="md:w-[4.2rem] ">Category</div>
            <div className="md:w-[5.8rem]">Sub Category</div>
            <div className="md:w-[4.2rem] ">Unit</div>
            <div className="w-12"></div>
          </div>

          {props.ProdNbldr.map((item, index) => (
            <div key={item.suppliesId}>
              <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                <div className="flex font-medium flex-col w-[10rem] max-sm:w-full">
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
                      <div className="flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
                        <div className="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                          {item.partNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="text-xs text-cardBody font-poppins">
                    {item.categoryName}
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="text-xs text-cardBody font-semibold  font-poppins">
                    {item.subCategoryName}
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="flex text-xs text-cardBody font-semibold  font-poppins">
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
