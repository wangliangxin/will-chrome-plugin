chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: 'article-share',
        title: '快速分享',
        contexts: ['all']
    });
    //分割线
    chrome.contextMenus.create({
      type: "separator",
    });
    chrome.contextMenus.create({
        id: 'test-menu',
        title: '第二个菜单',
        contexts: ['all']
    });
    chrome.contextMenus.create({
        id: "test-menu-2.1",
        parentId: "test-menu",
        title: "浏览我的博客",
        contexts: ["all"],
        onclick: function (params){
            chrome.tabs.create({
                url: "https://willwong.gitee.io/will/"
            })
        }
      });
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch(info.menuItemId){
        case 'article-share':
            handleArticleShare();
            break;
    }
});

function handleArticleShare(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const title = tabs[0].title
        const url = tabs[0].url
        var copyFrom = document.createElement("textarea")
        copyFrom.setAttribute("id","copyFrom")
        copyFrom.value = `[${title}](${url})` 
        document.body.appendChild(copyFrom)
        copyFrom.select();
        document.execCommand('copy');
        copyFrom.remove();
      });
}