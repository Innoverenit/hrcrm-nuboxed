




import React, {  PureComponent, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import {getCountries} from "../../../../Auth/AuthAction"
const Weekend = lazy(() => import("../Weekend/Weekend"));


const TabPane = StyledTabs.TabPane;
class WeekendCountryList extends PureComponent {

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
        console.log(this.state.departmentData.country_name)
        return (
            <>
                <TabsWrapper>
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
                            <Weekend country_name={this.state.departmentData.country_name}
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

export default connect(mapStateToProps, mapDispatchToProps)(WeekendCountryList);

