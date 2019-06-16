import React from 'react';
import { LinkCont, Link } from './list_item_components';

type Props = {
    url: string;
    login: string;
    repo_name: string;
};

export const ItemLinkCont = ({ url, login, repo_name }: Props) => {
    return <LinkCont>
        <Link href={url} target="_blank">
            <span>{login}</span>
            /
            <span style={{ fontWeight: 'bold' }}>{repo_name}</span>
        </Link>
    </LinkCont>;
};
