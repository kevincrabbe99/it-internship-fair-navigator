import React from 'react'
import './DisplayFile.scss'
import pdf from '../Internship Fair Checklist.pdf'

export class DisplayCL extends React.Component{
    render(){
        <a href = {pdf}>Download Internship Fair Checklist</a>
    }
}