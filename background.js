chrome.runtime.onInstalled.addListener(function (reason) {
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
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        checkCommandShortcuts();
    }
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch(info.menuItemId){
        case 'article-share':
            handleArticleShare();
            break;
    }
});

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
    if(command === 'run-share'){
        handleArticleShare();
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


function checkCommandShortcuts() {
  // 获取当前插件已注册的快捷键
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let {name, shortcut} of commands) {
      // 如果冲突无法注册快捷键默认值，则 shortcut 值为空字符串
      if (shortcut === '') {
        missingShortcuts.push(name);
      }
    }
    
    // 如果该扩展程序与其他扩展程序真的存在快捷键冲突
    if (missingShortcuts.length > 0) {
      // Update the extension UI to inform the user that one or more
      // commands are currently unassigned.
      console.log("您的快捷键存在冲突")
    }
  });
}
  