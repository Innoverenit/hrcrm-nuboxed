// import React, { useEffect } from 'react'
// import { StyledTable } from '../../../../../../Components/UI/Antd'
// import { getGeneratorSuppliersList } from "../../../SuppliersAction"
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// function AddedSuppliesTable (props)  {
//     useEffect(() => {
//         props.getGeneratorSuppliersList()
//     }, [])
//     const columns = [
//         {
//             title: "Name",
//             dataIndex: "suppliesFullName",
//             width: "20%"
//         },
//         {
//             title: "Category",
//             dataIndex: "categoryName",
//             width: "15%"
//         },
//         {
//             title: "Sub-category",
//             dataIndex: "subCategoryName",
//             width: "15%"
//         },
//         {
//             title: "Attribute",
//             dataIndex: "attributeName",
//             width: "15%"
//         },
//         {
//             title: "Sub-attribute",
//             dataIndex: "subAttributeName",
//             width: "15%"
//         },

//         {
//             title: "Units",
//             dataIndex: "unit",
//             width: "15%"
//         }
//     ]
//     return (
//         <>
//             <StyledTable
//                 columns={columns}
//                 dataSource={props.generatorSuppliers}
//                 pagination={false}
//             />
//         </>
//     )
// }
// const mapStateToProps = ({ suppliers }) => ({
//     generatorSuppliers: suppliers.generatorSuppliers
// });
// const mapDispatchToProps = dispatch => bindActionCreators({
//     getGeneratorSuppliersList
// }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(AddedSuppliesTable);


import React, { useEffect } from 'react'
import { StyledTable } from '../../../../../../Components/UI/Antd'
import { getGeneratorSuppliersList } from "../../../SuppliersAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function AddedSuppliesTable (props)  {
    useEffect(() => {
        props.getGeneratorSuppliersList()
    }, [])
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[90.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[19.1rem]">
                        Name
                            </div>
                        <div className=" md:w-[14.1rem]">
                        Category
                        </div>
                        <div className=" md:w-[14.1rem]">
                        Sub-category
                        </div>
                        <div className=" md:w-[14.1rem]">
                        Attribute
                        </div>
                        <div className=" md:w-[14.1rem]">
                        Sub-attribute
                        </div>
                        <div className=" md:w-[5.1rem]">
                        Units
                        </div>
                        <div className=" md:w-[5.1rem]">
                        Quality
                        </div>
                   
                        
                       
                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        
                             <>
                                {props.generatorSuppliers.map((item) => {
                                    
                                    
                                    return (
                                        <>
                                            <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3" >
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                    <div className=" flex font-medium flex-col w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                            {item.suppliesFullName}

                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col w-[10rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                        {item.categoryName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col w-[5rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">

                                                            {item.subCategoryName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col w-[6rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">

                                                            {item.attributeName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col w-[8rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                            {item.subAttributeName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col w-12 max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                           {item.unit}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col w-12 max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                           {item.quality}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                
                        
                    </div>
                </div>
            </div>
            
            
            
        </>
    )
}
const mapStateToProps = ({ suppliers }) => ({
    generatorSuppliers: suppliers.generatorSuppliers
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getGeneratorSuppliersList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddedSuppliesTable);


