import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
    getDistributorTable,
} from "../../AccountAction";

class DistributorDocumentTable extends Component {
    componentDidMount() {
        this.props.getDistributorTable(this.props.distributorId);
    }
    render() {
        const {
            documentTable,
            fetchingDocumentsByTable,
            fetchingDocumentsByTableError,

        } = this.props;
       

        return (
            <>
                <div className=' flex justify-end sticky z-auto'>
                <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]">Date</div>
                        <div className=" md:w-[5.1rem]">Name</div>
                        <div className=" md:w-[8.8rem] ">Description</div>
              
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        {this.props.documentTable.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                            {` ${dayjs(item.creationDate).format("YYYY-MM-DD")}`}

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.documentTitle}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.Description}
                                                </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </div>
     
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = ({ distributor }) => ({
    distributor: distributor.distributor,
    documentTable:distributor.documentTable,
    fetchingDocumentsByTable: distributor.fetchingDocumentsByTable,
    fetchingDocumentsByTableError:
        distributor.fetchingDocumentsByTableError,
    documentsByDistributorId: distributor.documentsByDistributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorTable,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorDocumentTable);




// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Icon } from "antd";
// import moment from "moment";
// import {
//     StyledTable,
// } from "../../../../../Components/UI/Antd";
// import {
//     getDistributorTable,
// } from "../../AccountAction";


// class DistributorDocumentTable extends Component {
//     componentDidMount() {
//         this.props.getDistributorTable(this.props.distributorId);
//     }
//     render() {
//         const {
//             documentTable,
//             fetchingDocumentsByTable,
//             fetchingDocumentsByTableError,

//         } = this.props;
//         const columns = [
//             {
//                 title: "Date",

//                 dataIndex: "creationDate",
//                 render: (name, item, i) => {
//                   return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
//                 },
//             },
//             {
//                 title: "Name",

//                 dataIndex: "documentTitle",
               
//             },
//             {
//                 title: "Description",

//                  dataIndex: "discription",

//             },
//             {
//                 //title: "Uploaded By",

//                 // dataIndex: "uploadedBy",
//                 // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//                 // sorter: (a, b) => a.taskType.length - b.taskType.length
//             },
//         ];

//         return (
//             <>
//                 {true && (
//                     <StyledTable
//                         // rowSelection={rowSelection}
//                         pagination={{ pageSize: 50 }}
//                         scroll={{ y: 280 }}
//                         expandedRowRender={(record) => {
//                             //debugger;
//                             // return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
//                         }}
//                         rowKey="CustomerId"
//                         columns={columns}
//                         dataSource={documentTable}
//                         Loading={
//                             fetchingDocumentsByTable ||
//                             fetchingDocumentsByTableError
//                         }
//                         onChange={console.log("task onChangeHere...")}
//                     />
//                 )}
//             </>
//         );
//     }
// }

// const mapStateToProps = ({ distributor }) => ({
//     distributor: distributor.distributor,
//     documentTable:distributor.documentTable,
//     fetchingDocumentsByTable: distributor.fetchingDocumentsByTable,
//     fetchingDocumentsByTableError:
//         distributor.fetchingDocumentsByTableError,
//     documentsByDistributorId: distributor.documentsByDistributorId,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getDistributorTable,
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(DistributorDocumentTable);


