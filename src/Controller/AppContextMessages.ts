import {MessageBarIntent} from '@fluentui/react-components';

export interface ClearMessageDelegate
{
    (): void;
}

export interface SetMessageDelegate
{
    (title: string, message: string[], messageType: MessageType, messageIntent: MessageBarIntent, msecVisible?: number): void;
}

export declare type MessageType = 'toast' | 'bar' | 'modal-alert';

export class MessageTypes
{
    public static ModalAlert: MessageType = "modal-alert";
    public static Toast: MessageType = "toast";
    public static MessageBar: MessageType = "bar";
}

export interface IAppContextMessages
{
    // message and error update the MessageBar for the user (with optional
    // timeout to erase them)
    message(title: string, message: string[], type: MessageType, msecVisible?: number): void;
    error(message: string[], type: MessageType, msecVisible?: number): void;
    clearMessage(): void;

    setMessageDelegates(setDelegate: SetMessageDelegate, clearDelegate: ClearMessageDelegate): void;
}

export class AppContextMessages implements IAppContextMessages
{
    m_setMessageDelegate?: SetMessageDelegate;
    m_clearMessageDelegate?: ClearMessageDelegate;

    message(title: string, message: string[], messageType: MessageType, msecVisible?: number)
    {
        if (this.m_setMessageDelegate)
            this.m_setMessageDelegate(title, message, messageType, "info", msecVisible);
    }

    error(message: string[], messageType: MessageType, msecVisible?: number)
    {
        if (this.m_setMessageDelegate)
            this.m_setMessageDelegate("Error", message, messageType, "error", msecVisible);
    }

    clearMessage()
    {
        if (this.m_clearMessageDelegate)
            this.m_clearMessageDelegate();
    }

    setMessageDelegates(addMessageDelegate: SetMessageDelegate, clearMessageDelagate: ClearMessageDelegate)
    {
        this.m_setMessageDelegate = addMessageDelegate;
        this.m_clearMessageDelegate = clearMessageDelagate;
    }
}