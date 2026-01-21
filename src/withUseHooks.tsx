import React from 'react';

export interface UseHooksProps
{
  propName: string;
  useHook: any;
}

// this is a generic HOC that allows any number of "use*" hooks to be passed in to this HOC
// and then will be passed to the wrapped component as properties
export function withUseHooks(WrappedComponent: React.ComponentType<any>, hooks: UseHooksProps[])
{
  return (props: any) =>
  {
    let propsWithUses = {};

    for (const _item of hooks)
    {
      propsWithUses = { ...propsWithUses, [_item.propName]: _item.useHook() };
    }

    return <WrappedComponent{...props} {...propsWithUses}/>;
  }
}