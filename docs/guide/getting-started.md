# 安装

MongoDB 是一个跨平台的 NoSQL 数据库，支持常见的操作系统上安装。

比如 `macOS`、`CentOS 7 & 8`、`Ubuntu`、`Windows` 等。

下面以在 `macOS`、`CentOS7` 和 `Ubuntu` 上安装 MongoDB 6.0 为例。

## MacOS 上安装 MongoDB

以下操作以 `macOS Monterey 12.5` 使用 `brew` 方式安装 MongoDB 社区版

1. 添加 MongoDB 存储库
    macOS 的默认存储库中不存在 `mongodb-org` 软件包。但是，MongoDB 维护一个专用的存储库。
    
    访问 MongoDB 文档的[在 macOS 上安装](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)部分查看更多详情。


    ```bash
    brew tap mongodb/brew
    brew update
    ```

2. 安装 MongoDB

    要安装 MongoDB，请在 macOS 终端应用程序中运行以下命令：

    ```bash
    brew install mongodb-community@6.0
    ```
    > 如果需要，可以指定以前版本的 MongoDB。还可以通过这种方式并排维护多个版本的 MongoDB。

    安装会在以下指定的位置创建以下文件和目录，具体取决于 Apple 硬件

    | 文件或目录 | 因特尔处理器 | 苹果ARM架构处理器 |
    | ---- | --- | ---- |
    | 配置文件 | `/usr/local/etc/mongod.conf` | `/opt/homebrew/etc/mongod.conf` |
    | 日志目录 | `/usr/local/var/log/mongodb` | `/opt/homebrew/var/log/mongodb` |
    | 文件目录 | `/usr/local/var/mongodb` | `/opt/homebrew/var/mongodb` |

3. 启动 MongoDB

通过 `brew` 命令启动 MongoDB:

```bash
brew services start mongodb-community@6.0
```

4. 其他

    1. 开始使用 MongoDB
    ```bash
    mongosh
    ```
    2. 关闭 MongoDB 

        ```bash
        brew services stop mongodb-community@6.0
        ```
    3. 重启 MongoDB

        使用下面的命令来重启 MongoDB:
        ```bash
        brew services restart mongodb-community@6.0
        ```
    4. 卸载 MongoDB

        1. 停止 MongoDB
        ```bash
        brew services stop mongodb-community@6.0
        ```
        2. 删除软件包

        brew uninstall mongodb-community@6.0
        1. 删除数据目录
        ```bash
        # For Intel
        sudo rm -rf /usr/local/var/log/mongodb && sudo rm -r /usr/local/var/mongodb 
        
        # For Apple Silicon
        sudo rm -ff /opt/homebrew/var/log/mongodb && sufo rm -rf /opt/homebrew/var/mongodb
        ```


## CentOS 上安装 MongoDB

安装之前需要预先登录上系统 root 用户。

以下操作以 CentOS 7 为例，使用 `yum` 方式安装 MongoDB 社区版。


