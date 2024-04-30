import React from 'react';

const CustomizeInputComponent = ({ field, form: { touched, errors }, ...props }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters

        // Update Formik field value with the sanitized numeric value
        field.onChange({
            ...field,
            value: numericValue,
        });
    };

    return (
        <div>
            <label htmlFor={field.name}>{props.label}</label>
            <input
                type="text"
                id={field.name}
                {...field}
                {...props}
                onChange={handleChange}
            />
            {touched[field.name] && errors[field.name] && (
                <div className="error">{errors[field.name]}</div>
            )}
        </div>
    );
};

export default CustomizeInputComponent;
