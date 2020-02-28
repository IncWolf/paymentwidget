import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import Radio from '@material-ui/core/Radio'
import FormHelperText from '@material-ui/core/FormHelperText'

const Wrapper = styled.div`
    margin: 32px 0;
    position: relative;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const List = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-y: auto;
`

const Alert = styled.div`
    border-left: 3px solid red;
    background: rgba(255, 0, 0, .4);
    padding: 10px 0px 10px 30px;
    text-align: left;
`

const PaymentMethodWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 2px solid #a9a9a9;
    border-radius: 20px;
    margin: 10px 5px;
    height: 80px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const PaymentMethodLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 135px;

    & > span {
        font-weight: bold;
        font-size: 16px;
    }
`

const Label = styled(FormHelperText)`
    position: absolute;
    top: -12px;
    left: 0;
`

const StyledCircularProgress = styled(CircularProgress)`
    margin: 0 auto;
`

const PaymentMethod = ({ isLoading, paymentMethods, selectedMethod, onChangeMethod }) => {
    const renderPaymentMethod = (method, selectedMethod, onChange) => {
        return (
            <PaymentMethodWrapper key={method.id} onClick={onChange(method)}>
                <Radio
                    color="primary"
                    checked={selectedMethod.value && selectedMethod.value.id === method.id}
                    name={`radio-button-${method.id}`}
                    inputProps={{ 'aria-label': method.id }}
                />
                <PaymentMethodLabel>
                    <img src={method.img_url} alt={`${method.name} logo`} />
                    <span>{method.name}</span>
                </PaymentMethodLabel>
            </PaymentMethodWrapper>
        )
    }

    if (isLoading) {
        return (<Wrapper><StyledCircularProgress /></Wrapper>)
    }

    if (!isLoading && paymentMethods && paymentMethods.length === 0) {
        return(
            <Wrapper>
                <Alert>
                    We are sorry, but we are not provide payment methods for that country
                </Alert>
            </Wrapper>
        )
    }

    if (paymentMethods) {
        return (
            <Wrapper>
                <Label error={selectedMethod.error}>Payment method *</Label>
                <div>
                    <List>
                        { paymentMethods.map(method => renderPaymentMethod(method, selectedMethod, onChangeMethod))}
                    </List>
                </div>
                <FormHelperText error={selectedMethod.error}>Please choose your payment method</FormHelperText>
            </Wrapper>
        )
    }
    
    return null
}

PaymentMethod.propTypes = {
    isLoading: PropTypes.bool,
    onChangeMethod: PropTypes.func,
    paymentMethods: PropTypes.array,
    selectedMethod: PropTypes.object,
}

export default PaymentMethod;