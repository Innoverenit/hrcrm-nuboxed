import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductionSearchedToggle from "./ProductionSearchedToggle";
import InfiniteScroll from "react-infinite-scroll-component";

function ProductionSearchedCard(props) {

  return (
    <>

      <div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className=" md:w-[8rem]">Name</div>
            <div className=" md:w-[7rem]">Category</div>
            <div className=" md:w-[7rem] ">Attribute</div>
            <div className="md:w-[7rem]">Workflow</div>
            <div className=" md:w-[7rem] ">Add</div>

          </div>
          <InfiniteScroll
            dataLength={props.searchedProduction.length}
            loader={props.fetchingSearchedProduction ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"75vh"}
          >

            {props.searchedProduction.map((item) => {
              return (
                <div>
                  <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "    >
                    <div className=" flex font-medium flex-col w-[10rem]   max-sm:w-full">
                      <div className="flex max-sm:w-full ">
                        <div class="w-[4%]"></div>

                        <div class="max-sm:w-full md:flex items-center">

                          <div className=" flex font-medium flex-col md:w-[8rem] max-sm:w-full  ">
                            <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs text-cardBody font-poppins">

                        {item.categoryName} {item.subCategoryName}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                        {item.attributeName}  {item.subAttributeName}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <ProductionSearchedToggle item={item} />
                    </div>

                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>

    </>
  );
}

const mapStateToProps = ({ production }) => ({
  searchedProduction: production.searchedProduction,
  fetchingSearchedProduction: production.fetchingSearchedProduction
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionSearchedCard);
