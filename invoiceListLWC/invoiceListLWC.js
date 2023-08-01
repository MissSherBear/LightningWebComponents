import { LightningElement, wire, track, api } from 'lwc';
//import ID_FIELD from '@salesforce/schema/bt_stripe__Sales_Document__c.Id';
import { NavigationMixin } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/bt_stripe__Sales_Document__c.bt_stripe__Name__c';
import SUBJECT_FIELD from '@salesforce/schema/bt_stripe__Sales_Document__c.bt_stripe__Subject__c';
import BALANCE_DUE_FIELD from '@salesforce/schema/bt_stripe__Sales_Document__c.bt_stripe__Balance_Due_Amount__c';
import STATUS_FIELD from '@salesforce/schema/bt_stripe__Sales_Document__c.bt_stripe__Payment_Status__c';
import getInvoiceList from '@salesforce/apex/InvoiceListController.getInvoiceList';

const COLUMNS = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Invoice Name', fieldName: SUBJECT_FIELD.fieldApiName, type: 'text' },
    { label: 'Amount Due', fieldName: BALANCE_DUE_FIELD.fieldApiName, type: 'currency' },
    { label: 'Status', fieldName: STATUS_FIELD.fieldApiName, cellAttributes: { class: { fieldName: 'statusClass'}} },
    {type: "button", typeAttributes: {  
        label: 'View Invoice',  
        name: 'View Invoice',
        actionName: 'View Invoice',  
        title: 'View Invoice',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
    }}
];
/*
const rows = data.map(el => {
    let status;
    switch(el.unpaid_invoice_status_prop_thing){
        case "Unpaid":
            status = "status-red"
            break
        default: 
         break
    }
    return {...el, status}
});
*/
//invoiceUrl = '/apex/InvoicePDF?id=' + ID_FIELD;

export default class InvoiceListLWC extends NavigationMixin (LightningElement) {
    @api url;
    //@track status = 'status-green';
    //@track record = {};
    columns = COLUMNS;
    @track invoices = [];
    @wire(getInvoiceList) invoice;
    
    //row={rows}
    //myUrl = '/apex/InvoicePDF?id=' + this.invoice.Id;
    /*
    wiredInvoice({ error, data}) {
        if ( data ) {

            let rows = [];
            let tempRows = JSON.parse( JSON.stringify( data ) );

            for ( let i = 0; i < tempRows.length; i++ ) {

                let row =  tempRows[ i ];
                console.log( "Element value is " + JSON.stringify( row ) );
                row.hrefVal = "/apex/InvoicePDF?recId=" + row[ "Id" ];
                rows.push( row );
                
            }

            this.invoice = rows;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.invoice = undefined;

        }
    }
    */

    customClass() {
        let text = this.invoice.data.fieldName.STATUS_FIELD;
        let red = text.indexOf("Unpaid");

    }
   wiredInvoices({error, data}) {
       console.log("runningWiredInvoices");
       if (error) {
           // Handle error
       } else if (data) {
           console.log({data});
           this.invoices = data.map((record) => {
               let statusClass = record.STATUS_FIELD === 'Unpaid' ? 'status-red': 'status-green';
               return {...record, 'statusClass': statusClass}
           });
       }
   }


    getRowActions(row, doneCallback) {
        if(row.STATUS_FIELD === 'Unpaid') {
          doneCallback([{ class: 'status-red' }]);
        }
        if(row.STATUS_FIELD === 'Overpaid') {
          doneCallback([{ class: 'status-blue' }]);
        }
      }

    get statusValue() {
        return this.invoice.data.STATUS_FIELD;
    }

    setCustomClass(event) {
        const row = event.detail.row.id;
        this.invoice = row;
        if (row.STATUS_FIELD == 'Unpaid') {
            this.status = 'status-red';
        }
    }

    getRowStatus(row) {
        this.invoice = row;
        return row.STATUS_FIELD;
    }

    changeStatus() {
        const stat = this.invoice.STATUS_FIELD;
        if (stat == 'Unpaid') {
            this.status = 'status-red';
        }
    }

    changeTheme() {
        if (this.invoice.data.columns.STATUS_FIELD.value == 'Unpaid') {
            this.status = 'status-red';
        }
    }

    handleClick(evt){
        var id = evt.currentTarget.dataset.id;
        newUrl = '/apex/InvoicePDF?id=' + id;
        if (id) {
          window.open = '/apex/InvoicePDF?id=' + id;
        }
      }

    handleRowAction(event) {
        const row = event.detail.row.id;
        this.invoice = row;
        row.hrefVal = Invoice_Url__c;
    }

    callInvoiceUrl() {
        const url = this.invoice.Invoice_Url__c;
        return url;
    }
      

    //hrefValue = '/apex/InvoicePDF?id=' + this.invoice.Id;
    callRowAction( event ) {  
          
        const recId =  event.detail.row.Id;  
        const actionName = event.detail.action.name;
        if ( actionName === 'View Invoice') {
            const urlValue = '/apex/InvoicePDF?id=' + recId;
            return urlValue;

        }

        eventhandler() {
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/apex/InvoicePDF?id=' + this.invoice.Id
                }
            })
        }
    }
}