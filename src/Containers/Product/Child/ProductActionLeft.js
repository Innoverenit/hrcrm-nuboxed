import React, { useEffect } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined, AlipayOutlined } from "@ant-design/icons";
import { Tooltip, Avatar } from "antd";
import MenuIcon from '@mui/icons-material/Menu';
import { getRecords } from "../ProductAction"

const ProductActionLeft = (props) => {
  useEffect(() => {
    props.getRecords()
  }, []);
  const {
    viewType,
    setProductViewType,
    user,
  } = props;
  return (
    <FlexContainer alignItems="center">
      <Tooltip title="Product List">
        <div
          class=" mr-2 text-sm cursor-pointer"
          style={{

            color: props.viewType === "table" && "red",
          }}
          onClick={() => props.setProductViewType("table")}
        >
          <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
            <MenuIcon className="text-white !text-2xl" />
          </Avatar>

        </div>
      </Tooltip>

      {/* <Tooltip
        title="Category"
      >
        <span class=" mr-2 text-sm cursor-pointer">
          <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
            <AlipayOutlined
              className="!text-2xl cursor-pointer"
              onClick={() => setProductViewType("all")}
              style={{
                color: viewType === "all" && "#1890ff",
              }} />
          </Avatar>
        </span>
      </Tooltip> */}

      <Tooltip title="Suspended Product">
        <Avatar style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#4bc076" }}>
          <DeleteOutlined
            className="!text-2xl cursor-pointer"
            style={{

              color: props.viewType === "dashboard" && "red",
            }}
            onClick={() => props.setProductViewType("dashboard")}
          />
        </Avatar>
      </Tooltip>
    </FlexContainer>
  );

}
const mapStateToProps = ({ product, auth }) => ({
  user: auth.userDetails,
  recordData: product.recordData,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecords
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionLeft);
