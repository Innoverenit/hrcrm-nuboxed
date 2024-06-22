import { Button, DatePicker, message } from "antd";
import React, { useState, useEffect } from "react";
import { TextInput } from "../../../Components/UI/Elements";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateMileage, 
} from "../MileageAction";
import { getCurrency } from "../../Auth/AuthAction";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Select } from "antd";

const { Option } = Select;

const MileageSchema = Yup.object().shape({
  dateString: Yup.string().required("Input Required"),
  // emailId: Yup.string().email("Enter a valid Email"),
  // firstName: Yup.string().required("Input needed!"),
  // phoneNo: Yup.string().matches(phoneRegExp, "Enter a valid Phone No"),
  // mobileNo: Yup.string()
  //   // .required("Input needed!")
  //   .matches(phoneRegExp, "Enter a valid Mobile No"),
});
function UpdateMileageForm(props) {
  const [row, setRows] = useState(
    {
      mileageDate: props.setEditingMileage.mileageDate || "",
      clientName: props.setEditingMileage.clientName || "",
      fromLocation:props.setEditingMileage. fromLocation || "",
      toLocation:props.setEditingMileage.toLocation || "",
      distances: props.setEditingMileage.distances || "",
      remark:props.setEditingMileage.remark || "",
      mileageRate: props.setEditingMileage.mileageRate || "",
      currency: props.user.currency,
      id: 1,
      userId:props.userId,
      mileageId:props.setEditingMileage.mileageId,
      organizationId: props.organizationId,
    },
  );

  useEffect(() => {
    // props.getCurrency();
  }, []);
  console.log("currenctjudfljd;regf", props.currencies);
  const [id, setId] = useState(1);
  function onChangeDatePicker(date, dateString, id) {
    setRows((value) => {
      console.log(value);
    
        if (`${row.id}date` === id) {
          console.log(dateString);
          return { ...row, mileageDate: dayjs(dateString).toISOString() };
        } else {
          return row;
        }
      });
  
  }
  function handleCurrencyChange(currency, id) {
    console.log(id);
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}curr` === id) {
          return { ...data, currency: currency };
        } else {
          return data;
        }
      });
    });
  }
  function handleChangeattribute(e) {
    e.persist();
    setRows((v) => {
      console.log(v);

        if (`${row.id}attribute` === e.target.name) {
          return { ...row, clientName: e.target.value };
        } else {
          return row;
        }
      });
  }
  function handleChangefromLocation(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
     

        if (`${row.id}fromLocation` === e.target.name) {
          return { ...row, fromLocation: e.target.value };
        } else {
          return row;
        }
      });
 
  }
  function handleChange(id, billType) {
    setRows((value) => {
      console.log(value);
    
        if (`${row.id}select` === id) {
          return { ...row, billType: billType };
        } else {
          return row;
        }
      });

  }
  function handleChangetoLocation(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      
        if (`${row.id}toLocation` === e.target.name) {
          return { ...row, toLocation: e.target.value };
        } else {
          return row;
        }
      });

  }

  function handleChangedistances(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
        if (`${row.id}distances` === e.target.name) {
          return { ...row, distances: e.target.value };
        } else {
          return row;
        }
      });
  }
  function handleChangeremark(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
     

        if (`${row.id}remark` === e.target.name) {
          return { ...row, remark: e.target.value };
        } else {
          return row;
        }
      });
  
  }

  function handleChangemileageRate(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}mileageRate`);
        console.log(e.target.name);

        if (`${d.id}mileageRate` === e.target.name) {
          return { ...d, mileageRate: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleAddRowClick() {
    setId((v) => v + 1);
    setRows((v) => [
      ...v,
      {
        date: "",
        clientName: "",
        fromLocation: "",
        toLocation: "",
        distances: "",
        remark: "",
        mileageRate: "",
        currency: "",
        // userId: props.userId,
        id: id + 1,
      },
    ]);
  }
  function handleDelete(row) {
    setRows((v) => v.filter((d) => d.id !== row.id));
  }

  function handleCallBack(status) {
    if (status === "Success") {
      props.getMileageByUserId(props.userId);
    } else {
      message.error("Something went wrong! Occourd");
    }
  }
  function handleSubmit() {
    // validateYupSchema={MileageSchema}
    console.log(row);
    // console.log(row["attribute"]);
    // if (row) {
    //   row.map((item) => {
    //     if (
    //       !item.date &&
    //       !item.clientName &&
    //       !item.fromLocation &&
    //       !item.toLocation &&
    //       !item.distances &&
    //       !item.remark &&
    //       !item.mileageRate &&
    //       !item.currency
    //     ) {
    //       alert("All Fields Required");
    //     } else {
          props.updateMileage(row, handleCallBack);
        // }
        
      // });
    // } else {
    // }
  }
  const { updatingMileage } = props;
  return (
    <div>
      <table>
        <th>Date</th>
        <th>Assigned</th>
        <th>From</th>
        <th>To</th>
        <th>Distance</th>
        <th>Unit</th>
        <th>Remarks</th>

        {/* <th>Rate</th>
        <th>Currency</th> */}
            <tr>
              <td style={{ width: "14%" }}>
                <DatePicker
                  style={{ width: "93%" }}
                  onChange={(date, dateString) =>
                    onChangeDatePicker(date, dateString, `${row.id}date`)
                  }
                />
              </td>
              <td style={{ width: "16%" }}>
                <TextInput
                  style={{ width: "95%" }}
                  name={`${row.id}attribute`}
                  value={`${row.clientName}`}
                  onChange={handleChangeattribute}
                />
              </td>

              <td style={{ width: "16%" }}>
                <TextInput
                  name={`${row.id}fromLocation`}
                  value={`${row.fromLocation}`}
                  onChange={handleChangefromLocation}
                  style={{ width: "96%" }}
                />
              </td>

              <td style={{ width: "17%" }}>
                <TextInput
                  name={`${row.id}toLocation`}
                  value={`${row.toLocation}`}
                  onChange={handleChangetoLocation}
                  style={{ width: "96%" }}
                />
              </td>

              <td style={{ width: "12%" }}>
                <TextInput
                  name={`${row.id}distances`}
                  value={`${row.distances}`}
                  onChange={handleChangedistances}
                  style={{ width: "90%" }}
                  isRequired
                />
              </td>
              <td style={{ width: "11%" }}>
                <Select
                  style={{ width: "90%" }}
                  // onChange={(value) => handleChange(`${item.id}select`, value)}
                  isRequired
                   disabled
                   value="km"
                  
                >
                  
                  {/* <Option value="Km" disabled>Km</Option> */}
                  {/* <Option value="Mile">Mile</Option> */}
                </Select>
              </td>
              <td>
                <TextInput
                  style={{ width: "100%" }}
                  name={`${row.id}remark`}
                  value={`${row.remark}`}
                  onChange={handleChangeremark}
                />
              </td>
              {/* <td>
                <TextInput
                  name={`${item.id}mileageRate`}
                  value={`${item.mileageRate}`}
                  onChange={handleChangemileageRate}
                  style={{ width: "50%" }}
                />
              </td> */}
              {/* <td>
                <Select
                  style={{ width: 120 }}
                  onSelect={(value) =>
                    handleCurrencyChange(value, `${item.id}curr`)
                  }
                >
                  {props.currencies.map((item) => {
                    return (
                      <Option value={item.currencyName}>
                        {item.currencyName}
                      </Option>
                    );
                  })}
                </Select>
              </td> */}

              {/* {row.length > 1 && (
                <DeleteOutlined
                  style={{
                    color: "red",
                    fontSize: "1.125em",
                    marginLeft: "0.3125em",
                  }}
                  type="delete"
                  onClick={() => handleDelete(item)}
                />
              )} */}
            </tr>
          {/* ); */}
        {/* })} */}
      </table>
  <div class=" mt-3">
      <Button
        style={{ float: "right" }}
        type="primary"
        onClick={handleSubmit}
        Loading={updatingMileage}
      >
        Submit
      </Button>
      </div>
      {/* &nbsp; &nbsp; &nbsp;
      <Button
        style={{ float: "right", marginRight: "1%" }}
        type="primary"
        onClick={handleAddRowClick}
        Loading={addingMileage}
      >
        Add more
      </Button> */}
    </div>
  );
}

const mapStateToProps = ({ mileage, auth }) => ({
  organizationId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
  user: auth.userDetails,
  setEditingMileage:mileage.setEditingMileage,
  updatingMileage:mileage.updatingMileageError,
  updatingMileageError:mileage.updatingMileageError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   addMileage,
    //   getMileageByUserId,
      getCurrency,
      updateMileage,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateMileageForm);
