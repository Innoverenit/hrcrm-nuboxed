// import React, { useEffect, useState, lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   getPrmotionData,
//   handleUpdatePromotionDrawer
// } from "./PrmotionAction";
// import dayjs from "dayjs";
// import TokenIcon from '@mui/icons-material/Token';
// import {  Tooltip } from "antd";
// import AcUnitIcon from '@mui/icons-material/AcUnit';
// import { StyledPopconfirm } from "../../../Components/UI/Antd";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import InfiniteScroll from "react-infinite-scroll-component";
// import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
// import { BundleLoader } from "../../../Components/Placeholder";
// import { Switch, Popconfirm } from "antd";
// import PrmotionProductionToggle from "./PrmotionProductionToggle";
// import PrmotionMaterialToggle from "./PrmotionMaterialToggle";
// import PrmotionSupplierInventoryToggle from "./PrmotionSupplierInventoryToggle";
// import PrmotionDiscountToggle from "./PrmotionDiscountToggle";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import PrmotionUpdateDrawer from "./PrmotionUpdateDrawer";


// const PrmotionTable = (props) => {
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(0);
//   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

// //   const handleRefurbishClick = (checked) => {
// //     Setrefurbish(checked);
// //     let data = {
// //       value: checked,
// //       //locationDetailsId:locationDetailsId,
// //       orgId: props.orgId,
// //       type: "production  ",
// //     };
// //     props.addingLocationToggle(data);
// //   };
// //   useEffect(() => {
// //     const fetchMenuTranslations = async () => {
// //       try {
// //         const itemsToTranslate = [
       
// //           "Name",//0
// //           "Address",//1
// //           "Production",//2
// //           "Refurbish",//3
// //           "Inventory",//4
// //           "Billing",//5
// //           "Corporate",//6
// //           "Project",//7
// //           "Retail",//8
// //           "Region"//9
         
// //         ];

// //         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
// //         setTranslatedMenuItems(translations);
// //       } catch (error) {
// //         console.error('Error translating menu items:', error);
// //       }
// //     };

// //     fetchMenuTranslations();
// //   }, [props.selectedLanguage]);
//   useEffect(() => {
//     props.getPrmotionData( );
//   }, []);

//   const [storedLoc, setStoredLoc] = useState({});
//   const handleStoredLocations = (locs) => {
//     setStoredLoc(locs);
//   }
// //   const handleLoadMore = () => {
// //     setPage(page + 1);
// //     props.getPrmotionData(props.orgId);
// //   }
// //   if (props.fetchingLocationData) return <BundleLoader />;
// console.log(props.promotionsData)
//   return (
//     <>
//       <div>
//         {/* <InfiniteScroll
//           dataLength={props.promotionsData.length}
//           next={handleLoadMore}
//           hasMore={hasMore}
//           loader={props.fetchingLocationData ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
//           height={"80vh"}
//         > */}
//           <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
//             <div className=" md:w-[7.5rem]">
//             Name</div>
//             <div className="   md:w-[9.1rem]">
//              Code 
//             </div>
//             <div className=" md:w-[6.1rem] ">
//              Discount In %
//               </div>
//               <div className=" md:w-[6.15rem] ">
//             Creation Date
//               </div>
//               <div className=" md:w-[6.14rem] ">
//            Start Date
//               </div>
//               <div className=" md:w-[6.13rem] ">
//             End Date
//               </div>
//             <div className=" md:w-[7.9rem] ">
//            Catalogue
//             </div>
//             <div className="md:w-[7.51rem]">
//            Material
//               </div>
//             <div className=" md:w-[7.9rem] ">
//           SupplierInventory
//             </div>
//             <div className=" md:w-[6.12rem] ">
//              Discount Type
//               </div>
            
//           </div>
//           <div class="">
         
//                                 {props.promotionsData.map((item) => {
//                                     const currentdate = dayjs().format("DD/MM/YYYY");
//                                     const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//                                     const sdate = dayjs(item.startDate).format("DD/MM/YYYY");
//                                     const edate = dayjs(item.endDate).format("DD/MM/YYYY");
//                                     return (
//                                         <>
//                                        <div  >
//                   <div class=" flex rounded  justify-between  bg-white mt-1 h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
//                     <div class="flex">
//                       <div className=" flex  flex-row md:w-[14.12rem] max-sm:flex-row w-full max-sm:justify-between ">


//                         <div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
//                           {item.promoCodeName}
//                         </div>


                       
                        
//                       </div>
//                       <div className=" flex  flex-row md:w-[17.12rem] max-sm:flex-row w-full max-sm:justify-between ">


// <div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
//   {item.promoCode}
// </div>




// </div>
// <div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


// <div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
//   {item.discountValue}%
// </div>




// </div>
// <div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


// <div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
//   {date}
// </div>




// </div>
// <div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


// <div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
//   {sdate}
// </div>




// </div>
// <div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


// <div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
//   {edate}
// </div>




// </div>
//                     </div>


