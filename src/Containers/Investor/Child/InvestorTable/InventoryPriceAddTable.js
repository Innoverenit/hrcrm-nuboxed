import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { Button, DatePicker, Input, Select,Tooltip } from "antd";
import {investorShare,getInvestorShare,investorShareUpdate} from "../../InvestorAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import {getInvestorCurrency} from "../../../Auth/AuthAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

function InventoryPriceAddTable(props) {

  const [editedFields, setEditedFields] = useState({});
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    props.getInvestorShare(props.RowData.investorId);
    props.getInvestorCurrency()
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
    setData(props.inventoryShare.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.inventoryShare]);

 



  const handleAddRow = () => {
    const newRow = {
      // key: String(data.length + 1),
      quantityOfShare: '',
      amountPerShare: '',
      date: null,


    };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    if (key === 'amountPerShare' || key === 'quantityOfShare' || key === 'vat') {
      if (!isNaN(value)) {
        const updatedRows = [...rows];
        updatedRows[index][key] = value;
        setRows(updatedRows);
        setErrors((prevErrors) => ({ ...prevErrors, [`${key}${index}`]: '' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [`${key}${index}`]: 'Must be a number' }));
      }
    } else {
      const updatedRows = [...rows];
      updatedRows[index][key] = value;
      setRows(updatedRows);
    }
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

  const handleSave = (index) => {
    const row = rows[index];
    // const targetRow = data.find((row) => row.key === key);
    // if (targetRow) {
      console.log('Submitting Row:', row);
      const result = {
        quantityOfShare: row.quantityOfShare,
        currency: row.currency_id,
        amountPerShare: row.amountPerShare,
        investorId: props.RowData.investorId,
       // buyingDate: row.buyingDate,
        buyingDate: row.buyingDate ? dayjs(row.buyingDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
      };
      props.investorShare(result)
      setRows([{  amountPerShare: '', quantityOfShare: '', }]);
  };
  const handleEditClick = (investorId) => {
    setEditsuppliesId(investorId);
  };
  const handleCancelClick = (investorId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [investorId]: undefined }));
    setEditsuppliesId(null);
  };

  const { inventoryShare } = props;
  let investorsShareId; // Declare investorsShareId outside
  
  if (inventoryShare && inventoryShare.length > 0) {
    const firstItem = inventoryShare[0];
    investorsShareId = firstItem.investorsShareId;
    console.log(investorsShareId); // or use the investorsShareId as needed
  } else {
    console.error("inventoryShare is undefined or empty");
  }

  function handleUpdate(key) {
    console.log('Submitting Row:', key);
    const updatedData = {
      quantityOfShare: key.quantityOfShare,
      amountPerShare: key.amountPerShare,
      investorId: props.RowData.investorId,
      investorsShareId:investorsShareId,
      currency: key.currency_id,
      buyingDate: key.buyingDate ? dayjs(key.buyingDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
    };
    props.investorShareUpdate(updatedData,props.RowData.investorId);
    setEditsuppliesId(null);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center justify-between">
            <div class="flex justify-around w-[30rem]">
            <div>
                <label>Currency</label>
                <div class="w-24">
                <Select
                style={{width:"5rem"}}
                      
                        value={row.currency_id}
                        onChange={(value) => handleChange(index, 'currency_id',value)}
                      >
                        {props.investorCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>

                </div>
              </div>

              <div>
                <label>Quantity Of Share</label>
                <div class="w-24"></div>
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.quantityOfShare}
                        onChange={(e) => handleChange(index,'quantityOfShare',e.target.value)}
                      />
                        {errors[`quantityOfShare${index}`] && <span className="text-red-500">{errors[`quantityOfShare${index}`]}</span>}
                      </div>
              <div>
                <label>Value per Share</label>
                <div class="w-24">
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.amountPerShare}
                        onChange={(e) => handleChange(index,'amountPerShare',e.target.value)}
                      />
                       {errors[`amountPerShare${index}`] && <span className="text-red-500">{errors[`amountPerShare${index}`]}</span>}
                      </div></div>
                      <div>
        <label>Date</label>
        <div class="w-24">
          <DatePicker
            style={{width:"9rem"}}
            value={row.buyingDate ? dayjs(row.buyingDate) : null}
            onChange={(date, dateString) => handleChange(index, 'buyingDate', dateString)}
          />
        </div>
      </div>
    
            </div>
            <div class="mt-4">
            <Button type="primary" onClick={() => handleSave(index)}>
              Submit
            </Button>
            </div>
            
          </div>
        ))}

      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">         
            <div className=" md:w-[21rem]">Quantity Of Share</div>
            <div className=" md:w-[11.1rem]">Value per Share</div>
            <div className=" md:w-[6.2rem] ">Purchase date</div>
            <div className="w-12"></div>           
              </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.investorId}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                >

                 
 <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.investorId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.quantityOfShare}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'quantityOfShare')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.quantityOfShare}</div>
                    </div>
                    )}
                  </div>
                  <div className=" flex font-medium items-end flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                    {editsuppliesId === item.investorId ? (
                      <Select
                      style={{width:"5rem"}}
                        value={item.currency}
                        onChange={(value) => handleSelectChange(value, item.key, 'currency')}
                      >
                        {props.investorCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>
                    ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.currency}</div>
                    </div>
                  )}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.investorId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.amountPerShare}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'amountPerShare')}
                      />
                    </div>
 ):(
  <div className="font-normal text-sm  font-poppins">
  <div> {item.amountPerShare}</div>
</div>
)}
                  </div>



                 
                  {editsuppliesId === item.investorId ? (
  <DatePicker
  style={{width:"9rem"}}
    value={item.buyingDate ? dayjs(item.buyingDate) : null}
    onChange={(buyingDate) => handleInputChange(buyingDate, item.key, 'buyingDate')}
  />
) : (
  <div className="font-normal text-sm font-poppins">
    <div>{dayjs(item.buyingDate).format('DD/MM/YY')}</div>
  </div>
)}

                  <div class="flex md:items-center">


 {editsuppliesId === item.investorId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.investorId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-xl cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.investorId)}
                      />
                    )}
 {/* <div>
      <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductPrice(item.investorId)}

                          >
                     <Tooltip title="Delete">
                     <DeleteOutlined
                      style={{ color: 'red' }}
                          className="!text-xl cursor-pointer  flex justify-center items-center mt-1 ml-1"
                          />
                       </Tooltip>
                       </StyledPopconfirm>
                       </div> */}
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingInvenstoryShare ? <NodataFoundPage /> : null}

        </div>
      </div>

    </div>
  );


};

const mapStateToProps = ({ investor, auth }) => ({
  inventoryShare: investor.inventoryShare,
  fetchingInvenstoryShare: investor.fetchingInvenstoryShare,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies,
  investorCurrencies: auth.investorCurrencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getInvestorShare,
       investorShare,
       investorShareUpdate,
       getInvestorCurrency,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryPriceAddTable);

