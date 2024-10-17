import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierSupplies,setSupplierSuppliesType,getSupplierSuppliesQuality  } from "../../../../SuppliersAction";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { Tooltip,Button,Select } from "antd";
import SupplierSuppliesToggle from "./SupplierSuppliesToggle";

const { Option } = Select;

const ButtonGroup = Button.Group;

function SupplierSuppliesCardTable(props) {
  useEffect(() => {
    props.getSupplierSupplies(props.supplier.supplierId);
  }, []);

  const [hasMore, setHasMore] = useState(true);

  const [currentType, setCurrentType] = useState({});
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const { handleUpdateShipperModal } = props;


  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleSetCurrentType = (value, item) => {
    const qualityIds = value || [];
    const payload = {
      type: qualityIds.map((qualityId) => ({ qualityId })),
      suppliesId: item.suppliesId,
      supplierId: props.supplier.supplierId,
      supplierSuppliesInd: true
    };
    props.setSupplierSuppliesType(payload);

    setCurrentType({
      ...currentType,
      [item.suppliesId]: value
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "110",//0 Name
         "14",//10 Category
          "259",//2 Attribute
          "1276",//3 Tag With Supplier
          "654",//4 Quality
         
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    props.getSupplierSuppliesQuality();
  }, []);

  const handleSaveQualityIds = (item) => {
    const qualityIds = currentType[item.suppliesId] || [];
    const payload = {
      type: qualityIds.map((qualityId) => ({ qualityId })),
      suppliesId: item.suppliesId,
      supplierId: props.supplier.supplierId,
      supplierSuppliesInd: true 
    };
    props.setSupplierSuppliesType(payload);
  };

  return (
    <>
      <div className=' flex justify-end sticky  z-auto'>
        <div class="rounded-lg m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[7.1rem] max-xl:text-[0.65rem] max-xl:w-[6.6rem]">   {translatedMenuItems[0]}
              {/* Name */}
            </div>
             <div className="w-[7.9rem] max-xl:text-[0.65rem] max-xl:w-[6.9rem]">  {translatedMenuItems[1]}
             {/* Category */}
              </div>
              <div className="w-[7.91rem] max-xl:w-[4.9rem] max-xl:text-[0.65rem]">  {translatedMenuItems[2]}
              {/* Attribute */}
              </div>
            <div className=" w-[8.11rem] max-xl:text-[0.65rem] max-xl:w-[14.11rem]">    {translatedMenuItems[3]}
         {/* Tag with Supplier" */}
           </div>
                <div className=" w-[8.11rem] max-xl:text-[0.65rem] max-xl:w-[14.11rem]">   {translatedMenuItems[4]}
                  {/* Quality */}
                  </div>       
            <div className="w-[1.5rem]">
            </div>
          </div>
          <div >
            <InfiniteScroll
              dataLength={props.supplierSuppliesList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierSupplies ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"75vh"}
              style={{scrollbarWidth:"thin"}}
            >
              {props.supplierSuppliesList.length ?
                <>
                  {props.supplierSuppliesList.map((item) => {
                    const initialSelectedValues = item.quality ? item.quality.map(({ qualityId }) => qualityId) : [];
                    return (
                      <>
                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1"

                        >
                          <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                            <div className=" flex font-medium  w-[12.1rem] max-xl:w-[9.2rem] items-center  max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem]">                        
                                  {item.suppliesName}
                                  {/* </Link> */}

                              </div>
                            </div>
                            <div className=" flex   w-[13.01rem] max-xl:w-[10.01rem] items-center max-sm:justify-between  max-sm:flex-row ">

                              <div class="  text-xs font-poppins max-xl:text-[0.65rem]">
                                {item.categoryName} {item.subCategoryName}
                              </div>
                            </div>
                            <div className=" flex  w-[15.9rem] max-xl:w-[8.9rem] items-center max-sm:justify-between  max-sm:flex-row ">
                              <div class=" text-xs font-poppins max-xl:text-[0.65rem]">
                              {item.attributeName} {item.subAttributeName}
                              </div>
                            </div>

                            <div className=" flex   w-[6.25rem] max-xl:w-[9.2rem] items-center max-sm:justify-between  max-sm:flex-row ">
                            
<SupplierSuppliesToggle
item={item}
supplierId={props.supplier.supplierId}

/>


</div>
<div className="w-[18.1rem]">   
{item.supplierSuppliesInd &&( 
  <>
<div class="flex flex-row items-center justify-between w-[14rem]  max-sm:flex-row  max-sm:justify-end">
  {/* <div class="flex">                
{props.supplierSuppliesQuality.map((dt)=>{

  return (
   
                  <div>
                    <Tooltip title={dt.type}>
                    <div 
                        // type={dt.type}
                        // role={item.type}
                        onClick={() => {
                          props.setSupplierSuppliesType({ type:currentType,
                          suppliesId:item.suppliesId,
                          supplierId:props.supplier.supplierId,
                          supplierSuppliesInd:"true"
                        });
                        }}
                      >
{dt.type}
                    </div>
                    </Tooltip>
                  </div>
                 
                  )})}
  </div> 
       */}
         <div class=" w-[12rem]">  
  <Select
          showSearch
          style={{width:"100%"}}
          placeholder="Search or select include"
          optionFilterProp="children"
          // loading={isLoadingInclude}
          // onFocus={handleSelectIncludeFocus}
          onChange={(value) => handleSetCurrentType(value, item)}
          defaultValue={initialSelectedValues} 
          mode="multiple" 
        >
          {props.supplierSuppliesQuality.map(opt => (
            <Option key={opt.qualityId} value={opt.qualityId}>
              {opt.code}
            </Option>
          ))}
        </Select>
        </div>  
        {/* <div>  
        <Button type="primary"
                        // type={dt.type}
                        // role={item.type}
                        // onClick={() => {
                        //   props.setSupplierSuppliesType({ type:currentType,
                        //   suppliesId:item.suppliesId,
                        //   supplierId:props.supplier.supplierId,
                        //   supplierSuppliesInd:"true"
                        // });
                        // }}
                        onClick={() => handleSaveQualityIds(item)}
                      >
Save
                    </Button>
                    </div>   */}
                </div>
                </>
              )}
 </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.supplierSuppliesList.length &&
                  !props.fetchingSupplierSupplies ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = ({  suppliers, auth }) => ({
  supplierSuppliesList: suppliers.supplierSuppliesList,
  userId: auth.userDetails.userId,
  fetchingSupplierSupplies:suppliers.fetchingSupplierSupplies,
  supplierSuppliesQuality:suppliers.supplierSuppliesQuality
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplierSupplies,
      setSupplierSuppliesType,
      getSupplierSuppliesQuality
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SupplierSuppliesCardTable);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "black" : "grey",
          background: role === type ? "chartreuse":null,
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        {/* <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i> */}
      <div class="text-xl"></div>
      </Button>
    </Tooltip>
  );
}
function RoleButton1({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "black" : "grey",
          background: role === type ? "chartreuse":null,
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        {/* <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i> */}
        <div class="text-base">A2</div>
      </Button>
    </Tooltip>
  );
}
function RoleButton2({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "black" : "grey",
          background: role === type ? "chartreuse":null,
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        {/* <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i> */}
        <div class="text-base">A3</div>
      </Button>
    </Tooltip>
  );
}