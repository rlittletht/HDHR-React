/*----------------------------------------------------------------------------
    ModalPrompt.tsx

----------------------------------------------------------------------------*/

import React from 'react';
import '../../App.css';
import { TheAppContext, IAppContext } from "../../Controller/AppContext";
import { makeStyles, Dialog, Button, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions } from
    '@fluentui/react-components';
import { withStyles } from '../../withStyles';

export interface OnDismissDelegate
{
    (): void;
}

export interface OnConfirmDelegate
{
    (): void;
}

export interface ModalPromptProps
{
    styles: Record<string, string>;
    open?: boolean;
    onSave: OnConfirmDelegate;
    onDismiss: OnDismissDelegate;
    title?: string;
    confirm?: string;
    cancel?: string;
    children: React.ReactNode;
}

export interface ModalPromptState
{
    //    itemEditing: GroupAdmin;
    isOpen: boolean;
}

const useStyles = makeStyles(
    {
    });

class ModalPromptWithoutStyles extends React.Component<ModalPromptProps, ModalPromptState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: ModalPromptProps)
    {
        super(props);
        this.state =
        {
            isOpen: this.props.open ?? false,
        };
    }

    async onCommit(formEvent: React.FormEvent)
    {
        formEvent.preventDefault();
        this.props.onSave();
    }

    dismissDialog()
    {
        this.props.onDismiss();
    }

    render()
    {
        const dismissOpen = () => this.dismissDialog();
        const onSubmit: (event: any) => void = (event) => this.onCommit(event);
        const cancel = this.props.cancel ?? "Cancel";
        const confirm = this.props.confirm ?? "OK";

        return (
            <Dialog modalType="modal" open={this.props.open}>
                <DialogSurface>
                    <form onSubmit={onSubmit}>
                        <DialogBody>
                            <DialogTitle>{this.props.title}</DialogTitle>
                            <DialogContent className={this.props.styles.content}>
                                {this.props.children}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={dismissOpen} appearance="secondary">{cancel}</Button>
                                <Button type="submit" appearance="primary">{confirm}</Button>
                            </DialogActions>
                        </DialogBody>
                    </form>
                </DialogSurface>
            </Dialog>)
    }
}

export const ModalPrompt = withStyles(useStyles, ModalPromptWithoutStyles);