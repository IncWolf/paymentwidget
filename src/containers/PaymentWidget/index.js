import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PaymentWidget from '../../components/PaymentWidget'

const PaymentWidgetContainer = ({ amount, currency }) => {
    const [selectedCountry, setCountry] = useState('UA')
    const [isPaymentMethodsLoading, setPaymentMethodsLoadingStatus] = useState(false)
    const [paymentMethods, setPaymentMethods] = useState(null)
    const [selectedMethod, setSelectedMethod] = useState({
        value: null,
        error: null
    })

    useEffect(() => {
        getCountry(selectedCountry)
        setSelectedMethod({
            value: null,
            error: null
        })
    }, [selectedCountry])

    const handleChangeMethod = (method) => () => {
        setSelectedMethod({ value: method, error: null })
    }

    const handleCountryChange = ({ target: { value }}) => {
        setCountry(value)
    }

    const handleSubmitForm = (card) => {
        if (!selectedMethod.value) {
            setSelectedMethod({ ...selectedMethod, error: true })
        }
    }

    async function getCountry(countryCode) {
        setPaymentMethodsLoadingStatus(true)
        setPaymentMethods(null)
        const res = await fetch(`https://api.paymentwall.com/api/payment-systems/?key=b1ace6cb384e25a222a0da24e62167a1&country_code=${countryCode}`)
        if (res.ok) {
            const data = await res.json()
            setPaymentMethods(data ? data : [])
        } else {
            setPaymentMethods([])
        }
        setPaymentMethodsLoadingStatus(false)
    }

    return (
        <PaymentWidget
            isPaymentMethodsLoading={isPaymentMethodsLoading}
            onChangeMethod={handleChangeMethod}
            onCountryChange={handleCountryChange}
            onSubmitForm={handleSubmitForm}
            paymentMethods={paymentMethods}
            price={`${amount} ${currency}`}
            selectedCountry={selectedCountry}
            selectedMethod={selectedMethod}
        />
    )
}

PaymentWidget.propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string
}

export default PaymentWidgetContainer