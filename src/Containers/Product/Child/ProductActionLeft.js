import React, { useEffect } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined, AlipayOutlined } from "@ant-design/icons";
import { Tooltip, Avatar,Badge } from "antd";
import MenuIcon from '@mui/icons-material/Menu';
import { getRecords } from "../ProductAction";
import CategoryIcon from '@mui/icons-material/Category';

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
      <Badge
          size="small"
           count={( props.recordData.product) || 0}
          overflowCount={999}
        >
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
        </Badge>
      </Tooltip>

      {/* <Tooltip
        title="Category"
      >
        <span className="mr-2 text-sm cursor-pointer">
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
            className="!text-2xl cursor-pointer "
            style={{

              color: props.viewType === "dashboard" && "red",
            }}
            onClick={() => props.setProductViewType("dashboard")}
          />
        </Avatar>
      </Tooltip>

      <Tooltip title="Category List">
        <div
          class=" ml-2 text-sm cursor-pointer"
          style={{

            color: props.viewType === "category" && "red",
          }}
          onClick={() => props.setProductViewType("category")}
        >
          <Avatar style={{ background: props.viewType === "category" ? "#f279ab" : "#4bc076" }}>
            <CategoryIcon className="text-white !text-2xl" />
          </Avatar>

        </div>
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
