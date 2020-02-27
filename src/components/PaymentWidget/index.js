import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import countryCodes from '../../country_codes.json';
import PaymentMethod from '../PaymentMethod';
import PaymentCard from '../PaymentCard';

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

const PaymentWidget = ({ amount }) => {
    const [selectedCountry, setCountry] = useState('UA');
    const [isLoading, setLoadingStatus] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null)

    useEffect(() => {
        getCountry(selectedCountry)
    }, [selectedCountry])

    const handleChangeMethod = (methodId) => () => {
        setSelectedMethod(methodId);
    }

    async function getCountry(countryCode) {
        setLoadingStatus(true);
        setPaymentMethods(null);
        const res = await fetch(`https://api.paymentwall.com/api/payment-systems/?key=b1ace6cb384e25a222a0da24e62167a1&country_code=${countryCode}`);
        if (res.ok) {
            const data = await res.json();
            setPaymentMethods(data ? data : []);
        }
        setLoadingStatus(false)
    }

    return (
        <StyledContainer maxWidth="xs">
            <StyledPaper>
                <h1>Payment Test Task</h1>
                <h2>Price: { amount }</h2>
                <TextField
                    select
                    label="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    value={selectedCountry}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your country"
                    variant="outlined"
                >
                    { countryCodes.map(country => <option key={country.code} value={country.code}>{country.name}</option>) }
                </TextField>    
                <PaymentMethod 
                    isLoading={isLoading} 
                    paymentMethods={paymentMethods} 
                    onChangeMethod={handleChangeMethod} 
                    selectedMethod={selectedMethod} 
                />
                { selectedMethod &&
                    <PaymentCard />
                }
            </StyledPaper>
        </StyledContainer>
    );
}

PaymentWidget.propTypes = {
    amount: PropTypes.string,
}

export default PaymentWidget;