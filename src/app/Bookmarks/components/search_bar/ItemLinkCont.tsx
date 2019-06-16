import React from 'react';
import { LinkCont, Link } from './list_item_components';

type Props = {
    url: string;
    login: string;
    repo_name: string;
    disabled?: boolean
};

export const ItemLinkCont = ({ url, login, repo_name, disabled}: Props) => {
    return <LinkCont>
        <Link href={url} target="_blank" disabled={!!disabled}>
            <span style={{ fontWeight: 400 }}>{`${login}/`}</span>
            <span style={{ fontWeight: 600 }}>{repo_name}</span>
        </Link>
    </LinkCont>;
};
