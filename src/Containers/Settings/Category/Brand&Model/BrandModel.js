import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, message, Input } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
import {
    getBrandModel,
    addBrandModel,
} from "./BrandModelAction";
const SingleBrandModel = lazy(() =>
  import("./SingleBrandModel")
);

class BrandModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkedBrand: [],
            isTextInputOpen: false,
            addingBrandModel: false,
            brand: "",
            model: "",
            singlebrand: "",
            currentData: ""
        };
    }
    handleClear = () => {
        this.setState({ currentData: "" });
        this.props.getBrandModel();
    };
    setCurrentData = (value) => {
        this.setState({ currentData: value });
    };
    handleChange = ({ target: { name, value } }) =>
        this.setState({ [name]: value });
    handleModelChange = (e) => {
        this.setState({ model: e.target.value });
    }
    handleSearchChange = (e) => {
        this.setState({ currentData: e.target.value });
    };
    toggleInput = () =>
        this.setState((prevState) => ({
            isTextInputOpen: !prevState.isTextInputOpen,
        }));
    handleChange = ({ target: { name, value } }) =>
        this.setState({ [name]: value });
    handleAddBrandModel = () => {
        const { addBrandModel, brandModel } = this.props;
        const { brand, model } = this.state;
        let brandType = {
            brand,
            model,
            userId: this.props.userId,
            orgId: this.props.orgId,
        };
        let exist = brandModel && brandModel.some((element) => element.brand == brand && element.model == model);

        if (exist) {
            message.error(
                "Brand and model has already exist!"
            );
        } else {
            addBrandModel(brandType, () => console.log("add Customer callback"));
        }

        this.setState({
            brand: "",
            model: "",
            singlebrand: "",
            isTextInputOpen: false
        });
    };

    componentDidMount() {
        this.props.getBrandModel();
    }
    render() {
        const {
            fetchingBrandModel,
            brandModel,
            addingBrandModel,
            updatingBrandModel,
        } = this.props;
        const {
            isTextInputOpen,
            brand,
            model,
            singlebrand,
            linkedBrand,
        } = this.state;
        console.log(this.props.brandModel)
        if (fetchingBrandModel) return <BundleLoader />;
        //if (fetchingSectorsError) return <p>We are unable to load data</p>;
        return (
            <>
            <div class="flex flex-nowrap" >
                    <MainWrapper
                        style={{
                            flexBasis: "100%",
                            overflow: "auto",
                            color: "#FFFAFA",
                        }}
                    >
                          <div class=" flex flex-row justify-between">
               <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            {isTextInputOpen ? (
                           <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
                           >
                               

                                <TextInput
                                    placeholder="Add brand"
                                    name="brand"
                                    value={brand}
                                    onChange={this.handleChange}
                                    width="36%"
                                    style={{ marginRight: "2px" }}
                                />
                              
                                <TextInput
                                    placeholder="Add Model"
                                    name="model"
                                    value={model}
                                    onChange={this.handleModelChange}
                                    width="36%"
                                    style={{ marginRight: "2px" }}
                                />
                                &nbsp;
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // disabled={!name}
                                    Loading={addingBrandModel}
                                    onClick={this.handleAddBrandModel}
                                    style={{ marginRight: "0.125em" }}
                                >
                                    {/* Save */}
                                    <FormattedMessage id="app.save" defaultMessage="Save" />
                                </Button>
                                &nbsp;
                                <Button type="cancel"  onClick={this.toggleInput}>
                                    {/* Cancel */}
                                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                                </Button>
                            </div>
                        ) : (
                            <>
                               
                                <div class=" flex justify-end" >
                                    <Button
                                        type="primary"
                                        htmlType="button"
                                        loading={addingBrandModel}
                                        onClick={this.toggleInput}
                                    >
                                        Add More
                                        {/* <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    /> */}
                                    </Button>
                                </div>
                                {/* <div>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</div> */}
                            </>
                        )}
                         </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
                            {brandModel.length ? (
  brandModel
    .slice() 
    .sort((a, b) => a.brand.localeCompare(b.brand)) 
    .map((brandmodel, i) => (
                                        <SingleBrandModel
                                            key={i}
                                            value={singlebrand}
                                            name="singlebrand"
                                            brandmodel={brandmodel}
                                            updatingBrandModel={updatingBrandModel}
                                            linkedBrand={linkedBrand}
                                            handleChange={this.handleChange}
                                            handleModelChange={this.handleModelChange}
                                            handleSearchChange={this.handleSearchChange}
                                            currentData={this.state.currentData}
                                            setCurrentData={this.setCurrentData}
                                        />
                                    ))
                                    ) : (
                                        <p>No Data Available</p>
                                      )}
                            </MainWrapper>
                        </div>
                       
                    </MainWrapper>
                </div>

            </>
        );
    }
}

const mapStateToProps = ({ brandmodel, auth }) => ({
    addingBrandModel: brandmodel.addingBrandModel,
    addingBrandModelError: brandmodel.addingBrandModelError,
    brandModel: brandmodel.brandModel,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    fetchingBrandModel: brandmodel.fetchingBrandModel,
    fetchingBrandModelError: brandmodel.fetchingBrandModelError,
    updatingBrandModel: brandmodel.updatingBrandModel
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBrandModel,
            addBrandModel,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(BrandModel);
