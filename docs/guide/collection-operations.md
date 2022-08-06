# 集合操作


## 查看集合

```yaml
show collections

# 或者
show tables
```

> 查看当前数据库中的所有集合

## 创建集合

可以调用 `db.createCollection(name, options)` 创建一个集合。

```yaml
db.createCollection("stu")

db.createCollection("stu", {capped: true, size: 10})
```

- `capped` 默认值为 `false` 表示不设置上限，值为 `true` 表示设置上限。可以通过调用 `db.集合名.isCapped()` 查看是否设置上限
- `size` 集合所占用的字节数。当 `capped` 值为 `true` 时，需要指定此参数，表示上限大小；当文档达到上限时，会将之前的数据覆盖，单位是字节。


## 删除集合

```yaml
db.COLLECTION_NAME.drop()
```

> 其中 `COLLECTION_NAME` 为需要删除的集合名称。