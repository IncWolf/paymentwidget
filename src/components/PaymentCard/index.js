import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import cardBack from './images/card_back.jpg'

const CreditCard = styled(Paper)`
    padding: 0 20px;
    background: url(${cardBack}) 100% 100% no-repeat;
    height: 228px;
    background-size: cover;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const StyledTextField = styled(TextField)`
    .credit_card {
        text-align: center;
        font-weight: bold;
        font-family: 'Share Tech Mono', monospace;
        font-size: 16px;

        &.number_input {
            font-size: 20px;
        }
    }
`

const Row = styled(Grid)`
    min-height: 70px;
    justify-content: space-between;
    align-items: center;
`

const Logo = styled.img`
    width: 100%;
`

const PaymentCard = ({ card, logo, onBlurCardField, onChangeCardField, onSubmit, btnText }) => (
    <form onSubmit={onSubmit}>
        <CreditCard elevation={3}>
            <Grid container direction="column">
                <Row item container>
                    <Grid item xs={12}>
                        <StyledTextField
                            placeholder="0000 0000 0000 0000"
                            onChange={onChangeCardField}
                            onBlur={onBlurCardField}
                            name="cardNumber"
                            value={card.cardNumber.value.replace(/\d{4}(?=.)/g, '$& ')}
                            helperText={card.cardNumber.error ? card.cardNumber.error : 'Card number'}
                            error={card.cardNumber.error && card.cardNumber.error !== null}
                            inputProps={{
                                className: 'credit_card number_input'
                            }}
                        />
                    </Grid>
                </Row>
                <Row item container>
                    <Grid item xs={5}>
                        <StyledTextField
                            placeholder="12/22"
                            onChange={onChangeCardField}
                            onBlur={onBlurCardField}
                            name="expDate"
                            value={card.expDate.value ? card.expDate.value.replace(/\d{2}(?=.)/g, '$&/') : ''}
                            helperText={card.expDate.error ? card.expDate.error : 'Exp date'}
                            error={card.expDate.error && card.expDate.error !== null}
                            inputProps={{
                                className: 'credit_card expDate_input'
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <StyledTextField
                            placeholder="432"
                            onChange={onChangeCardField}
                            onBlur={onBlurCardField}
                            name="cvv"
                            value={card.cvv.value}
                            helperText={card.cvv.error ? card.cvv.error : 'CVV'}
                            error={card.cvv.error && card.cvv.error !== null}
                            inputProps={{
                                className: 'credit_card cvv_input'
                            }}
                        />
                    </Grid>
                </Row>
                <Row item container>
                    <Grid item xs={6}>
                        <StyledTextField
                            placeholder="YOUR NAME"
                            onChange={onChangeCardField}
                            onBlur={onBlurCardField}
                            name="name"
                            value={card.name.value.toUpperCase()}
                            helperText={card.name.error ? card.name.error : 'Cardholder name'}
                            error={card.name.error && card.name.error !== null}
                            inputProps={{
                                className: 'credit_card name_input'
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {logo &&
                            <Logo src={logo} alt="credit card logo" />
                        }
                    </Grid>
                </Row>
            </Grid>
        </CreditCard>
        <Button type="submit" variant="contained" color="primary">Pay {btnText}</Button>
    </form>
);

PaymentCard.propTypes = {
    btnText: PropTypes.string,
    card: PropTypes.object,
    logo: PropTypes.string,
    onBlurCardField: PropTypes.func,
    onChangeCardField: PropTypes.func,
    onSubmit: PropTypes.func,
}

export default PaymentCard;