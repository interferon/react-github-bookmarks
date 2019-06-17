import { CSSProperties } from 'react';
import { Styles } from 'react-select/lib/styles';
import { Item } from 'src/app/typings/bookmarks_typings';
import { merge } from 'ramda';


export const select_styles: Partial<Record<keyof Styles, (base: CSSProperties, state: {options: Item[], isFocused: boolean}) => CSSProperties>> = {
    control: () => ({ border: 'none', display: "flex", fontSize: 25 }),
    container: () => ({ width: "100%" }),
    menu: () => ({
        boxShadow: "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)",
        top: "90%",
        left: "75px",
        border: "1px solid lightgrey",
        borderTop: 'none',
        backgroundColor: "white",
        borderRadius: '2px',
        marginBottom: '8px',
        marginTop: '8px',
        position: 'absolute',
        width: '50%',
        zIndex: 1,
        overflowY: 'hidden'
    }),
    menuList: (base, state) => 
        ({
            maxHeight: 650,
            overflowY: 'hidden',
            paddingBottom: state.options.length > 0 ? '0px': '0px',
            paddingTop: '0px',
            position: 'relative',
            boxSizing: 'border-box'
        })
    ,
    option: (base, state) => merge(base, { width: "100%", boxSizing: "border-box", padding: '0px'})
};
