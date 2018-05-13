﻿```html
    <link rel="stylesheet" href="//i.gtimg.cn/qzone/biz/gdt/lib/bootstrap-3.3.7/css/bootstrap-base64font.min.css" />
    <link rel="stylesheet" href='//i.gtimg.cn/qzone/biz/gdt/lib/bootstrap-3.3.7/css/bootstrap-theme.css?max_age=31536000' /> 
    <div id="test"></div>
    <div id="${_Component}">
        <h2>这是一个Vue项目，名称：${_Component}</h2>
        <div>{{text}}</div>
        <ol>
            <li v-for="todo in todos">
            {{ todo.list }}
            </li>
        </ol>
        <button v-on:click="change">同步dispatch</button>
        <Button v-on:click="asyncChange">异步dispatch</button>
        <button v-on:click="promiseChange">promise dispatch</button>
    </div>
```

```css
body {
}
```

```javascript

import _Component from './index.js';
import initProps from './data/index';

import './src/index.less';

export default () => {
    return _Component(initProps);
}

```

- props参数说明

&emsp;&emsp;text: greeting 问好方式
&emsp;&emsp;name: 问好对象