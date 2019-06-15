import { CSSProperties } from 'react';
import { Styles } from 'react-select/lib/styles';


export const select_styles: Partial<Record<keyof Styles, () => CSSProperties>> = {
    control: () => ({ border: 'none', display: "flex", fontSize: 25 }),
    container: () => ({ width: "100%" }),
    menu: () => ({
        boxShadow: "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)",
        top: "88%",
        left: "20%",
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
    menuList: () => ({
        maxHeight: 650,
        overflowY: 'auto',
        paddingBottom: '25px',
        paddingTop: '0px',
        position: 'relative',
        boxSizing: 'border-box'
    }),
    option: () => ({ width: "100%", boxSizing: "border-box" })
};
