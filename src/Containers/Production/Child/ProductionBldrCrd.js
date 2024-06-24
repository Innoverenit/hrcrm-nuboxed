import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button } from "antd";
import { getBuilderByProId, removeProductBuilder, PstoProductionBuilder } from "../../Product/ProductAction";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { MultiAvatar } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";

function ProductionBldrCrd(props) {
  useEffect(() => {
    props.getBuilderByProId(props.particularDiscountData.productId);
  }, []);

  const [editableRowIndex, setEditableRowIndex] = useState(-1);
  const [editedRowData, setEditedRowData] = useState(null);

  const handleEditClick = (index, rowData) => {
    setEditableRowIndex(index);
    setEditedRowData({ ...rowData });
  };

  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;
    setEditedRowData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSaveClick = () => {
    const createPartNoArray = [];
    for (let i = 1; i <= editedRowData.quantity; i++) {
      if (editedRowData[`input${i}`]) {
        createPartNoArray.push(editedRowData[`input${i}`]);
      }
    }

    const modifiedData = {
      // ...editedRowData,
      createPartNo: createPartNoArray,
      productionProductId:props.particularDiscountData.productionProductId,
      userId:props.particularDiscountData.userId,
      locationDetailsId:props.locationId 
    };
    Object.keys(modifiedData).forEach(key => {
      if (key.startsWith('input')) {
        delete modifiedData[key];
      }
    });

    props.PstoProductionBuilder(modifiedData);
    console.log('Modified Row Data:', modifiedData);


    setEditableRowIndex(-1);
    setEditedRowData(null);
  };

  const handleCancelClick = () => {
    setEditableRowIndex(-1);
    setEditedRowData(null);
  };
  
if(props.fetchingBuilderByProductId){
  return <BundleLoader/>
}
  return (
    <>
      <div className='flex justify-end sticky z-auto'>
        <div className="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className="flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className="md:w-[7%]">Name</div>
            <div className="md:w-[4.2rem] ">Category</div>
            <div className="md:w-[5.8rem]">Sub Category</div>
            <div className="md:w-[4.2rem] ">Unit</div>
            <div className="w-12"></div>
          </div>

          {props.builderbyProductId.map((item, index) => (
            <div key={item.suppliesId}>
              <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
                <div className="flex font-medium flex-col w-[10rem] max-sm:w-full">
                  <div className="flex max-sm:w-full ">
                    <div>
                      <MultiAvatar
                        imageId={item.imageId}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                    <div className="w-[4%]"></div>
                    <div className="max-sm:w-full md:flex items-center">
                      <div className="flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
                        <div className="text-sm  font-semibold  font-poppins cursor-pointer">
                          {item.suppliesName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="text-xs  font-poppins">
                    {item.categoryName}
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="text-xs  font-semibold  font-poppins">
                    {item.subCategoryName}
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div className="flex text-xs  font-semibold  font-poppins">
                    {item.quantity}
                    &nbsp;&nbsp;
                    {editableRowIndex === index ? (
                      Array.from({ length: editedRowData ? editedRowData.quantity : item.quantity }, (_, i) => (
                        <input
                          className="border-[2px] border-black rounded w-12 bg-[antiquewhite]"
                          key={i}
                          type="text"
                          value={editedRowData ? editedRowData[`input${i + 1}`] || '' : item[`input${i + 1}`] || ''}
                          onChange={(e) => handleInputChange(e, `input${i + 1}`)}
                        />
                      )) 
                    ) : (
                      null
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-24 max-sm:flex-row max-sm:w-[10%]">
                  <div className="flex">
                    {editableRowIndex === index ? (
                      <>
                        <Button
                          type="primary"
                          onClick={handleSaveClick}>
                          Save
                        </Button>
                        <Button
                          type="primary"
                          onClick={handleCancelClick}
                          className="ml-[0.5rem]">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <BorderColorIcon
                        className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(index, item)}
                      />
                    )}
                  </div>
                  <div>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => props.removeProductBuilder({ active: false }, item.suppliesId)}
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon
                          className="!text-base cursor-pointer text-[red]"
                        />
                      </Tooltip>
                    </StyledPopconfirm>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ product,auth }) => ({
  builderbyProductId: product.builderbyProductId,
  fetchingBuilderByProductId: product.fetchingBuilderByProductId,
  locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBuilderByProId,
      removeProductBuilder,
      PstoProductionBuilder
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionBldrCrd);