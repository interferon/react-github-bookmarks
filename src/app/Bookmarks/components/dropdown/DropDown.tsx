import React from 'react'


export type Item = {
    id: string,
    label : string
}

type DropDownProps = {
    items: Item[]
}

export const DropDown  = (props: DropDownProps) : JSX.Element =>  {
    const renderItem = (item: Item, index: number) => {
        return <div key={index}>{item.label}</div>
    };
    console.log(props, "DROPDOWN")
    return <div>
        <h3>DropDown</h3>
        {
            props.items.map(renderItem)
        }
    </div>
}