import { Injectable } from "@angular/core";

export type MessageType = {
    messageText: string,
    alert: 'success' | 'warning' | 'danger',
}

@Injectable()
export class MessageService {

    private messagePopup: HTMLElement[] = [];
    private messageServiceColumnPanel: HTMLElement;

    constructor() {
        const servicePanel = (document.body.getElementsByClassName('message-panel')[0] as HTMLElement);
        const columnPanel = (servicePanel?.getElementsByClassName('message-column')[0] as HTMLElement);
        if (columnPanel) {
            this.messageServiceColumnPanel = columnPanel;
        } else {
            const appRootElement = document.body.getElementsByTagName('app-root')[0];
            const newServicePanel = document.createElement("div");
            newServicePanel.setAttribute('class', 'message-panel');
            const popupColumnPanel = document.createElement("div");
            popupColumnPanel.setAttribute('class', 'message-column');
            newServicePanel.appendChild(popupColumnPanel)
            appRootElement.appendChild(newServicePanel);
            this.messageServiceColumnPanel = popupColumnPanel;
        }
    }



    addMessage(message: MessageType) {
        let popup = document.createElement("div");
        popup.innerHTML = message.messageText;
        popup.setAttribute("class", `overlay-message overlay-message--${message.alert}`);
        this.messageServiceColumnPanel.appendChild(popup);
        this.messagePopup.push(popup);
        setTimeout(() => {
            const lastPopup = this.messagePopup.pop()
            if (lastPopup) {
                lastPopup.remove()
            };
        }, 5000); // Remove messages after 5 seconds
    }

}