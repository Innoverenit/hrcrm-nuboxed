import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrency } from "../../../Auth/AuthAction";
import { Button, Input, Select,Popconfirm,Tooltip } from "antd";
import { getProductCurrency, createProductCurrency,
   handleDiscountModal, handleOfferModal,removeProductPrice } from "../../ProductAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import {getSaleCurrency} from "../../../Auth/AuthAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const { Option } = Select;

function ProductbuilderTable(props) {

  const [editedFields, setEditedFields] = useState({});
  const [data, setData] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editsuppliesId, setEditsuppliesId] = useState(null);

  useEffect(() => {
    props.getProductCurrency(props.particularDiscountData.productId);
    props.getSaleCurrency()
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setData(props.ProductCurrency.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.ProductCurrency]);

  useEffect(() => {
    if (data.length === 0) {
      setShowNoDataAlert(true);
    } else {
      setShowNoDataAlert(false);
    }
  }, [data]);



  const handleAddRow = () => {
    const newRow = {
      key: String(data.length + 1),
      currencyId: '',
      price: '',
      priceB2C: '',
      vat: '',


    };
    setData([...data, newRow]);
  };

  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value, currency_id: value } : row
    );
    setData(updatedData);
  };

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };

  const handleSave = (key) => {
    console.log(key)
    // const targetRow = data.find((row) => row.key === key);
    // if (targetRow) {
      const result = {
        currencyId: key.currency_id,
        price: key.price,
        priceB2C: key.priceB2C,
        vat: key.vat,
        skillLevelLinkId: key.skillLevelLinkId,
        productId: props.particularDiscountData.productId,
        userId: props.userId
      };
      props.createProductCurrency(result)
    
  };

  const handleEditClick = (productCurrencyId) => {
    setEditsuppliesId(productCurrencyId);
  };
  const handleCancelClick = (productCurrencyId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [productCurrencyId]: undefined }));
    setEditsuppliesId(null);
  };
  if (isMobile) {
    <div>
      <Button type="primary" onClick={handleAddRow} >
        Add Row
      </Button>
      <div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">


          {data.length ?
            data.map((item) => {
              return (
                <div key={item.procurId}>
                  <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "
                  >

                    <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                      <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                        <Select
                          className="w-32"
                          value={item.currency_id}
                          onChange={(value) => handleSelectChange(value, item.key, 'currency_id')}
                        >
                          {props.saleCurrencies.map((s) => (
                            <Option key={s.currency_id} value={s.currency_id}>
                              {s.currency_name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                      <div class=" text-xs text-cardBody font-poppins">
                        <Input
                          className="w-32"
                          value={item.price}
                          onChange={(e) => handleInputChange(e.target.value, item.key, 'price')}
                        />
                      </div>

                    </div>



                    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs text-cardBody font-poppins">

                        <Input
                          className="w-32"
                          value={item.priceB2C}
                          onChange={(e) => handleInputChange(e.target.value, item.key, 'priceB2C')}
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                        <Input
                          className="w-32"
                          value={item.vat}
                          onChange={(e) => handleInputChange(e.target.value, item.key, 'vat')}
                        />
                      </div>
                    </div>

                    <div class="flex md:items-center">


                      <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                        <div>
                          <Button type="primary" onClick={() => handleSave(item.key)}>
                            Add
                          </Button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              );
            }) : "No data"}


        </div>
      </div>

    </div>
  }

  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">          <div className=""></div>
            <div className=" md:w-[7%]">Currency</div>
            <div className=" md:w-[6.1rem]">Price(B2B)</div>
            <div className=" md:w-[4.2rem] ">Price(B2C)</div>
            <div className="md:w-[5.8rem]">VAT(%)</div>
            <div className="w-12"></div>             </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.productCurrencyId}>
                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "
                >

                  <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                    {editsuppliesId === item.productCurrencyId ? (
                      <Select
                        classNames="w-32"
                        value={item.currencyName}
                        onChange={(value) => handleSelectChange(value, item.key, 'currencyName')}
                      >
                        {props.saleCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>
                    ):(
                      <div className="font-normal text-sm text-cardBody font-poppins">
                      <div> {item.currencyName}</div>
                    </div>
                  )}
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.productCurrencyId ? (
                    <div class=" text-xs text-cardBody font-poppins">
                      <Input
                        className="w-32"
                        value={item.price}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'price')}
                      />
                    </div>
 ):(
  <div className="font-normal text-sm text-cardBody font-poppins">
  <div> {item.price}</div>
</div>
)}
                  </div>



                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.productCurrencyId ? (
                    <div class=" text-xs text-cardBody font-poppins">
                      <Input
                        className="w-32"
                        value={item.priceB2C}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'priceB2C')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm text-cardBody font-poppins">
                      <div> {item.priceB2C}</div>
                    </div>
                    )}
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.productCurrencyId ? (

                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      <Input
                        className="w-32"
                        value={item.vat}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'vat')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm text-cardBody font-poppins">
                      <div> {item.vat}</div>
                    </div>
                    )}
                  </div>

                  <div class="flex md:items-center">


                    {/* <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Button type="primary" onClick={() => handleSave(item.key)}>
                          Save
                        </Button>
                      </div>

                    </div> */}
 {editsuppliesId === item.productCurrencyId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleSave(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.productCurrencyId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.productCurrencyId)}
                      />
                    )}
 <div>
      <Popconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductPrice(item.productCurrencyId)}

                          >
                     <Tooltip title="Delete">
                          <DeleteIcon
                           className="!text-base cursor-pointer text-[red]"
                          />
                       </Tooltip>
                       </Popconfirm>
                       </div>
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingProductCurrency ? <NodataFoundPage /> : null}

        </div>
      </div>

    </div>
  );


};

const mapStateToProps = ({ product, auth }) => ({
  ProductCurrency: product.ProductCurrency,
  fetchingProductCurrency: product.fetchingProductCurrency,
  addDiscountModal: product.addDiscountModal,
  addProductOfferModal: product.addProductOfferModal,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingProductCurrency: product.fetchingProductCurrency,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductCurrency,
      createProductCurrency,
      handleDiscountModal,
      handleOfferModal,
      getCurrency,
      getSaleCurrency,
      removeProductPrice
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);

