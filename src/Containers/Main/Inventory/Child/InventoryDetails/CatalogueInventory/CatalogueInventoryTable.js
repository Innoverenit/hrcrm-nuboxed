import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProductRepurbish } from "../../../InventoryAction";


const CatalogueInventoryTable = (props) => {

    useEffect(() => {
        props.getProductRepurbish(props.locationDetailsId);
    }, []);

    const [RowData, setRowData] = useState({});
    function handleSetRowData(item) {
        setRowData(item);
    }
  


    return (
        <>
              <div className=' flex justify-end sticky top-28 z-auto'>
              <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         <div className=" flex justify-between w-[100%]  px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className="md:w-[5.2rem]"> <FormattedMessage id="app.name" defaultMessage="Name" /></div>
         <div className=" md:w-[4.2rem] "><FormattedMessage id="app.category" defaultMessage="Category"/></div>
        <div className=" md:w-[6.2rem] "><FormattedMessage id="app.subcategory" defaultMessage="Sub Category"/></div>
        <div className="md:w-[5.8rem]"><FormattedMessage id="app.attribute" defaultMessage="Attribute"/></div>
        <div className="md:w-[5.8rem]"><FormattedMessage id="app.subattribute" defaultMessage="Sub Attribute"/></div>
        <div className="md:w-[8.5rem]"><FormattedMessage id="app.units" defaultMessage="Units"/></div>
        <div className="w-12"></div>
            </div>
       
             {props.refurbishProduct.map((item) => {
              
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
   
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
    {item.name}
                            </div>
    </div>
 
 
    </div>
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
                      {item.categoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
                      {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {item.attributeName} 
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
     {item.subAttributeName}
                    </div>
    </div>

    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
        <div class=" text-xs  font-semibold  font-poppins">
        {item.unit}
             </div>
    </div>
</div>
</div>
          );
        })}
  
              </div>
              </div>
   
        </>
    )
}

const mapStateToProps = ({ inventory, auth }) => ({
    refurbishProduct: inventory.refurbishProduct,
    userId: auth.userDetails.userId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getProductRepurbish
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueInventoryTable);


// import React, { useEffect, useState } from 'react'
// import { StyledTable } from '../../../../../../Components/UI/Antd'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { getProductRepurbish } from "../../../InventoryAction";


// const CatalogueInventoryTable = (props) => {

//     useEffect(() => {
//         props.getProductRepurbish(props.locationDetailsId);
//     }, [])

//     const [RowData, setRowData] = useState({});
//     function handleSetRowData(item) {
//         setRowData(item);
//     }
  
//     const column = [
//         {
//             title: "",
//             width: "1%"
//         },

//         {
//             title: "Name",
//             width: "15%",
//             dataIndex: 'name'
//         },

//         {
//             title: "Category",
//             width: "18%",
//             dataIndex: "categoryName"
//         },
//         {
//             title: "Sub Category",
//             width: "18%",
//             dataIndex: "subCategoryName"
//         },
//         {
//             title: "Attribute",
//             width: "10%",
//             dataIndex: "attributeName"
//         },
//         {
//             title: "Sub Attribute",
//             width: "10%",
//             dataIndex: "subAttributeName"
//         },
//         {
//             title: "Units",
//             width: "13%",
//             dataIndex: "unit",
//         },
        

//     ];

//     return (
//         <>
//             <StyledTable
//                 dataSource={props.refurbishProduct}
//                 pagination={false}
//                 columns={column}
//             />
//         </>
//     )
// }

// const mapStateToProps = ({ inventory, auth }) => ({
//     refurbishProduct: inventory.refurbishProduct,
//     userId: auth.userDetails.userId,
//     locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
// });
// const mapDispatchToProps = dispatch =>
//     bindActionCreators({
//         getProductRepurbish
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(CatalogueInventoryTable);

