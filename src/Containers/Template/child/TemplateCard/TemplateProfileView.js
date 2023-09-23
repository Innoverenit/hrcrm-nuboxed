import React, { useMemo } from "react";
import { Title, ViewEditCard } from "../../../../Components/UI/Elements";
import styled from "styled-components";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

function TemplateProfileView(props) {
  console.log(props);
  const RuleID = useMemo(() => {
    return props.rule.map((item) => item.ruleId);
  }, [props.rule]);
  console.log(RuleID);
  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "1.25em",
          color: "#40A9FF",
        }}
      >
        {/* <FormattedMessage
          id="app.templates"
          defaultMessage="Templates"
        /> */}
        {/* Templates */}
      </h1>

      {props.rule.map((item) => {
        return (
          <StageWrapper>
            <ViewEditCard>
              {({ viewType }, toggleViewType) =>
                viewType === "view" ? (
                  <FlexContainer
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => props.handleRuleClick(item)}
                    style={{
                      backgroundColor:
                        props.current &&
                        props.current.ruleId === item.ruleId &&
                        "rgb(161, 185, 185)",
                    }}
                  >
                    <StageName>{item.rulesName}</StageName>
                  </FlexContainer>
                ) : null
              }
            </ViewEditCard>
          </StageWrapper>
        );
      })}
    </>
  );
}

export default TemplateProfileView;
const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  flex-basis: 80%;
  // margin-bottom: 0;
  margin: 0;
`;
