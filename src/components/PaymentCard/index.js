import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const CreditCard = styled(Paper)`
    background: black;
    padding: 20px;
`

const StyledTextField = styled(TextField)`
    .credit_card_input {
        color: gold;
    }
`

const PaymentCard = () => {
    const [card, setCardData] = useState({
        name: {
            value: '',
            error: null
        },
        cardNumber: {
            value: '',
            error: null
        },
        expDate: {
            value: '',
            error: null
        },
        cvv: {
            value: '',
            error: null
        }
    })

    const handleChangeCardField = ({ target: { name, value } }) => {
        setCardData({...card, [name]: { value }})
    }

    return (
        <form>
            <CreditCard>
                <StyledTextField
                    placeholder="YURIY MARKOVICH"
                    onChange={handleChangeCardField}
                    name="name"
                    value={card.name.value.toUpperCase()}
                    helperText={card.name.error ? card.name.error : undefined}
                    error={card.name.error}
                    InputProps={{
                        className: 'credit_card_input'
                    }}
                />
            </CreditCard>
            <Button variant="contained" color="primary">Submit</Button>
        </form>
    );
}

export default PaymentCard;