import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierSupplies,setSupplierSuppliesType,getSupplierSuppliesQuality  } from "../../../../SuppliersAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';
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

  const [currentType, setCurrentType] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);

  const { handleUpdateShipperModal } = props;


  const handleRowData = (data) => {
    setrowData(data);
  };

  const handleSetCurrentType = (value, item) => {
    setCurrentType({
      ...currentType,
      [item.suppliesId]: value
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

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
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[7.1rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
             <div className="md:w-[7.9rem]">
              <FormattedMessage id="app.category" defaultMessage="Category" />
              </div>
              <div className="md:w-[7.9rem]">
              <FormattedMessage id="app.attribute" defaultMessage="Attribute" />
              </div>
            <div className=" md:w-[10.11rem]">  <FormattedMessage
              id="app.attachwithsuplier"
              defaultMessage="Attach with Supplier"
            /></div>
            {/* <div className=" md:w-[5.1rem]">
              <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
            </div>
            <div className=" md:w-[6.8rem] ">  <FormattedMessage id="app.email" defaultMessage="Email" /></div>
            <div className="md:w-[7.8rem]">
              <FormattedMessage id="app.address" defaultMessage="Address" />

            </div>
            <div className="md:w-[7.9rem]">
              <FormattedMessage id="app.city" defaultMessage="City" />

            </div>
            <div className="md:w-[5.2rem]">
              <FormattedMessage id="app.pinCode" defaultMessage="PinCode" />

            </div> */}
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
            >
              {props.supplierSuppliesList.length ?
                <>
                  {props.supplierSuppliesList.map((item) => {
                    return (
                      <>
                        <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3"

                        >
                          <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"
                                  to={`supplier/${item.supplierId}`}
                                  title={`${item.suppliesName}`}
                                >{item.suppliesName}</Link>

                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {item.categoryName} {item.subCategoryName}
                              </div>
                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                              {item.attributeName} {item.subAttributeName}
                              </div>

                            </div>

                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            
<SupplierSuppliesToggle
item={item}
supplierId={props.supplier.supplierId}
/>


</div>
<div>   
{item.supplierSuppliesInd &&( 
  <>
<div class="flex flex-row items-center md:w-[8rem] max-sm:flex-row w-full max-sm:justify-end">
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
  </div>          */}
  <Select
          showSearch
          
          placeholder="Search or select include"
          optionFilterProp="children"
          // loading={isLoadingInclude}
          // onFocus={handleSelectIncludeFocus}
          onChange={(value) => handleSetCurrentType(value, item)}
          defaultValue={item.type || []} 
          mode="multiple" 
        >
          {props.supplierSuppliesQuality.map(opt => (
            <Option key={opt.qualityId} value={opt.qualityId}>
              {opt.code}
            </Option>
          ))}
        </Select>
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
      <div class="text-base"></div>
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