import React from "react";
import { Select, Tooltip } from "antd";
import styled from "styled-components";
import ContentLoader from "react-content-loader";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined, InfoCircleOutlined,
} from '@ant-design/icons';

import { CurrencySymbol, } from "../../Common";
const { Option } = Select;
const JumpStartWrapper = styled.div`
  // margin: 0.2rem 0.4rem;
  // padding: 0.3rem;
  // max-width: 11rem;
  // border: 0.0625em solid #ddd;
  // display: flex;
  // justify-content: "space-between";
  // align-items: center;
  // background: ${(props) => props.bgColor || "linear-gradient(270deg,#F15753,orange)"};
  // color: white !important;
  // cursor: ${(props) => (props.clickable ? "pointer" : "")};
  // -webkit-box-shadow: 0 0.5em 0.375em -0.375em rgb(46, 44, 44);
  // -moz-box-shadow: 0 0.5em 0.375em -0.375em rgb(46, 44, 44);
  // box-shadow: 0 0.5em 0.375em -0.375em rgb(46, 44, 44);
  // flex: 1 1 0;
  // height:6em;
  // transition: 0.3s all;
  // &:hover {
  //   -webkit-box-shadow: 0 0.75em 0.375em -0.375em rgb(46, 44, 44);
  //   -moz-box-shadow: 0 0.75em 0.375em -0.375em rgb(46, 44, 44);
  //   box-shadow: 0 0.75em 0.375em -0.375em rgb(46, 44, 44);
  // }
  // @media only screen and (max-width: 600px) {
   
  //   height: 9rem;

    
  // }
`;
const Progress = styled.span`
  color: ${(props) => (props.amount >= 0 ? "#0d9412" : "rgb(248, 15, 15)")};
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0.5em;

  @media only screen and (max-width: 62em) {
    font-size: 0.5rem;
  }
`;
const InfoIcon = styled.span`
  font-size: 1em;
  cursor: pointer;
  @media only screen and (max-width: 62em) {
    font-size: 0.5em;
  }
`;

const Value = styled.span`
  font-size: 0.9375em;

  @media only screen and (max-width: 62em) {
    font-size: 0.5em;
  }
`;
const JumpStartDetail = ({
  title,
  value,
  stringValue,
  textValue,
  currencyType,
  currencyType1,
  bgColor,
  clickable,
  noProgress,
  handleEdit,
  isLevelTextInputOpen,
  progress,
  edit,
  text,
  levels,
  isLoading,
  handleUpdate,
  handleLevelNotEdit,
  userId,
  taskInd,
  tooltipData,
  jumpstartClick,
  cursorData,
  icon,
}) => {
  console.log(levels);
  function onChange(value) {
    if (taskInd) {
      handleLevelNotEdit();
    } else {
      handleUpdate(userId, { level: value });
    }
  
    console.log(value);
  }
  const cursorDisabled = value === 0 ? "cursor-not-allowed" : "pointer";

  return (
    <div
      bgColor={bgColor}
      clickable={clickable}
      onClick={jumpstartClick}
       style={{ cursor: cursorDisabled }}
      
    >
      <div>
        {icon ? (
          <div >
            {title || "N/A"}{" "}
            <Tooltip title={tooltipData}>
              <InfoIcon>
                <InfoCircleOutlined
                  type="info-circle"
                
                />
              </InfoIcon>
            </Tooltip>
          </div>
        ) : (
            <div class=" font-normal font-poppins">{title || "N/A"}</div>
          )}

        {isLoading ? (
          <span
            style={{
              width: 120,
              height: 30,
              display: "inline-block",
              opacity: 0.5,
            }}
          >
            <MyLoader />{" "}
          </span>
        ) : (
            <div class="text-base font-poppins font-semibold" >
              {isLevelTextInputOpen ? (
                <>
                  <Select                    
                    defaultValue={value}
                    showSearch                   
                    style={{ width: 150, marginBottom: "0.1875em" }}
                    placeholder="Select"                    
                    onSelect={onChange}
                  >
                    {levels.map((item) => {
                      return <Option value={item.level}>{item.level} </Option>;
                    })}
                  </Select>
                 
                </>
              ) : (
                  <>
                    {currencyType && <CurrencySymbol currencyType={currencyType} />}
                    {currencyType && <span>&nbsp;&nbsp;</span>}
                    {stringValue ? value :value}
                &nbsp;
                    {edit && (
                      <EditOutlined
                        tooltipTitle="Edit"
                        //iconType="edit"
                        handleIconClick={handleEdit}
                        size="0.875em"
                      />
                    )}
                  </>
                )}

              {!noProgress && (
                // renderTooltip(
                //   "this is what progress means",
                <Progress amount={progress || 0}>
                  {progress > 0 ? (
                    <>
                      <CaretUpOutlined type="caret-up" />
                      {`${(progress && progress.toFixed(0)) || 0}%`}
                    </>
                  ) : (
                      <>
                        <CaretDownOutlined type="caret-down" />
                        {`${(progress && progress.toFixed(0)) || 0}%`}
                      </>
                    )}
                  {/* &nbsp;{`${(progress && progress.toFixed(2)) || 0}%`} */}
                </Progress>
              )
                // )
              }
            </div>
          )}
      </div>
    </div>
  );
};

export default JumpStartDetail;

const MyLoader = (props) => (
  <ContentLoader
    height={40}
    width={150}
    speed={2}
    primaryColor="#395E9D"
    secondaryColor="#223393"
    {...props}
  >
    <rect x="25" y="15" width="9.375em" height="1.875em" />
  </ContentLoader>
);