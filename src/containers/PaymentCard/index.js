import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PaymentCard from '../../components/PaymentCard'

const PaymentCardContainer = ({ logo, onSubmit, btnText }) => {
    const [card, setCardData] = useState({
        name: {
            value: '',
            error: null,
        },
        cardNumber: {
            value: '',
            error: null,
        },
        expDate: {
            value: '',
            error: null,
        },
        cvv: {
            value: '',
            error: null,
        },
    })

    const validator = (name, value) => {
        switch (name) {
            case 'cardNumber':
                if (!isNaN(value)) {
                    const arrayOfDigits = value.split('').reverse().map(digit => Number(digit));
                    const sum = arrayOfDigits.reduce((acc, curr, index) => {
                        if (index % 2 !== 0) {
                            const modValue = curr * 2
                            return modValue > 9 ? acc + modValue - 9 : acc + modValue
                        } else {
                            return acc + curr
                        }
                    })
                    return sum % 10 !== 0 ? 'Cardnumber is not valid' : null
                } else {
                    return 'Only digits allowed'
                }
            case 'expDate':
                if (isNaN(value) || new Date('20' + value.slice(2), value.slice(0, 2) - 1) < new Date()) {
                    return 'Exp. date incorrect'
                }
                return null
            case 'cvv':
                return isNaN(value) ? 'Only digits' : null
            case 'name':
                return value.match(/^[A-Za-z ]+$/) ? null : 'Only characters allowed'
            default:
                return null
        }
    }

    const validateForm = () => {
        const cardState = { ...card }
        let isValid = true
        Object.entries(card).forEach(([key, value]) => {
            const error = validateField(key)
            if (error) {
                isValid = false
            }
            cardState[key] = { ...value, error }
        })
        setCardData(cardState)
        return isValid
    }

    const validateField = (key) => {
        return card[key].value !== '' ? validator(key, card[key].value) : 'Required'
    }

    const handleBlurCardField = ({ target: { name } }) => {
        const error = validateField(name)
        setCardData({...card, [name]: { ...card[name], error } })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit({
                name: card.name.value,
                cvv: card.cvv.value,
                expDate: card.expDate.value,
                cardNumber: card.cardNumber.value,
            })
        }
    }

    const handleChangeCardField = ({ target: { name, value } }) => {
        if (name === 'expDate') {
            if (value.length <= 5) {
                const cleanDate = value.replace('/', '')
                setCardData({ ...card, [name]: { value: cleanDate, error: cleanDate !== '' ? validator(name, cleanDate) : null } })
            }
        } else if (name === 'cardNumber') {
            const changedNumber = value.replace(/ /g, '')
            setCardData({ ...card, [name]: { value: changedNumber, error: changedNumber !== '' ? validator(name, changedNumber) : null } })
        } else {
            setCardData({ ...card, [name]: { value, error: value !== '' ? validator(name, value) : null } })
        }
    }

    return (
        <PaymentCard 
            btnText={btnText}
            card={card}
            logo={logo}
            onBlurCardField={handleBlurCardField}
            onChangeCardField={handleChangeCardField}
            onSubmit={handleSubmit}
        />
    )
}

PaymentCardContainer.propTypes = {
    btnText: PropTypes.string,
    logo: PropTypes.string,
    onSubmit: PropTypes.func,
}

export default PaymentCardContainer