//                     <div className=" flex  flex-row md:w-[11.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

//                       <div class=" font-normal text-xs  font-poppins">
//                       <PrmotionProductionToggle
//                           promoCodeId={item.promoCodeId}
//                           productInd={item.productInd}
//                         />
//                         {/* <Switch
//                           className="toggle-clr"
//                           checked={item.productInd }
//                          isLoading={true}
//                           checkedChildren="Yes"
//                           unCheckedChildren="No"
//                           //disabled={!props.orderManagementInd}
//                         /> */}
//                       </div>
//                     </div>
//                     <div className=" flex  flex-row md:w-[7.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


// <div class=" font-normal text-xs  font-poppins">
//    <PrmotionMaterialToggle
//                           promoCodeId={item.promoCodeId}
//                           materialInd={item.materialInd}
//                         />
// </div>
// </div>
//                     <div className=" flex  flex-row md:w-[7.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


//                       <div class=" font-normal text-xs  font-poppins">
                    
//                          <PrmotionSupplierInventoryToggle
//                           promoCodeId={item.promoCodeId}
//                           supplierInventoryInd={item.supplierInventoryInd}
//                         />
//                       </div>
//                     </div>
//                     <div className=" flex  flex-row md:w-[7.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


// <div class=" font-normal text-xs  font-poppins">
//                        <PrmotionDiscountToggle
//                           promoCodeId={item.promoCodeId}
//                           discountType={item.discountType}
//                         />
// </div>
// <div>
//                         <Tooltip title="Edit">
//                           <BorderColorIcon
//                             className="!text-icon cursor-pointer text-[tomato]"
//                             onClick={() => {
//                               handleStoredLocations(item);
//                               props.handleUpdatePromotionDrawer(true);
//                             }}
//                           />
//                         </Tooltip>
//                       </div>
// </div>
//                   </div>
//                 </div>   
//                                         </>
//                                     )
//                                 })}
//           </div>
//           <PrmotionUpdateDrawer
//         storedLoc={storedLoc}
//         prmotionUpdatedrawr={props.prmotionUpdatedrawr}
//         handleUpdatePromotionDrawer={props.handleUpdatePromotionDrawer}
//       />
//       </div>
      
//     </>
//   );
// };
// const mapStateToProps = ({promotion , auth }) => ({

//   orgId: auth.userDetails.organizationId,
//   promotionsData: promotion.promotionsData,
//   prmotionUpdatedrawr:promotion.prmotionUpdatedrawr
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//      getPrmotionData,
//      handleUpdatePromotionDrawer
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(PrmotionTable);



import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPrmotionData,
  handleUpdatePromotionDrawer,
  //applyFilter,
} from './PrmotionAction';
import { Tooltip } from "antd";
import dayjs from 'dayjs';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SortIcon from '@mui/icons-material/Sort';
import PrmotionProductionToggle from './PrmotionProductionToggle';
import PrmotionMaterialToggle from './PrmotionMaterialToggle';
import PrmotionSupplierInventoryToggle from './PrmotionSupplierInventoryToggle';
import PrmotionDiscountToggle from './PrmotionDiscountToggle';
import PrmotionUpdateDrawer from './PrmotionUpdateDrawer';

