import { connectLoader, loadData } from '../wrap.jsx';
import ItemEditor from './editor.jsx';

import itemStore from '../../gql/item/store.gql';
import itemFetch from '../../gql/item/get.gql';

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

export const ItemCreatePage = connectLoader(
    ItemEditor,
    loadData(NEW_MODEL),
    data => itemStore({ data: data }).then(() => location.href = `#/items/${data.mod}/${data.id}`)
);

export const ItemEditPage = connectLoader(
    ItemEditor,
    (props) => itemFetch({ mod: props.params.mod, id: props.params.id }).then(d => {
        if (d.data.length == 0) {
            location.href = `#/items/_new`;
        } else {
            return d.data[0];
        }
    }),
    data => itemStore({ data: data })
);