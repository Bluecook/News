##### 数据库名：company-system

##### 数据表：news

|                                          | 字段名    | 类型     |
| ---------------------------------------- | --------- | -------- |
| 新闻的唯一标识                           | _nid      | chart    |
| 标题                                     | title     | chart    |
| 新闻是否发布                             | isPublish | int      |
| 编辑时间                                 | editTime  | DATETIME |
| 头像                                     | cover     | BLOB     |
| 新闻内容                                 | content   | LONGTEXT |
| 新闻类别                                 | category  | int      |
| 新闻作者(用户id)                         | authorID  | CHART    |
| 谁可见(-1:仅作者可看,0:vip可看,1:均可看) | show      | int      |

##### 数据表：users

|                                              | 字段名       | 类型    |
| -------------------------------------------- | ------------ | ------- |
| 用户id                                       | _uid         | CHART   |
| 用户名                                       | username     | CHART   |
| 用户角色（0：管理员,1:VIP用户，2：普通用户） | role         | INT     |
| 用户密码                                     | password     | CHART   |
| 个人简介                                     | introduction | VARCHAR |
| 性别(0:男，1:女)                             | gender       | INT     |
| 头像                                         | avatar       | BLOB    |

##### 数据表：products

|          | 字段名       | 类型     |
| -------- | ------------ | -------- |
| 产品id   | _pid         | CHART    |
| 标题     | title        | VARCHART |
| 简介     | introduction | VARCHART |
| 编辑时间 | editTime     | DATETIME |
| 详情     | detail       | LONGTEXT |
| 图片     | cover        | BLOB     |

