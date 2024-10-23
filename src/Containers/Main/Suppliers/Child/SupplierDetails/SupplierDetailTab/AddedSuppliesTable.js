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
import { getGeneratorSuppliersList } from "../../../SuppliersAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function AddedSuppliesTable(props) {
    useEffect(() => {
        props.getGeneratorSuppliersList()
    }, [])
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class=" m-3 p-1 h-62vh overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between  p-1 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" font-poppins text-xs md:w-[19.1rem]">
                            Name
                        </div>
                        <div className="font-poppins text-xs md:w-[14.1rem]">
                            Category
                        </div>
                        <div className="font-poppins text-xs md:w-[14.1rem]">
                            Sub-category
                        </div>
                        <div className="font-poppins text-xs md:w-[14.1rem]">
                            Attribute
                        </div>
                        <div className="font-poppins text-xs md:w-[14.1rem]">
                            Sub-attribute
                        </div>
                       
                        <div className="font-poppins text-xs md:w-[5.1rem]">
                            Quality
                        </div>
                        <div className="font-poppins text-xs md:w-[5.1rem]">
                            Units
                        </div>

                    </div>
                    <div class="overflow-x-auto h-[57vh]">

                        <>
                            {props.generatorSuppliers.map((item) => {


                                return (
                                    <>
                                        <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3" >
                                            <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                <div className=" flex font-medium flex-col w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                    <div class=" font-normal text-xs  font-poppins">
                                                        {item.suppliesFullName}

                                                    </div>
                                                </div>
                                                <div className=" flex w-[5rem] max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs  font-poppins">
                                                        {item.categoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex  w-[5rem] max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs  font-poppins">

                                                        {item.subCategoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[6rem] max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs  font-poppins">

                                                        {item.attributeName}
                                                    </div>
                                                </div>
                                                <div className=" flex w-[8rem] max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs  font-poppins">
                                                        {item.subAttributeName}
                                                    </div>
                                                </div>
                                               
                                                <div className=" flex  w-12 max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs  font-poppins">
                                                        {item.quality}
                                                    </div>
                                                </div>
                                                <div className=" flex  w-12 max-sm:justify-between  max-sm:flex-row ">
                                                    <div class="  text-xs  font-poppins">
                                                        {item.unit}
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


