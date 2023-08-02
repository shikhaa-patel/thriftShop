import React from 'react'

export default function Alert(props) {
    return (
        <>
            <div className={`alert alert-danger`} role="alert">
                <strong>{props.strong}</strong>&nbsp; {props.message}
            </div>
        </>
    )
}
