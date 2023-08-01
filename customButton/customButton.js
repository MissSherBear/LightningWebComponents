import { LightningElement, api } from 'lwc';

export default class CustomButton extends LightningElement {
    @api buttonlabel;
    @api buttonlink;
    @api buttonvariant;
    @api backgroundcolor;
    @api textcolor;
    @api buttonwidth;
    @api buttonheight;
    @api buttonclass;
    @api buttonicon;

    handleClick() {
        window.open(this.buttonlink, "_self");
        console.log("Button Clicked!");
      }
}