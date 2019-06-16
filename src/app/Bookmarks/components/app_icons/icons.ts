import { BoardIconProps, create_assets_icon } from "./create_assets_icon";


export const BoardIcon = ({size, type, on_click, styles, color}: Partial<BoardIconProps>) =>
    create_assets_icon({
        type: type || 'plus',
        size: size || 'normal',
        color: color || '#999',
        styles: styles || {},
        on_click: on_click || (() => {})
    });
