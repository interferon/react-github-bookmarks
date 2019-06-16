import { create_assets_icon, IconSize, IconType} from "./create_assets_icon";

export const BoardIcon = (
        {size, type, on_click, styles}: {size: IconSize, type : IconType, on_click?: () => void, styles?: Partial<CSSStyleDeclaration>}
) => create_assets_icon(type, size, styles || {}, on_click || (() => {}));
