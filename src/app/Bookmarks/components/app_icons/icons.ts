import { create_assets_icon, Size, IconType} from "./create_assets_icon";

export const BIcon = ({size, type, on_click}: {size: Size, type : IconType, on_click?: () => void}) => create_assets_icon(type, size, on_click);
