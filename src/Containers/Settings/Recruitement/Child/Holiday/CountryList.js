

import {} from "antd";
import React, {  PureComponent, Suspense,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import {getCountries} from "../../../../Auth/AuthAction"
import SettingsHoliday from "./SettingsHoliday";

const TabPane = StyledTabs.TabPane;
class CountryList extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    componentDidMount() {
        this.props.getCountries()
    }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    render() {
        const { countries } = this.props;
        console.log(this.state.departmentData.country_id)
        return (
            <>
                <TabsWrapper>
                {/* <div class=" flex ">
<StyledLabel>Optional Allowed</StyledLabel>
              
                  <Input
                  type="text"
             
                />
                
             
                    <Button 
                 
                    >Save</Button>
                 
                    </div> */}
                    <StyledTabs type="card">
                        {countries.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member)}>
                                            {member.country_name}
                                        </span>
                                    }
                                >
                                    {this.state.departmentData.country_id && (
                                        <Suspense fallback={"Loading..."}>
                                          
                                            <div style={{ marginTop: 10 }}>
                            <SettingsHoliday country_name={this.state.departmentData.country_name}
                            country_id={this.state.departmentData.country_id}
                            />
                        
                        </div>
                                        </Suspense>
                                    )}

                                </TabPane>
                            );
                        })} 

                    </StyledTabs>
                </TabsWrapper>
            </>
        )
    }
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    countries: auth.countries,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getCountries
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);













