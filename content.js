// ModMenuの内容
const modmenu = new ModMenuFramework();
const mainMenu = new Menu();
mainMenu.title = "サンプルModMenu";
const bodyMainMenu = document.createElement("div");
bodyMainMenu.innerHTML = `
サンプルModMenuです。<br>
HTML要素を追加できます。<br>
<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
`
mainMenu.bodyElement = bodyMainMenu;
modmenu.setMainMenu(mainMenu);
modmenu.openMainMenu();