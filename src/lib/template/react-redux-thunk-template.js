
module.exports = function reactReduxTemplate(componentName) {
    return `import React from 'react';
import ReactDOM from 'react-dom';

import {applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

// 支持redux调试
import { composeWithDevTools } from 'redux-devtools-extension';

import { Route, Switch, Link } from 'react-router-dom';

import {AppContainer} from 'react-hot-loader';

// 引入组件
import Component from '../.build/${componentName}/entry';
import template from '../.build/${componentName}/template';
// import reducer from '../.build/${componentName}/src/reducer';

import '../.build/${componentName}/style';

const reducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return Object.assign({}, state, action.data);
    }
};

let initStore = require('../.build/${componentName}/data').default || {};

let middlewares = [reduxThunk, reduxPromise];

// // 考虑如何使用combineReducer
// const store = createStore(combineReducers({
//     componentName: reducer
//   }), composeWithDevTools(applyMiddleware(...middlewares)));

const store = createStore(reducer, initStore, composeWithDevTools(applyMiddleware(...middlewares)));

// 直接引用组件的用法
const render = (Component) => {
    ReactDOM.render((
        <AppContainer>
            <Provider store={store}>
                {Component}
            </Provider>
        </AppContainer>
    ), document.getElementById('root'));
};

/**
 * 用于从调试页面中注入store数据
 * 
 * @param {any} actionType 
 * @param {any} data 
 * @param {any} storeKey 
 */
window.dispatchData = function(actionType, data, storeKey) {

    // 将调试的data dispatch到组件关联的store
    const actionCreator = (actionType) => {
        return (dispatch, getState) => {
            dispatch({
                type: actionType,
                data: storeKey ? {
                    [storeKey] : data
                } : data
            });
        };
    }

    store.dispatch(actionCreator(actionType));

    // 将最终的store结果反馈给父页面
    parent.window.reflectStore(store);
}

document.getElementById('template').outerHTML = template;

render(Component);

// 进行热替换调试组件内容
if (module.hot && process.env.NODE_ENV !== 'production') {

    module.hot.accept([
        '../.build/${componentName}/index',
        '../.build/${componentName}/entry'
    ], (err) => {
        if (err) {
            console.log(err);
        }
        const NextComponent = require('../.build/${componentName}/entry').default;

        render(NextComponent);
    });
};`

}