const PrmotionTable = (props) => {
  const [filters, setFilters] = useState({
    column: '',
    value: '',
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "1555",  // Column name,//0
        "1556" , //"Filter value"//1
         "1557", //  Apply Filter,//2
         "110", //  Name,//3
        "1558" , //  Code,//4
          "1559",//  Discount In %//5
         "289", //   Creation Date,//6
           "176",   //  Start Date7
           "126" ,  //    End Date8
         "725" ,// Catalogue9
             "796",   //  Material10
             "1083",   //  Supplier11
           "880" ,//  Inventory12
             "1560",  //  Discount Type13
             "170",  //  "Edit"14

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    props.getPrmotionData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilter = () => {
    props.applyFilter(filters);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    let sortableItems = [...props.promotionsData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  };

  const [storedLoc, setStoredLoc] = useState({});
  const handleStoredLocations = (locs) => {
    setStoredLoc(locs);
  };

  return (
    <>
      <div>
        <div className="flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
          <div className="relative group">
            <input
              type="text"
              name="column"
              value={filters.column}
              onChange={handleFilterChange}
              placeholder={translatedMenuItems[0]}
              // "Column name"
              className="border rounded p-1"
            />
            <input
              type="text"
              name="value"
              value={filters.value}
              onChange={handleFilterChange}
              placeholder={translatedMenuItems[1]}
              // "Filter value"
              className="border rounded p-1 ml-2"
            />
            <button onClick={handleApplyFilter} className="bg-blue-500 text-white h-8 p-2 rounded ml-2">
            {translatedMenuItems[2]} {/* Apply Filter */}
            </button>
          </div>
        </div>

        <div className="flex justify-between w-full p-1 bg-transparent font-bold text-xs font-poppins sticky z-10">
          <div className="md:w-[7.5rem] relative group">
            <span
              onClick={() => handleSort('promoCodeName')}
              className="cursor-pointer flex items-center"
            >
            {translatedMenuItems[3]}  {/* Name */}
              {sortConfig.key === 'promoCodeName' && (
                sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
              )}
              <SortIcon className="hidden group-hover:block ml-2 !text-icon" />
            </span>
          </div>
          <div className="   md:w-[9.1rem]">
          {translatedMenuItems[4]}{/* Code  */}
            </div>
            <div className=" md:w-[6.1rem] ">
            {translatedMenuItems[5]}  {/* Discount In % */}
              </div>
              <div className=" md:w-[6.15rem] ">
              {translatedMenuItems[6]} {/* Creation Date */}
              </div>
              <div className=" md:w-[6.14rem] ">
              {translatedMenuItems[7]}  {/* Start Date */}
              </div>
              <div className=" md:w-[6.13rem] ">
              {translatedMenuItems[8]}  {/* End Date */}
              </div>
            <div className=" md:w-[7.9rem] ">
            {translatedMenuItems[9]}
            {/* Catalogue */}
            </div>
            <div className="md:w-[7.51rem]">
            {translatedMenuItems[10]} 
            {/* Material */}
              </div>
            <div className=" md:w-[3.9rem] ">
            {translatedMenuItems[11]} {/* Supplier */}
            </div>
            <div className=" md:w-[3.9rem] ">
            {translatedMenuItems[12]}   {/* Inventory */}
            </div>
            <div className=" md:w-[6.12rem] ">
            {translatedMenuItems[13]}    {/* Discount Type */}
              </div>
            
        </div>

        <div>
          {sortedData().map((item) => {
            const date = dayjs(item.creationDate).format('DD/MM/YYYY');
            const sdate = dayjs(item.startDate).format('DD/MM/YYYY');
            const edate = dayjs(item.endDate).format('DD/MM/YYYY');
            return (
              <div key={item.promoCodeId} >
              <div class=" flex rounded  justify-between  bg-white mt-1 h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                <div class="flex">
                  <div className=" flex  flex-row md:w-[14.12rem] max-sm:flex-row w-full max-sm:justify-between ">


                    <div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
                      {item.promoCodeName}
                    </div>


                   
                    
                  </div>
                  <div className=" flex  flex-row md:w-[17.12rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
{item.promoCode}
</div>




</div>
<div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
{item.discountValue}%
</div>




</div>
<div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
{date}
</div>




</div>
<div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
{sdate}
</div>




</div>
<div className=" flex  flex-row md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">


<div class=" font-normal text-xs font-poppins md:w-[10.1rem]">
{edate}
</div>




</div>
                </div>


                <div className=" flex  flex-row md:w-[11.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                  <div class=" font-normal text-xs  font-poppins">
                  <PrmotionProductionToggle
                      promoCodeId={item.promoCodeId}
                      productInd={item.productInd}
                    />
                    {/* <Switch
                      className="toggle-clr"
                      checked={item.productInd }
                     isLoading={true}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                      //disabled={!props.orderManagementInd}
                    /> */}
                  </div>
                </div>
                <div className=" flex  flex-row md:w-[7.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


<div class=" font-normal text-xs  font-poppins">
<PrmotionMaterialToggle
                      promoCodeId={item.promoCodeId}
                      materialInd={item.materialInd}
                    />
</div>
</div>
                <div className=" flex  flex-row md:w-[7.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


                  <div class=" font-normal text-xs  font-poppins">
                
                     <PrmotionSupplierInventoryToggle
                      promoCodeId={item.promoCodeId}
                      supplierInventoryInd={item.supplierInventoryInd}
                    />
                  </div>
                </div>
                <div className=" flex  flex-row md:w-[7.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


<div class=" font-normal text-xs  font-poppins">
                   <PrmotionDiscountToggle
                      promoCodeId={item.promoCodeId}
                      discountType={item.discountType}
                    />
</div>
<div>
                    <Tooltip title= {translatedMenuItems[14]} >
                      <BorderColorIcon
                        className="!text-icon cursor-pointer text-[tomato]"
                        onClick={() => {
                          handleStoredLocations(item);
                          props.handleUpdatePromotionDrawer(true);
                        }}
                      />
                    </Tooltip>
                  </div>
</div>
              </div>
            </div>   
            );
          })}
        </div>

        <PrmotionUpdateDrawer
        storedLoc={storedLoc}
        prmotionUpdatedrawr={props.prmotionUpdatedrawr}
        handleUpdatePromotionDrawer={props.handleUpdatePromotionDrawer}
      />
      </div>
    </>
  );
};

const mapStateToProps = ({promotion , auth }) => ({

    orgId: auth.userDetails.organizationId,
    promotionsData: promotion.promotionsData,
    prmotionUpdatedrawr:promotion.prmotionUpdatedrawr
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
       getPrmotionData,
       handleUpdatePromotionDrawer
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(PrmotionTable);

