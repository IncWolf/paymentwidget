import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const List = styled.ul`
    list-style: none;
    padding: 0;
    text-align: left;
    background: #ececec;
    padding: 30px;
    font-family: monospace;
    font-size: 16px;
`

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
    color: green;
    font-size: 100px;
`

const Alert = styled.p`
    padding: 30px;
    background: rgba(0, 255, 0, .4);
    border-left: 3px solid green;
    text-align: left;
    font-size: 16px;
`

const SuccessfulMessage = ({ data }) => (
    <div>
        <StyledCheckCircleIcon />
        <h1>Success!</h1>
        <Alert>You just successfully fill out test card form and get that fancy message!</Alert>
        <List>
            { Object.entries(data).map(([fieldKey, fieldValue]) => <li><strong>{fieldKey}:</strong> {fieldValue}</li>)}
        </List>
    </div>
)

SuccessfulMessage.propTypes = {
    data: PropTypes.object
}

export default SuccessfulMessage