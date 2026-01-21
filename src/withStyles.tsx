import React from 'react';
import { withUseHooks } from "./withUseHooks";


// This is used with the "higher-order-component" (HOC) pattern in order to allow the use
// the react hook makeStyles

// the idea is you define you component as normal being sure to include the styles
// in your components properties:
//
//      interface MyComponentsProps { ..., styles: Record<string, string }
//
// Then you can define your styles using the react hook makeStyles:
//
//      const useStyles = makeStyles({ style1: { props: 'propValue' }});
//
// Then you define your component as normal, I choose to define it with pattern "MyComponentWithNoStyles" in the name
//
// The callers want to use <MyComponent>, so you have to create that (using this withStyles function -- that's how
// we make react happy-- we're wrapping our component class with a functional wrapper)
//
// const MyComponent = withStyles(useStyles, MyComponentWithNoStyles);
//
// export MyComponent;              // if you aren't using default exports
// export default MyComponent;      // if you are using default exports

// then, when you want to use the styles you defined in useStyles within your component,
// you will reference "this.props.styles.[whatever]"
export function withStyles(useStyles: any, WrappedComponent: React.ComponentType<any>)
{
  return withUseHooks(WrappedComponent, [{ propName: 'styles', useHook: useStyles }]);
}