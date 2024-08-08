import React, { Component } from "react";
import styled from "styled-components";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { elipsize } from "../../../Helpers/Function/Functions";
import dayjs from "dayjs";


class SingleHoliday2 extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      currentStage: "",
      fields: {},
      date: this.props.holidays.date,
      holidayType: false,
    };
  }

  render() {
    console.log(this.state.fields);
    const { holidays } = this.props;
    console.log(holidays);

    const {
      holidays: { holidayName, date, holidayType, holidayId },
    } = this.props;

    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex flex-row flex-wrap items-center self-start justify-center grow shrink h-auto mr-auto ">
                <StageName
                  style={{
                    flexBasis: "41%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {elipsize(holidayName, 23)}
                </StageName>
                <StageValue
                  style={{
                    flexBasis: "18%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "red",
                    fontWeight: "bold",
                    marginRight: "8%",
                  }}
                >
                  {`${dayjs(date).format("ll")}`}
                </StageValue>
                <StageValue
                  style={{
                    flexBasis: "27%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {`${holidayType}`}
                </StageValue>

                <div style={{}}>

                </div>
              </div>
            ) : (
              <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">

                  <mt-3 />
                  <mt-3 style={{ marginBottom: "0.625em" }} />             
                  <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-[5px] mt-[10px] ">

                  </div>
                </div>
              )
          }
        </ViewEditCard>
      </StageWrapper>
    );
  }
}

export default SingleHoliday2;

const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;
