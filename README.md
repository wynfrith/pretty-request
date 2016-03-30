# pretty-request
一个更简洁的http请求框架 for node.js

## 说明

基于request库的promise实现

## 特点

- 更方便的cookie传递
- 与request-promise相比返回值更加友好
- 融合request-debug, 方便调试
- 默认allowRedirect改为false
- 可选择body解码方式


### 使用

```javascript
  let res = yield prettyRequest.post( url , {
            form: { key: value },
            cookies: { key: value},
            decode: 'gbk',
            debug: true,
            headers: headers
          });

 console.log(res.body)
 console.log(res.statusCode)
 console.log(res.statusMessage)
 console.log(res.cookies) // { cookie1: value1, cookie2: value2 }
 console.log(res.headers)
 console.log(res.raw); // 未加工的reponse
```