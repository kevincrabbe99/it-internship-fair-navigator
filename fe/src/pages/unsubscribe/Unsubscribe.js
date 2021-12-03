import React from 'react'
import { useEffect } from 'react'
import './unsubscribe.scss'

import { unsubscribeEmail } from '../../util/Endpoints'


export default function Unsubscribe() {


    const [email, setEmail] = React.useState('')

    const [unsubscribeResponse, setUnsubscribeResponse] = React.useState('')
    const [submitUnsubscribe, setSubmitUnsubscribe] = React.useState(false)

    // submit feedback effect
    useEffect(() => {
        async function submitUnsubscribeAsyncWrapper() {
            const res = await unsubscribeEmail(email)
            setUnsubscribeResponse(res)
        }

        if (submitUnsubscribe) {
            submitUnsubscribeAsyncWrapper()
        }

        // clean
    }, [submitUnsubscribe])

    return (
        <div className="uePage">
            
            {/* Feedback response form */}
            <div className = "unsubscribe-wrapper">
                <div className="unsubscribe-container">
                    <div className="unsubscribe-header">
                        <h1>Sorry to see you go!!</h1>
                    </div>

                    <div className="unsubscribe-body">
                        {/* <form> */}
                            <div className="uf-email input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" 
                                    onChange = {e => setEmail(e.target.value)}/>
                            </div>

                            <div className="uf-submit">
                                <button onClick={() => setSubmitUnsubscribe(!submitUnsubscribe)}>Unsubscribe</button>
                            </div>

                        {/* </form> */}
                    </div>
                </div>

                <div className="unsubscribe-response">
                    {unsubscribeResponse}
                </div>

            </div>

        </div>
    )
}
