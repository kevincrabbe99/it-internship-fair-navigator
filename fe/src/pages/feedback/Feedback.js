import React from 'react'
import { useEffect } from 'react'
import './feedback.scss'

import { sendFeedback } from '../../util/Endpoints'


export default function Feedback() {


    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    const [feedbackResponse, setFeedbackResponse] = React.useState('')
    const [submitFeedback, setSubmitFeedback] = React.useState(false)

    // submit feedback effect
    useEffect(() => {
        async function submitFeedbackAsyncWrapper() {
            const res = await sendFeedback(email, message)
            setFeedbackResponse(res)
        }

        if (submitFeedback) {
            submitFeedbackAsyncWrapper()
        }

        // clean
    }, [submitFeedback])

    return (
        <div className="fbPage">
            
            {/* Feedback response form */}
            <div className = "feedback-wrapper">
                <div className="feedback-container">
                    <div className="feedback-header">
                        <h1>Feedback</h1>
                    </div>

                    <div className="feedback-body">
                        {/* <form> */}
                            <div className="fbf-email input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" 
                                    onChange = {e => setEmail(e.target.value)}/>
                            </div>

                            <div className="fbf-message input-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" placeholder="Enter your message" 
                                    onChange = {e => setMessage(e.target.value)}/>
                            </div>

                            <div className="fbf-submit">
                                <button onClick={() => setSubmitFeedback(!submitFeedback)}>Submit</button>
                            </div>

                        {/* </form> */}
                    </div>
                </div>

                <div className="feedback-response">
                    {feedbackResponse}
                </div>

            </div>

        </div>
    )
}
