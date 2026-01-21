/*----------------------------------------------------------------------------
    StatusBarToast.tsx

    We have two ways of communicating status to the user:

    MessageBar:
        A messagebar that shows up at the top of the screen. This is useful
        for wide and potentially very long pieces of information

    Toast:
        Pops up for some period of time with quick information about
        something.


----------------------------------------------------------------------------*/
import React from 'react';
import '../../App.css';
import { TheAppContext, IAppContext, AppContext } from "../../Controller/AppContext";
import { DismissRegular } from "@fluentui/react-icons";
import { ToastTrigger, makeStyles, MessageBar, MessageBarIntent, MessageBarBody, MessageBarActions, Button } from '@fluentui/react-components';
import { withStyles } from '../../withStyles';
import { ToastContext, ToastContextType } from './ToastContext';
import { MessageType, MessageTypes } from '../../Controller/AppContextMessages';
import {
    Toast,
    ToastTitle,
    ToastBody,
} from "@fluentui/react-components";

export interface StatusBoxToastProps
{
    styles: Record<string, string>;
    appContext: AppContext;
    toastContext: ToastContextType;
    //    title?: string;
    //    children: React.ReactNode;
}

export interface StatusBoxToastState
{
    message: string[];
    messageType: MessageBarIntent;
}

const useStyles = makeStyles(
    {
        relativeContainer:
        {
            position: 'relative'
        },
        messageBarFloatie: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000
        }
        //        dividerCustom: {
        //            fontSize: '14px',
        //            fontWeight: 'bold'
        //        },
        //        insetContent: {
        //            marginLeft: '.1in',
        //            marginRight: '.1in'
        //        }

    });

class StatusBoxToastWithoutStyles extends React.Component<StatusBoxToastProps, StatusBoxToastState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    m_pendingTimer: any;
    clearCount: number = 0;

    constructor(props: StatusBoxToastProps)
    {
        super(props);
        this.state =
        {
            message: [],
            messageType: "info"
        }
    }

    componentDidMount()
    {
        this.context.Messages.setMessageDelegates(this.setMessage.bind(this), this.clearMessage.bind(this));
    }

    clearMessage()
    {
        this.setState(
            {
                message: [],
                messageType: "info"
            });

        if (this.m_pendingTimer != null)
        {
            clearTimeout(this.m_pendingTimer);
            this.m_pendingTimer = null;
        }
    }

    delayClearMessage()
    {
        this.clearMessage();
    }

    setMessage(title: string, message: string[], messageType: MessageType, messageIntent: MessageBarIntent, msecVisible?: number)
    {
        if (messageType == MessageTypes.ModalAlert)
        {
            alert(`${message}`);
            return;
        }

        if (messageType == MessageTypes.Toast)
        {
            const messageBody = message.map((_item, _idx) => (<div key={_idx}>{_item}</div>));

            this.props.toastContext.dispatchToast(
                <Toast>
                    <ToastTitle>{title}</ToastTitle>
                    <ToastBody>{messageBody}</ToastBody>
                    <ToastTrigger>
                        <Button
                            aria-label="dismiss"
                            appearance="transparent"
                            icon={<DismissRegular/>}/>
                    </ToastTrigger>
                </Toast>,
                { timeout: msecVisible, intent: messageIntent }
            );

            return;
        }

        this.setState({ message: message, messageType: messageIntent });

        if (this.m_pendingTimer != null)
        {
            clearTimeout(this.m_pendingTimer);
            this.m_pendingTimer = null;
        }

        if (msecVisible && msecVisible != 0)
            this.m_pendingTimer = setTimeout(() => this.delayClearMessage(), msecVisible);
    }

    render()
    {
        const messageBody = this.state.message.map((_item, _idx) => (<div key={_idx}>{_item}</div>));

        return this.state.message.length > 0
            && (
                <div className={this.props.styles.relativeContainer}>
                    <MessageBar intent={this.state.messageType} className={this.props.styles.messageBarFloatie}>
                        <MessageBarBody>
                            {messageBody}
                        </MessageBarBody>
                        <MessageBarActions
                            containerAction={
                            <Button
                                onClick={() => this.clearMessage()}
                                aria-label="dismiss"
                                appearance="transparent"
                                icon={<DismissRegular />} />}/>
                    </MessageBar>
                </div>
            );
    }
}

export const StatusBoxToastWithStyles = withStyles(useStyles, StatusBoxToastWithoutStyles);

// we have to provide BOTH contexts to the statusbox (the app context so we can
// register things AND the toast context. so, we wrap the component with this
// to pass in the contexts as properties (much like what we did for styles...)
function withContexts(WrappedComponent: React.ComponentType<any>)
{
    return function(props: any)
    {
        return (
            <TheAppContext.Consumer>
                {(valueOne) => (
                    <ToastContext.Consumer>
                        {(valueTwo) =>
                        {
                            // Pass both context values as props to the wrapped component
                            return <WrappedComponent {...props} appContext={valueOne} toastContext={valueTwo}/>;
                        }}
                    </ToastContext.Consumer>
                )}
            </TheAppContext.Consumer>
        );
    };
}

export const StatusBoxToast = withContexts(StatusBoxToastWithStyles);