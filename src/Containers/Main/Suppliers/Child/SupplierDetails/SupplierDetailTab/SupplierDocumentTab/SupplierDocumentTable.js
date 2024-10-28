import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import dayjs from "dayjs";
import {
  getSupplierDocument,
  // deleteDocument
} from "../../../../SuppliersAction";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

class SupplierDocumentTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
      loading: true
    };
  }
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
    this.props.getDepartments();
    
  }
  componentDidMount() {
    this.fetchMenuTranslations();
    this.props.getSupplierDocument(this.props.supplier.supplierId);
  }
  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
       '74', // 0Date
'110', // 1 Name
'147', // 2 Description
'1207', // 3Uploaded By


      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
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
        //   return <span>{` ${dayjs(item.creationDate).format("ll")}`}</span>;
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
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
    return (
      <>
       <div className="flex justify-end sticky  z-auto">
          <div className="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
            <div className="flex max-sm:hidden justify-between w-[100%]  p-2 bg-transparent font-bold sticky top-0 z-10">
              <div className="md:w-[0.5rem]"></div>
              <div className="md:w-[7.4rem] w-[7.4rem] text-[#00A2E8] text-base font-poppins font-bold"> {translatedMenuItems[0]} 
              {/* Date */}
              </div>
              <div className="md:w-[5.1rem] w-[5.1rem] font-poppins font-bold text-xs"> {translatedMenuItems[1]} 
              {/* Name */}
              </div>
              <div className="md:w-[8.8rem] w-[8.8rem] font-poppins font-bold text-xs"> {translatedMenuItems[2]} 
               {/* Description */}
              </div>
              <div className="md:w-[8.8rem]  w-[8.8rem] font-poppins font-bold text-xs"> {translatedMenuItems[3]} 
               {/* Uploaded By */}
              </div>
            </div>
            <div className="overflow-x-auto h-[64vh]">
              {documentsBySupplierId.length > 0 ? (
                documentsBySupplierId.map((item) => (
                  <div key={item.id}>
                    <div className="flex rounded mt-1 bg-white  items-center max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                      <div className="flex w-3/4 ">
                        <div className="flex border-l-2 h-8 border-green-500 bg-[#eef2f9] md:w-[1.56rem] max-sm:w-full">
                          {dayjs(item.creationDate).format("ll")}
                        </div>
                        <div className="flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs ml-gap font-poppins text-center">
                            {item.contactDocumentName}
                          </div>
                        </div>
                        <div className="flex  items-center  h-8 ml-gap bg-[#eef2f9] md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {item.description}
                          </div>
                        </div>
                        <div className="flex items-center h-8 ml-gap bg-[#eef2f9] md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
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
