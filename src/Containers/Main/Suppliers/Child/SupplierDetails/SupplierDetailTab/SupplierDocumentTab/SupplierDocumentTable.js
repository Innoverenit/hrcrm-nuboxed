import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
  getSupplierDocument,
  // deleteDocument
} from "../../../../SuppliersAction";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

class SupplierDocumentTable extends Component {
  componentDidMount() {
    this.props.getSupplierDocument(this.props.supplier.supplierId);
  }
  render() {
    const {
      documentsBySupplierId,
      documentsByDistributorId,
      fetchingDocumentsBySupplierId,
      fetchingDocumentsBySupplierIdError,
    } = this.props;
    const columns = [
      {
        title: "Date",

        // dataIndex: "creationDate",
        // render: (name, item, i) => {
        //   return <span>{` ${moment(item.creationDate).format("ll")}`}</span>;
        // },
      },
      {
        title: "Name",

        dataIndex: "contactDocumentName",
        // onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
        // sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
      },
      {
        title: "Description",

        // dataIndex: "documentType",
        // width: "20%",
        // render: (name, item, i) => {
        //   console.log(item);
        //   return <span>{elipsize(item.documentType || "", 15)}</span>;
        // },
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length,
      },
      {
        title: "Uploaded By",

        // dataIndex: "uploadedBy",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
      },
    ];
    if (fetchingDocumentsBySupplierId) {
      return <BundleLoader />;
    }

    return (
      <>
       <div className="flex justify-end sticky  z-auto">
          <div className="rounded-lg max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className="flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
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
              {documentsBySupplierId.length > 0 ? (
                documentsBySupplierId.map((item) => (
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
        {/* {true && (
          <StyledTable
            // rowSelection={rowSelection}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 280 }}
            expandedRowRender={(record) => {
              //debugger;
              // return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="CustomerId"
            columns={columns}
            dataSource={this.props.documentsBySupplierId}
            Loading={
              fetchingDocumentsBySupplierId ||
              fetchingDocumentsBySupplierIdError
            }
          />
        )} */}
      </>
    );
  }
}

const mapStateToProps = ({ suppliers }) => ({
  suppliers: suppliers.suppliers,
  fetchingDocumentsBySupplierId: suppliers.fetchingDocumentsBySupplierId,
  fetchingDocumentsBySupplierIdError:
    suppliers.fetchingDocumentsBySupplierIdError,
  documentsBySupplierId: suppliers.documentsBySupplierId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplierDocument,
      //   deleteDocument,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierDocumentTable);
