import { Injectable } from "@angular/core";
import { MessageType } from "./message.service";

@Injectable()
export class HeaderMessageService {

    private messagePopup: HTMLElement[] = [];
    // private messageServicePanel: HTMLElement | null = null;

    constructor(
    ) {
    }

    /* setMessagePanel(element: HTMLElement) {
         this.messageServicePanel = element;
     }*/

    addMessage(message: MessageType) {
        const messagePanel = document.getElementById('dashboard-message-panel')
        if (!messagePanel) {
            throw new Error('neew element with dashboard-message-panel id')
        }
        let popup = document.createElement("div");
        popup.innerHTML = message.messageText;
        popup.setAttribute("class", `header-message header-message--${message.alert}`);
        //this.messageServicePanel.appendChild(popup);
        messagePanel.appendChild(popup);
        this.messagePopup.push(popup);
        setTimeout(() => {
            const lastPopup = this.messagePopup.pop()
            if (lastPopup) {
                lastPopup.remove()
            };
        }, 5000); // Remove messages after 5 seconds
    }

}