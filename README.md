# mustache

node init 

#好处

可以自动化执行脚本。顺带带来的好处：
不需要一遍遍的输入用户名和密码。之前putty做不到的。

# 知识点

Browser端使用了终端模块xterm.js
使用了express-ws 的Websocket模块
使用了net标准库访问telnet，就足够了

多用户情况下的WebSocket实例和Telnet实例匹配这块，花费了不少时间，但是其实非常简单，就是ws.telnet = telnet，把telnet实例存到ws内，之后就用ws内的telnet即可。

# 坑

一个大坑。本来想用会话来区别传递不同的用户的Options，结果发现在express和websocket之间共享session很难。于是改成了建立了websocket连接后首先发送option，配置好了telnent之后在发命令。

另外一个大坑。是否有回声？中兴是没有回声的，华为除了密码外都会有回声。因此会导致两次发送同样的命令消息给客户端，导致客户端显示输入重复。这个地方需要针对情况区分处理。


# 工具

Smart Websocket Client 帮助调试WebSocket