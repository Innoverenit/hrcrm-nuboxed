import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierSupplies,setSupplierSuppliesType,getSupplierSuppliesQuality  } from "../../../../SuppliersAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip,Button,Select } from "antd";
import SupplierSuppliesToggle from "./SupplierSuppliesToggle";
import NewSupploesForm from "./NewSupploesForm";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AttractionsIcon from "@mui/icons-material/Attractions";
import PublishIcon from "@mui/icons-material/Publish";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmptyPage from "../../../../../EmptyPage";

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
    <div className="flex">
      <NewSupploesForm/>
      <div className=' flex sticky w-[70%]  z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%] p-1 bg-transparent  !text-lm font-poppins font-bold sticky items-end max-xl:text-[0.65rem] z-10">
            <div className="text-[#00A2E8] text-sm w-[13.1rem] truncate max-md:w-[28.1rem]  max-xl:w-[6.6rem]"><ApartmentIcon className="  !text-icon"/>   {translatedMenuItems[0]}
              {/* Name */}
            </div>
             <div className="w-[14.9rem]  truncate max-md:w-[15.9rem] max-xl:w-[6.9rem]">  <WidgetsIcon className=" !text-icon"/> {translatedMenuItems[1]}
             {/* Category */}
              </div>
              <div className="w-[7.91rem] max-xl:w-[4.9rem] truncate max-md:w-[3.91rem] ">  < AttractionsIcon className=" !text-icon"/> {translatedMenuItems[2]}
              {/* Attribute */}
              </div>
            <div className=" w-[10.11rem]  truncate max-md:w-[10.11rem] max-xl:w-[14.11rem]">  <PublishIcon className=" !text-icon"/>  {translatedMenuItems[3]}
         {/* Tag with Supplier" */}
           </div>
                <div className=" w-[12.12rem]  truncate max-md: w-[10.12rem] max-xl:w-[14.11rem]">  <VerifiedUserIcon className=" !text-icon" /> {translatedMenuItems[4]}
                  {/* Quality */}
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
                        <div className="flex rounded justify-between py-ygap mt-1 bg-white  items-center max-xl:text-[0.65rem] scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"

                        >
                          <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                            <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9] truncate w-[14.1rem]  max-md:w-[22.1rem] max-xl:w-[9.2rem] items-center  max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs ml-gap font-poppins ">                        
                                  {item.suppliesName}
                                  {/* </Link> */}

                              </div>
                            </div>
                            <div className=" flex justify-start  h-8 ml-gap bg-[#eef2f9] truncate w-[16.01rem] max-md:w-[24.01rem] max-xl:w-[10.01rem] items-center max-sm:justify-between  max-sm:flex-row ">

                              <div class="  text-xs ml-gap font-poppins ">
                                {item.categoryName} {item.subCategoryName}
                              </div>
                            </div>
                            <div className=" flex  justify-start  h-8 ml-gap bg-[#eef2f9] w-[7.9rem] max-md:w-[7.9rem] max-xl:w-[6.9rem] items-center max-sm:justify-between  max-sm:flex-row ">
                              <div class=" text-xs ml-gap font-poppins ">
                              {item.attributeName} {item.subAttributeName}
                              </div>
                            </div>

                            <div className=" flex   justify-start h-8 ml-gap bg-[#eef2f9] w-[10.25rem] max-md:w-[13.25rem] max-xl:w-[9.2rem] items-center max-sm:justify-between  max-sm:flex-row ">
                            
<SupplierSuppliesToggle
item={item}
supplierId={props.supplier.supplierId}

/>


</div>
<div className="w-[12.1rem] max-md:w-[10.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]">   
{item.supplierSuppliesInd &&( 
  <>
<div class="flex flex-row items-center  w-[12rem]  max-sm:flex-row  max-sm:justify-end">

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
                  !props.fetchingSupplierSupplies ? <EmptyPage /> : null}
            </InfiniteScroll>
          </div>
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

