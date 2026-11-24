class Menu {
    menuId = "my-extension";
    menu = null;

    title = "ModMenuFramework";
    bodyElement = null;

    onOpenMenu() {
        return;
    }

    onCloseMenu() {
        return;
    }

    openMenu() {
        if (document.getElementById(this.menuId + "-window")) return;

        this.menu = document.createElement("div");

        this.menu.id = this.menuId + "-window";
        this.menu.innerHTML = `
            <div class="my-window">
                <div class="my-header" id="${this.menuId}-header">
                    <span>${this.title}</span>
                    <button id="${this.menuId}-close-btn" class="my-close-btn">✖</button>
                </div>
                <div class="my-body" id="${this.menuId}_body">
                </div>
            </div>
        `;

        document.body.appendChild(this.menu);

        document.getElementById(`${this.menuId}_body`).appendChild(this.bodyElement);

        document.getElementById(`${this.menuId}-close-btn`).onclick = () => {
            this.closeMenu();
        };

        const header = document.getElementById(`${this.menuId}-header`);
        const windowElement = this.menu.querySelector(".my-window");

        header.style.cursor = "grab";
        header.style.touchAction = "none";

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        header.addEventListener("pointerdown", e => {
            if (e.target.closest("button") || e.button !== 0) return;

            const rect = windowElement.getBoundingClientRect();

            windowElement.style.position = "fixed";
            windowElement.style.left = `${rect.left}px`;
            windowElement.style.top = `${rect.top}px`;
            windowElement.style.right = "auto";
            windowElement.style.bottom = "auto";
            windowElement.style.margin = "0";
            windowElement.style.transform = "none";

            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            isDragging = true;

            header.style.cursor = "grabbing";
            header.setPointerCapture(e.pointerId);

            e.preventDefault();
        });

        header.addEventListener("pointermove", e => {
            if (!isDragging) return;

            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        });

        const stopDragging = () => {
            isDragging = false;
            header.style.cursor = "grab";
        };

        header.addEventListener("pointerup", stopDragging);
        header.addEventListener("pointercancel", stopDragging);
        header.addEventListener("lostpointercapture", stopDragging);

        this.onOpenMenu();
    }

    closeMenu() {
        this.menu.remove();
        this.onCloseMenu();
    }
}

class ModMenuFramework {
    menus = new Map();

    addMenu(menuId, menu) {
        this.menus.set(menuId, menu);
    }

    getMenu(menuId) {
        return this.menus.get(menuId);
    }

    removeMenu(menuId) {
        this.menus.delete(menuId);
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
