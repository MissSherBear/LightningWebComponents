import { LightningElement, api } from "lwc";

export default class RecordDetail extends LightningElement {
    @api recordId;
    @api title;
    @api icon;
    @api object;
    @api fields;
    @api layout; // [compact, full]
    @api mode = "readonly"; // [edit, view, readonly]
    @api columns;

    get fieldSet() {
        return this.fields ? this.fields.split(",").map((item) => item.trim()) : [];
    }
}