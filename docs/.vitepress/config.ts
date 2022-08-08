import {defineConfig} from 'vitepress'

export default defineConfig({
    lang: "zh-CN",
    title: "MongoDB",
    base: "/mongodb-study/",
    description: "MongoDB 学习",
    lastUpdated: true,
    themeConfig: {
        logo: "https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress",
        siteTitle: "",
        outlineTitle: "章节导航",
        lastUpdatedText: "最后更新时间",
        editLink: {
            pattern: "https://github.com/curder/mongodb-study/edit/master/docs/:path",
            text: '编辑它'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/curder/mongodb-study'}
        ],
        nav: nav(),
        sidebar: {
            "/guide": sidebarGuide(),
        }
    }
})

function nav() {
    return [
        {text: 'Guide', link: '/guide/what-is-mongodb', activeMatch: '/guide/'},
    ];
}

function sidebarGuide() {
    return [
        {
            text: "基础",
            collapsible: true,
            collapsed: false,
            items: [
                {text: 'MongoDB 介绍', link: "/guide/what-is-mongodb"},
                {text: "MongoDB 安装", link: "/guide/getting-started"},
                {text: "MongoDB 数据库操作", link: "/guide/database-operations"},
                {text: "MongoDB 集合操作", link: "/guide/collection-operations"},
                {text: "MongoDB 数据类型", link: "/guide/bson-types"},
                {text: "MongoDB 增加文档", link: "/guide/document-insert"},
                {text: "MongoDB 查询文档", link: "/guide/document-query"},
                {text: "MongoDB 更新文档", link: "/guide/document-update"},
                {text: "MongoDB 删除文档", link: "/guide/document-delete"},
                {text: "MongoDB 操作符", link: "/guide/operators"},
            ]
        },
    ];
}