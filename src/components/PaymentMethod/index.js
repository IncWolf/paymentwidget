import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

const Wrapper = styled.div`
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
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
    width: 160px;
    border: 2px solid #3f51b5;
    border-radius: 20px;
    margin: 10px 0;
    height: 80px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const PaymentMethodLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
        font-weight: bold;
        font-size: 16px;
    }
`

const PaymentMethod = ({ isLoading, paymentMethods, selectedMethod, onChangeMethod }) => {
    const renderPaymentMethod = (method, selectedMethod, onChange) => {
        return (
            <PaymentMethodWrapper key={method.id} onClick={onChange(method.id)}>
                <Radio
                    color="primary"
                    checked={selectedMethod === method.id}
                    value={method.id}
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
        return (<Wrapper><CircularProgress /></Wrapper>)
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
                { paymentMethods.map(method => renderPaymentMethod(method, selectedMethod, onChangeMethod))}
            </Wrapper>
        )
    }
    
    return null
}

export default PaymentMethod;