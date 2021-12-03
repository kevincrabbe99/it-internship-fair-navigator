import React from 'react'
import { useEffect } from 'react'
import './subscribe.scss'

import { subscribeEmail } from '../../util/Endpoints'


export default function Subscribe() {


    const [email, setEmail] = React.useState('')

    const [subscribeResponse, setSubscribeResponse] = React.useState('')
    const [submitSubscribe, setSubmitSubscribe] = React.useState(false)

    // submit feedback effect
    useEffect(() => {
        async function submitSubscribeAsyncWrapper() {
            const res = await subscribeEmail(email)
            setSubscribeResponse(res)
        }

        if (submitSubscribe) {
            submitSubscribeAsyncWrapper()
        }

        // clean
    }, [submitSubscribe])

    return (
        <div className="sePage">
            
            {/* Feedback response form */}
            <div className = "subscribe-wrapper">
                <div className="subscribe-container">
                    <div className="subscribe-header">
                        <h1>Subscribe to Our Mailing List!</h1>
                    </div>

                    <div className="subscribe-body">
                        {/* <form> */}
                            <div className="sf-email input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" 
                                    onChange = {e => setEmail(e.target.value)}/>
                            </div>

                            <div className="sf-submit">
                                <button onClick={() => setSubmitSubscribe(!submitSubscribe)}>Subscribe</button>
                            </div>

                            <div className="sf-unsubscribe">
                                <button onClick={() => window.open( "/unsubscribe" , '_top')}>Or unsubscribe</button>
                            </div>

                        {/* </form> */}
                    </div>
                </div>

                <div className="subscribe-response">
                    {subscribeResponse}
                </div>

            </div>

        </div>
    )
}
