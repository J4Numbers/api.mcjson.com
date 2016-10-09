import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';

const SET_DATA = 'SET_DATA';
const SET_URL = 'SET_URL';
const CLEAR_DIRTY = 'CLEAR_DIRTY';

/**
 * Load data from a URL into this store (async)
 */
export function loadData(gql, vars, cb) {
    return (dispatch, getState) => {
        gql(vars)
            .then(data => {
                dispatch(setData(data));
                cb && cb();
            })
    }
}

/**
 * Save data from this store to the provided URL
 */
export function saveData(gql, cb) {
    return (dispatch, getState) => {

        gql({ data: getState().data})
            .then(resp => {
                return Promise.all([
                    Promise.resolve(resp.status),
                    resp.status == 200 ? resp.text() : resp.json()
                ])
            })
            .then((code, data) => {
                if (code == 201) {
                    //Set new URL
                    dispatch(setUrl(data.url));
                }
                dispatch({ type: CLEAR_DIRTY });
                cb && cb();
            })
    }
}

/**
 * Set data 
 */
export function setData(data) {
    return {
        type: SET_DATA,
        data: data
    }
}

export function setUrl(url) {
    return {
        type: SET_URL,
        url: url
    }
}

const initialState = {
    url: null,
    isDirty: false,
    data: {}
}

export let store = () => createStore(
    function (state = initialState, action) {
        switch (action.type) {
            case SET_DATA:
                return Object.assign({}, state, {
                    data: action.data,
                    url: action.url != null ? action.url : state.url, //Update URL if provided
                    isDirty: (action.url == null) //No URL? Dirty update
                });
            case SET_URL:
                return Object.assign({}, state, {
                    url: action.url,
                    isDirty: false
                });
            case CLEAR_DIRTY:
                return Object.assign({}, state, {
                    isDirty: false
                });

        }
        return state;
    },
    applyMiddleware(thunk)
)