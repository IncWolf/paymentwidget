import React from 'react'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import countryCodes from '../../country_codes.json'
import PaymentMethod from '../PaymentMethod'
import PaymentCard from '../../containers/PaymentCard'
import SuccessfulMessage from '../SuccessfulMessage'
import CircularProgress from '@material-ui/core/CircularProgress'

const StyledContainer = styled(Container)`
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledPaper = styled(Paper)`
    width: 100%;
    padding: 20px;
`

const PaymentWidget = ({
    selectedCountry,
    price,
    onCountryChange,
    isPaymentMethodsLoading,
    isWidgetLoading,
    paymentMethods,
    onChangeMethod,
    selectedMethod,
    onSubmitForm,
    successfulObject,
}) => {
    if (isWidgetLoading) {
        return (
            <StyledContainer maxWidth="xs">
                <StyledPaper>
                    <CircularProgress />
                </StyledPaper>
            </StyledContainer>
        )
    }

    if (successfulObject) {
        return (
            <StyledContainer maxWidth="xs">
                <StyledPaper>
                    <SuccessfulMessage data={successfulObject} />
                </StyledPaper>
            </StyledContainer>
        )
    }

    return (
        <StyledContainer maxWidth="xs">
            <StyledPaper>
                <h1>Payment Test Task</h1>
                <h2>Price: {price}</h2>
                <TextField
                    select
                    label="Country"
                    onChange={onCountryChange}
                    value={selectedCountry}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your country"
                >
                    {countryCodes.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
                </TextField>
                <PaymentMethod
                    isLoading={isPaymentMethodsLoading}
                    paymentMethods={paymentMethods}
                    onChangeMethod={onChangeMethod}
                    selectedMethod={selectedMethod}
                />
                <PaymentCard
                    logo={selectedMethod.value ? selectedMethod.value.img_url : undefined}
                    onSubmit={onSubmitForm}
                    btnText={price}
                />
            </StyledPaper>
        </StyledContainer>
    )
}

PaymentWidget.propTypes = {
    isPaymentMethodsLoading: PropTypes.bool,
    isWidgetLoading: PropTypes.bool,
    onChangeMethod: PropTypes.func,
    onCountryChange: PropTypes.func,
    onSubmitForm: PropTypes.func,
    paymentMethods: PropTypes.array,
    price: PropTypes.string,
    selectedCountry: PropTypes.string,
    selectedMethod: PropTypes.object,
    successfulObject: PropTypes.object,
}

export default PaymentWidget;