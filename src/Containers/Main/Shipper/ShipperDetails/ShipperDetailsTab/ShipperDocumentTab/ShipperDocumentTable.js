import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { getShipperDocument } from "../../../ShipperAction";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

class ShipperDocumentTable extends Component {
  componentDidMount() {
    this.props.getShipperDocument(this.props.shipperId);
  }

  render() {
    const {
      documentsByShipperId,
      fetchingDocumentsByShipperId,
      fetchingDocumentsByShipperIdError,
    } = this.props;
     if (fetchingDocumentsByShipperId) {
    return <BundleLoader />;
  }

    return (
      <>
        <div className="flex  sticky  z-auto">
          <div className="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className="flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
              <div className="md:w-[0.5rem]"></div>
              <div className="md:w-[7.4rem]">
                <FormattedMessage id="app.date" defaultMessage="Date" />
              </div>
              <div className="md:w-[5.1rem]">
                <FormattedMessage id="app.name" defaultMessage="Name" />
              </div>
              <div className="md:w-[8.8rem]">
                <FormattedMessage id="app.description" defaultMessage="Description" />
              </div>
              <div className="md:w-[8.8rem]">
                <FormattedMessage id="app.uploadedby" defaultMessage="Uploaded By" />
              </div>
            </div>
            <div className="overflow-x-auto h-[64vh]">
              {documentsByShipperId.length > 0 ? (
                documentsByShipperId.map((item) => (
                  <div key={item.id}>
                    <div className="flex rounded mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col">
                      <div className="flex w-3/4">
                        <div className="flex font-medium flex-col md:w-[1.56rem] max-sm:w-full">
                          {moment(item.creationDate).format("ll")}
                        </div>
                        <div className="flex font-medium flex-col md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs text-cardBody font-poppins text-center">
                            {item.contactDocumentName}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs text-cardBody font-poppins text-center">
                            {item.description}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs text-cardBody font-poppins text-center">
                            {item.uploadedBy}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-5">
                  <NodataFoundPage />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  shipper: shipper.shipper,
  fetchingDocumentsByShipperId: shipper.fetchingDocumentsByShipperId,
  fetchingDocumentsByShipperIdError: shipper.fetchingDocumentsByShipperIdError,
  documentsByShipperId: shipper.documentsByShipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDocumentTable);



// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import moment from "moment";
// import {
//   StyledTable,
// } from "../../../../../../Components/UI/Antd";
// import {
//   getShipperDocument,
// } from "../../../ShipperAction";
// import { OnlyWrapCard } from '../../../../../../Components/UI/Layout';

// class ShipperDocumentTable extends Component {
//   componentDidMount() {
//     this.props.getShipperDocument(this.props.shipperId);
//   }
//   render() {
//     const {
//       documentsByShipperId,
//       fetchingDocumentsByShipperId,
//       fetchingDocumentsByShipperIdError,
//     } = this.props;
//     const columns = [
//       {
//         title: "Date",

//         // dataIndex: "creationDate",
//         // render: (name, item, i) => {
//         //   return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
//         // },
//       },
//       {
//         title: "Name",

//         dataIndex: "contactDocumentName",
//         // onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
//         // sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
//       },
//       {
//         title: "Description",

//         // dataIndex: "documentType",
//         // width: "20%",
//         // render: (name, item, i) => {
//         //   console.log(item);
//         //   return <span>{elipsize(item.documentType || "", 15)}</span>;
//         // },
//         // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//         // sorter: (a, b) => a.taskType.length - b.taskType.length,
//       },
//       {
//         title: "Uploaded By",

//         // dataIndex: "uploadedBy",
//         // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
//         // sorter: (a, b) => a.taskType.length - b.taskType.length
//       },
//     ];

//     return (
//       <>
//         {true && (
//           <StyledTable
//             // rowSelection={rowSelection}
//             pagination={{ pageSize: 50 }}
//             scroll={{ y: 280 }}
//             expandedRowRender={(record) => {
//               //debugger;
//               // return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
//             }}
//             rowKey="CustomerId"
//             columns={columns}
//             dataSource={documentsByShipperId}
//             Loading={
//               fetchingDocumentsByShipperId || fetchingDocumentsByShipperIdError
//             }
//           />
//         )}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ shipper }) => ({
//   shipper: shipper.shipper,
//   fetchingDocumentsByShipperId: shipper.fetchingDocumentsByShipperId,
//   fetchingDocumentsByShipperIdError: shipper.fetchingDocumentsByShipperIdError,
//   documentsByShipperId: shipper.documentsByShipperId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getShipperDocument,
//       //   deleteDocument,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ShipperDocumentTable);
