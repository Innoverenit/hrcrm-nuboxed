import React from "react";
import { Select, Tooltip } from "antd";
import styled from "styled-components";
import ContentLoader from "react-content-loader";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CurrencySymbol, } from "../../Common";
const { Option } = Select;
const JumpStartWrapper = styled.div`
  
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
                <ArrowDropDownCircleIcon
                  type="info-circle"
                
                />
              </InfoIcon>
            </Tooltip>
          </div>
        ) : (
            <div class=" font-normal font-poppins text-xs">{title || "N/A"}</div>
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
                      <VisibilityIcon
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
                      <ArrowDropDownCircleIcon type="caret-up" />
                      {`${(progress && progress.toFixed(0)) || 0}%`}
                    </>
                  ) : (
                      <>
                        <ArrowDropDownCircleIcon type="caret-down" />
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