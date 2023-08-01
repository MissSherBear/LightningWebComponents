import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import InvoiceCSS from '@salesforce/resourceUrl/InvoiceStatus';

export default class InvoiceStatusColor extends LightningElement {
    @api invoicestatus;
    @api color;

    renderedCallback() {
        
        Promise.all([
            loadStyle( this, InvoiceCSS )
            ]).then(() => {
                console.log( 'Files loaded' );
            })
            .catch(error => {
                console.log( error.body.message );
        });

    }

    get getColor() {
        if (this.invoicestatus != undefined) {
            var invoicestatusLowerCase = this.invoicestatus;
            var cRed = 'Unpaid';
            var cYellow = 'Pending';
            var cBlue = 'Overpaid';
            var cGreen = 'Paid';

            if (cRed.indexOf(invoicestatusLowerCase) != -1) {
                this.color='red';

            } else if (cYellow.indexOf(invoicestatusLowerCase) != -1) {
                this.color='yellow';

            } else if (cBlue.indexOf(invoicestatusLowerCase) != -1) {
                this.color='blue';

            } else if (cGreen.indexOf(invoicestatusLowerCase) != -1) {
                this.color='green';
            }

        return this.color;

        }
    }
}