
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplieSupplierList,setSuppliesSupplierType  } from "../SuppliesAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import SuppliesCardToggle from "./SuppliesCardToggle";
import { Tooltip,Button } from "antd";

const ButtonGroup = Button.Group;

function SuppliersCardTable(props) {
  useEffect(() => {
    props.getSupplieSupplierList(props.particularDiscountData.suppliesId);
  }, []);

  const [hasMore, setHasMore] = useState(true);


  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);

  const { handleUpdateShipperModal } = props;


  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // useEffect(() => {
  //   // props.emptysUPPLIERS();
  // }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "824",//0
          
          "1276",//1
              
       ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);


  return (
    <>
      <div className=' flex sticky  z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" md:w-[4.1rem]">  
              {/* Supplier */}
              {translatedMenuItems[0]}
              </div>
            <div className=" md:w-[9.1rem]">
              {/* Tag with Supplier */}
              {translatedMenuItems[1]}
              </div>
            <div className="w-[3.8rem]">
            </div>
          </div>
          <div class="overflow-x-auto ">
            <InfiniteScroll
              dataLength={props.supplieSupplerList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplieSupplerList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"80vh"}
              style={{scrollbarWidth:"thin"}}
            >
              {props.supplieSupplerList.length ?
                <>
                  {props.supplieSupplerList.map((item) => {
                    return (
                      <>
                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1"

                        >
                          <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem]  font-poppins">
                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"
                                  to={`${item.supplierId}`}
                                  title={`${item.supplierName}`}
                                >{item.supplierName}</Link>

                              </div>

                            </div>
                            <div className=" flex md:w-44 max-sm:justify-between w-full max-sm:flex-row ">



                              {/* <div class=" font-normal text-[0.85rem]  font-poppins">
                                {item.dialCode} {item.phoneNo}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem]  font-poppins">
                                {item.emailId}
                              </div>

                            </div>


                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem]  font-poppins">
                                {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
          ${(item.address && item.address.length && item.address[0].street) || ""}`}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem]  font-poppins">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].city) ||
                                  ""}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem]  font-poppins">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].postalCode) ||
                                  ""}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">*/}
<div class="  text-xs font-poppins">

 <SuppliesCardToggle
item={item}
suppliesId={props.particularDiscountData.suppliesId}
 />
</div>
</div>

<div class="flex flex-row items-center md:w-[6rem] max-sm:flex-row w-full max-sm:justify-end">

{item.supplierSuppliesInd && (              
  <>
                  <div>
                    <ButtonGroup>
                      <RoleButton
                        type="A1"
                        // iconType="fas fa-mug-hot"
                        tooltip="A1"
                        role={item.type}
                        onClick={() => {
                          props.setSuppliesSupplierType({
                            type:"A1",
                            supplierId:item.supplierId,
                            suppliesId:props.particularDiscountData.suppliesId,
                            supplierSuppliesInd:"true",
                          });
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton1
                        type="A2"
                        // iconType="fas fa-burn"
                        tooltip="A2"
                        role={item.type}
                        onClick={() => {
                          props.setSuppliesSupplierType({
                            type:"A2",
                            supplierId:item.supplierId,
                            suppliesId:props.particularDiscountData.suppliesId,
                            supplierSuppliesInd:"true",
                          });
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton2
                        type="A3"
                        // iconType="far fa-snowflake"
                        tooltip="A3"
                        role={item.type}
                        onClick={() => {
                          props.setSuppliesSupplierType({
                            type:"A3",
                            supplierId:item.supplierId,
                            suppliesId:props.particularDiscountData.suppliesId,
                            supplierSuppliesInd:"true",
                          });
                        }}
                      />
                    </ButtonGroup>
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
                !props.supplieSupplerList.length &&
                  !props.fetchingSupplieSupplerList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>
      </div>


    </>
  )
}
const mapStateToProps = ({  supplies, auth }) => ({
  supplieSupplerList: supplies.supplieSupplerList,
  userId: auth.userDetails.userId,
  fetchingSupplieSupplerList:supplies.fetchingSupplieSupplerList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplieSupplierList,
      setSuppliesSupplierType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersCardTable);

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
        <div class="text-base">A1</div>
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
          color: role === type ? "orange" : "grey",
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
          color: role === type ? "blue" : "grey",
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