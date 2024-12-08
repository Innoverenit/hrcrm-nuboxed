import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import _ from "lodash";
import styled from "styled-components";

const StyledInput = styled.input.attrs({
  type: "text",
  size: (props) => (props.small ? 4 : undefined),
})`

  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: block;
  margin: 0 0 0.42rem 0;  
  outline: none;
  height: 1.88rem;
  position: relative !important;
  box-shadow: 0em 0.25em 0.625em -0.25em ${(props) => props.theme.boxShadowColor};
  padding: 0.3rem 1rem;
  &:hover {
    box-shadow: 0em 0.25em 0.625em -0.125em ${(props) => props.theme.boxShadowColor};
  }
  ::placeholder {
    color: #888;
  }
  .form-control {
    position: relative;
  }
`;

const StyledDropDownContainer = styled.div`
  border-radius: 0.1875em;
  background-color: white;
  color: ${(props) => props.theme.color};
  box-shadow: 0em 0.25em 0.625em -0.25em ${(props) => props.theme.boxShadowColor};
  position: absolute;
  top: 2.5em;
  z-index: 1000;
  .suggestion-item {
    background-color: ${(props) => props.theme.backgroundColor};
    padding: 0.3rem;
  }
  .suggestion-item--active {
    background-color: ${(props) => props.theme.boxShadowColor};
    padding: 0.3rem;
  }
`;
const AutoCompleteWrapper = styled.div`
  position: relative;
`;
const StyledSuggestion = styled.span`
  color: ${(props) => props.theme.color};
`;

class FormikPlacesAutoComplete extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      address: props.value || "",
    };
  }
  handleChange = (address) => {
    this.setState(() => {

      this.props.form.setFieldTouched(`${this.props.field.name}.country`);

      return { address };
    });
  };

  handleSelect = (address) => {
    this.setState({ address });
    
    this.props.form.setFieldValue(`${this.props.field.name}.latitude`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.longitude`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.address1`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.address2`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.street`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.city`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.country`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.state`, "");
    this.props.form.setFieldValue(`${this.props.field.name}.postalCode`, "");
    geocodeByAddress(address).then((results) => {
      getLatLng(results[0])
        .then((latLng) => {
          console.log(latLng);
          this.props.form.setFieldValue(
            `${this.props.field.name}.latitude`,
            latLng.lat
          );
          this.props.form.setFieldValue(
            `${this.props.field.name}.longitude`,
            latLng.lng
          );
        })
        .catch((error) => console.log(error));
      console.log(results[0]);
      var address = _.get(results[0], "address_components");
      var locality1, locality2, street, city, state, zip, country;
      _.forEach(address, (component) => {
        console.log(component);
        let types = _.get(component, "types");
        if (_.includes(types, "street_number")) {
          locality1 = _.get(component, "long_name");
          this.props.form.setFieldValue(
            `${this.props.field.name}.address1`,
            locality1
          );
        }
     
        if (_.includes(types, "route")) {
          street = _.get(component, "long_name");
          this.props.form.setFieldValue(
            `${this.props.field.name}.street`,
            street
          );
        }
        if (_.includes(types, "locality")) {
          city = _.get(component, "long_name");
          this.props.form.setFieldValue(`${this.props.field.name}.city`, city);
        }
        if (_.includes(types, "country")) {
          country = _.get(component, "long_name");
          this.props.form.setFieldValue(
            `${this.props.field.name}.country`,
            country
          );
        }

        if (_.includes(types, "administrative_area_level_1")) {
          state = _.get(component, "long_name");
          this.props.form.setFieldValue(
            `${this.props.field.name}.state`,
            state
          );
        }
        if (_.includes(types, "postal_code")) {
          zip = _.get(component, "long_name");
          this.props.form.setFieldValue(
            `${this.props.field.name}.postalCode`,
            zip
          );
        }
      });
    });
  };

  render() {
    const {
      field: { name, ...field }, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      classes,
      options,
      label,
      isColumn,
      ...props
    } = this.props;

    const error = errors[name];
    const touch = touched[name];
    if (isColumn) {
      return (
        <>
         
          <PlacesAutocomplete
            name={name}
            id={name}
            {...props}
            searchOptions={options || {}}
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            onError={this.handleError}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              Loading,
            }) => (
                <AutoCompleteWrapper>
                  <StyledInput
                    {...getInputProps({
                      placeholder: "Auto complete Search...",
                      className: "location-search-input form-control",
                    })}
                  />
                  <StyledDropDownContainer className="autocomplete-dropdown-container">
                    {Loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                   
                      const style = suggestion.active
                        ? { cursor: "pointer" }
                        : { cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <StyledSuggestion>
                            {suggestion.description}
                          </StyledSuggestion>
                        </div>
                      );
                    })}
                  </StyledDropDownContainer>
                </AutoCompleteWrapper>
              )}
          </PlacesAutocomplete>
        </>
      );
    }
    return (
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
       
        <PlacesAutocomplete
          name={name}
          id={name}
          {...props}
          searchOptions={options || {}}
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onError={this.handleError}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            Loading,
          }) => (
              <AutoCompleteWrapper>
                <StyledInput
                  {...getInputProps({
                    placeholder: "Search location ...",
                    className: "location-search-input form-control",
                  })}
                />
                <StyledDropDownContainer className="autocomplete-dropdown-container">
                  {Loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
               
                    const style = suggestion.active
                      ? { cursor: "pointer" }
                      : { cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <StyledSuggestion>
                          {suggestion.description}
                        </StyledSuggestion>
                      </div>
                    );
                  })}
                </StyledDropDownContainer>
              </AutoCompleteWrapper>
            )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

export default FormikPlacesAutoComplete;
