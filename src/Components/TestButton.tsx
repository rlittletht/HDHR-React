import React from "react";
import { Button } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";

export interface TestButtonState
{
}

export interface TestButtonProps
{
}

export class TestButton extends React.Component<TestButtonProps, TestButtonState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: TestButtonProps)
    {
        super(props);

        this.state =
        {
        }
    }

    async testButtonClick()
    {
        this.context.Messages.message("title", ["message1", "message2"], MessageTypes.Toast);
    }

    componentDidMount()
    {
    }

    componentWillUnmount()
    {
    }

    render()
    {
        return (
            <div>
                <Button onClick={this.testButtonClick.bind(this)}>
                    TestIt!
                </Button>
            </div>
        );
    }
};