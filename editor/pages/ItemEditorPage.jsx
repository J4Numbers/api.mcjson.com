import React from 'react';

import { LoadWrapper, loadData } from './wrap.jsx';
import ObjectEditor from './ObjectEditor.jsx';
import ItemEditor from '../editors/ItemEditor.jsx';

import itemStore from '../gql/item/store.gql';
import itemFetch from '../gql/item/get.gql';

const NEW_MODEL = {
                mod: "minecraft",
                id: "",
                name: "",
                introduced_at: "",//TODO: pull latest version number
                changed_at: "",//TODO: pull latest version number
                meta: [],
                flags: {
                    isBlock: false
                },
                technical: false
            }

export function ItemCreatePage(props) {
    return <LoadWrapper
        {...props}
        loaderFn={ loadData(NEW_MODEL) }
        saverFn={data => itemStore({ data: data }).then( () => location.href = `#/items/${data.mod}/${data.id}` ) }
        Composed={ItemEditor}
    />
}

export function ItemEditPage(props) {
    return <LoadWrapper
        {...props}
        loaderFn={(props) => itemFetch({mod: props.params.mod, id: props.params.id}).then( d => d.data[0] )  }
        saverFn={data => itemStore({ data: data })}
        Composed={ItemEditor}
    />
}
//