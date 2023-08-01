import { LightningElement } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import CONFETTI from "@salesforce/resourceUrl/confetti";

export default class Confetti extends LightningElement {
    connectedCallback() {
        Promise.all([
            loadScript(this, CONFETTI)
        ])
        .then(() => {
            this.setUpCanvas();
            // calling Confetti
            this.basicCannon();
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error", 
                    message: error.message, 
                    variant: error
                })
              );
            });
        
    }

    setUpCanvas() {
        let confettiCanvas = this.template.querySelector("canvas.confettiCanvas");
        this.myConfetti = confetti.create(confettiCanvas, {resize: true});
        this.myConfetti({zIndex: 1000});
    }

    basicCannon() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6}
        });
    }
}