1. 添加 MongoDB 存储库

    CentOS 的默认存储库中不存在 `mongodb-org` 软件包。但是，MongoDB 维护一个专用的存储库。
    使用 `vi` 编辑器，为 CentOS 的包管理实用程序 `yum` 创建一个 `.repo` 文件：

    ```bash
    sudo vi /etc/yum.repos.d/mongodb-org.repo
    ```

    访问 MongoDB 文档的[在 Red Hat 上安装](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/#configure-the-package-management-system-yum)部分，并将最新稳定版本的存储库信息添加到文件中。
    
    在文件中写入如下内容：

    ```
    [mongodb-org-6.0]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/6.0/x86_64/
    gpgcheck=1
    enabled=1
    gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc
    ```

    运行 `yum repolist` 可以看到刚刚配置的 `mongodb-org-6.0/7/x86_64         MongoDB Repository` 出现在软件包打印列表中。

2. 安装 MongoDB

    ```bash
    sudo yum install -y mongodb-org
    ```

3. 启动 MongoDB


    通过 `systemctl` 命令启动 MongoDB:
    ```bash
    sudo systemctl start mongod
    ```
4. 随系统启动

    ```bash
    sudo systemctl enable mongod
    ```

5. 其他

   1. 开始使用 MongoDB
        ```bash
        mongosh
        ```
   2. 默认配置文件
        `/etc/mongod.conf`

   3. 目录路径
   
        默认情况下，MongoDB 使用 mongod 用户帐户运行并使用以下默认目录：
        - `/var/lib/mongo`  数据目录
        - `/var/log/mongodb`  日志目录

   4. 关闭 MongoDB `sudo systemctl stop mongod`
   5. 重载 MongoDB 配置

        `reload` 命令请求 mongod 进程读取配置文件 `/etc/mongod.conf`，并应用任何更改而不需要重新启动。
        ```bash
        sudo systemctl reload mongod
        ```
   6. 重启 MongoDB
   
        使用下面的命令来重启 MongoDB:
        ```bash
        sudo systemctl restart mongod
        ```
        > 可以通过查看 `/var/log/mongodb/mongod.log` 文件中的输出来跟踪错误或重要消息的进程状态。

   7. 卸载 MongoDB
       1. 停止 MongoDB 
      
           ```bash
           sudo service mongod stop
           ```
       2. 删除软件包 
      
           ```bash
           sudo yum erase $(rpm -qa | grep mongodb-org)
           ```
       3. 删除数据目录

         ```bash
         sudo rm -r /var/log/mongodb && sudo rm -r /var/lib/mongo
         ```


## Ubuntu 上安装 MongoDB

安装之前需要预先登录上系统 root 用户。

以下操作以 Ubuntu 20.04 (Focal) 为例进行操作，使用 `apt-get` 方式安装 MongoDB 社区版


1. 导入包管理系统使用的公钥

    Ubuntu 的默认存储库中不存在 `mongodb-org` 软件包。但是，MongoDB 维护一个专用的存储库。
    从终端发出以下命令以导入 MongoDB 公共 GPG 密钥，https://www.mongodb.org/static/pgp/server-6.0.asc：

    ```bash
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
    ```

    访问 MongoDB 文档的[在 Ubuntu 上安装](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#create-a-list-file-for-mongodb)部分，并将最新稳定版本的存储库信息添加到文件中。
    
    为 MongoDB 创建一个列表文件：

    ```bash
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    ```

    重新加载本地包数据库

    ```bash
    sudo apt-get update
    ```

1. 安装 MongoDB

    ```bash
    sudo apt-get install -y mongodb-org
    ```

2. 启动 MongoDB


    通过 `systemctl` 命令启动 MongoDB:
    ```bash
    sudo systemctl start mongod
    ```
3. 随系统启动

    ```bash
    sudo systemctl enable mongod
    ```

4. 其他

   1. 开始使用 MongoDB
        ```bash
        mongosh
        ```

   2. 默认配置文件
        `/etc/mongod.conf`

   3. 目录路径
   
        默认情况下，MongoDB 使用 mongod 用户帐户运行并使用以下默认目录：
        - `/var/lib/mongo`  数据目录
        - `/var/log/mongodb`  日志目录

   4. 关闭 MongoDB `sudo systemctl stop mongod`
   5. 重载 MongoDB 配置

        `reload` 命令请求 mongod 进程读取配置文件 `/etc/mongod.conf`，并应用任何更改而不需要重新启动。
        ```bash
        sudo systemctl reload mongod
        ```
   6. 重启 MongoDB
   
        使用下面的命令来重启 MongoDB:
        ```bash
        sudo systemctl restart mongod
        ```
        > 可以通过查看 `/var/log/mongodb/mongod.log` 文件中的输出来跟踪错误或重要消息的进程状态。

   7. 卸载 MongoDB
       1. 停止 MongoDB 
      
           ```bash
           sudo service mongod stop
           ```
       2. 删除软件包 
      
           ```bash
           sudo apt-get purge mongodb-org*
           ```
       3. 删除数据目录

         ```bash
         sudo rm -r /var/log/mongodb && sudo rm -r /var/lib/mongo
         ```

