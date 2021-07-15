import React, { useState } from 'react';

const RegistrationForm = () => {
  const [ inputs, setInputs ] = useState({});
  const [ errors, setErrors ] = useState({});

  /**
   * Call during form submissions. Checks the validity on each element in the forms and determines the appropriate errors
   * for each input field if the filed is not valid.
   * @param {Event} event form submission event
   * @returns {{}} object containing error messages for invalid field ids
   */
  const getInputErrors = (event) => {
    const validationErrors = {};

    for (const element of event.target.elements) {
      const elementValidity = element.validity;
      if (elementValidity.valueMissing) {
        validationErrors[element.id] = "This field is required"
      } else if (elementValidity.patternMismatch) {
        validationErrors[element.id] = element.title;
      }
    }

    return validationErrors;
  }

  const onInputChange = (input, event) => {
    setInputs({
      ...inputs,
      [input]: event.target.value
    });

    // Remove error messages from input if new value is valid
    if (event.target.validity.valid) {
      setErrors({
        ...errors,
        [input]: null
      });
    }
  }

  const onSubmit = event => {
    event.preventDefault();

    const inputErrors = getInputErrors(event);
    // Only submit form if all fields are valid and don't contain errors
    if (Object.keys(inputErrors).length === 0) {
      const data = JSON.stringify(inputs);
      console.log(`Submit form data to REST services via axios or other library. Data >> ${data}`)
      setInputs({});
    } else {
      setErrors(inputErrors);
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-5">Provider Registration</h1>
      <form style={{ width: '500px' }} onSubmit={e => onSubmit(e)} noValidate>
        <div className="row mb-3">
          <div className="form-group col-md-6">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors['firstName'] ? 'is-invalid' : ''}`}
              id="firstName"
              placeholder="First Name"
              required
              onChange={e => onInputChange('firstName', e)}
              value={inputs['firstName'] || ''} />
            <div className="invalid-feedback">{ errors['firstName'] }</div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text"
                   className={`form-control ${errors['lastName'] ? 'is-invalid' : ''}`}
                   id="lastName"
                   placeholder="Last Name"
                   required
                   onChange={e => onInputChange('lastName', e)}
                   value={inputs['lastName'] || ''} />
            <div className="invalid-feedback">{ errors['lastName'] }</div>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="npiNumber" className="form-label">NPI Number</label>
          <input type="text"
                 className={`form-control ${errors['npiNumber'] ? 'is-invalid' : ''}`}
                 id="npiNumber"
                 placeholder="NPI Number"
                 pattern="^\d{10}$"
                 title="NPI Number should be a 10 digit number with no spaces"
                 required
                 onChange={e => onInputChange('npiNumber', e)}
                 value={inputs['npiNumber'] || ''} />
          <div className="invalid-feedback">{ errors['npiNumber'] }</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="businessAddress" className="form-label">Business Address</label>
          <input type="text"
                 className={`form-control ${errors['businessAddress'] ? 'is-invalid' : ''}`}
                 id="businessAddress"
                 placeholder="Business Address"
                 required
                 onChange={e => onInputChange('businessAddress', e)}
                 value={inputs['businessAddress'] || ''} />
          <div className="invalid-feedback">{ errors['businessAddress'] }</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="telephoneNumber" className="form-label">Telephone Number</label>
          <input type="text"
                 className={`form-control ${errors['telephoneNumber'] ? 'is-invalid' : ''}`}
                 id="telephoneNumber"
                 placeholder="Telephone Number"
                 pattern="^\(\d{3}\)\d{3}-\d{4}$"
                 title="Please enter a telephone number with the format (123)456-7890"
                 required
                 onChange={e => onInputChange('telephoneNumber', e)}
                 value={inputs['telephoneNumber'] || ''} />
          <div className="invalid-feedback">{ errors['telephoneNumber'] }</div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="emailAddress" className="form-label">Email Address</label>
          <input type="text"
                 className={`form-control ${errors['emailAddress'] ? 'is-invalid' : ''}`}
                 id="emailAddress"
                 placeholder="Email Address"
                 pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                 title="Please enter a valid email address"
                 required
                 onChange={e => onInputChange('emailAddress', e)}
                 value={inputs['emailAddress'] || ''} />
          <div className="invalid-feedback">{ errors['emailAddress'] }</div>
        </div>
        <div className="form-group">
          <button type="submit" className="form-control btn btn-primary mb-3">Register Now</button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
