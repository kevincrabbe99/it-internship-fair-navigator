import React from 'react'
import './pdf.scss';

export default function Worksheet(){
    return(
        <div id = "embed">
            <div id = "pdf"></div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.2.7/pdfobject.min.js"></script>
            
            <script>
                var viewpdf = $("#pdf");

                PDFObject.embed("InternshipFairPreparationWorksheet.pdf", viewpdf);
            </script>
        </div>
    )
}