class Menu {
    menuId = "my-extension";
    menu = null;

    title = "ModMenuFramework";
    bodyElement = null;

    openMenu() {
        if (document.getElementById(this.menuId + "-window")) return;

        this.menu = document.createElement("div");

        this.menu.id = this.menuId + "-window";
        this.menu.innerHTML = `
            <div class="my-header">
                <span>${this.title}</span>
                <button id="${this.menuId}-close-btn">✖</button>
            </div>
            <div class="my-body" id="${this.menuId}_body">
            </div>
        `;

        document.body.appendChild(this.menu);

        document.getElementById(`${this.menuId}_body`).appendChild(this.bodyElement);

        document.getElementById(`${this.menuId}-close-btn`).onclick = () => {
            this.menu.remove();
        };

        const header = this.menu.querySelector(".my-header");
        let offsetX = 0, offsetY = 0, isDown = false;

        header.addEventListener("mousedown", e => {
            isDown = true;
            offsetX = e.clientX - this.menu.offsetLeft;
            offsetY = e.clientY - this.menu.offsetTop;
        });
        document.addEventListener("mouseup", () => isDown = false);
        document.addEventListener("mousemove", e => {
            if (!isDown) return;
            this.menu.style.left = (e.clientX - offsetX) + "px";
            this.menu.style.top = (e.clientY - offsetY) + "px";
        });
    }

    closeMenu() {
        this.menu.remove();
    }
}

class ModMenuFramework {
    menus = new Map();

    addMenu(menuId, menu) {
        this.menus.set(menuId, menu);
    }

    getMenu(menuId) {
        this.menus.get(menuId);
    }

    removeMenu(menuId) {
        this.menus.remove(menuId);
    }

    openMenu(menuId) {
        this.menus.get(menuId).openMenu();
    }

    setMainMenu(menu) {
        this.menus.set("main", menu);
    }

    openMainMenu() {
        this.menus.get("main").openMenu();
    }
}