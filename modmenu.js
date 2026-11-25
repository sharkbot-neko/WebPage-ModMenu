class Menu {
    menuId = "my-extension";
    menu = null;

    title = "ModMenuFramework";
    bodyElement = null;

    // Window behavior settings (override per menu as needed)
    allowMaximize = true;   // Show the maximize button
    allowResize = true;     // Show the resize handle
    initialPosition = null; // { left, top } in px, applied on open
    initialSize = null;     // { width, height } in px, applied on open

    isMaximized = false;
    savedGeometry = null;

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
            <div class="my-header" style="display:flex;align-items:center;gap:6px;">
                <span style="flex:1;">${this.title}</span>
                ${this.allowMaximize ? `<button id="${this.menuId}-maximize-btn" style="padding:0 4px;font-size:smaller;">⬒</button>` : ""}
                <button id="${this.menuId}-close-btn">✖</button>
            </div>
            <div class="my-body" id="${this.menuId}_body">
            </div>
            ${this.allowResize ? `<div class="my-resize" id="${this.menuId}-resize" style="position:absolute;right:0;bottom:0;width:12px;height:12px;cursor:se-resize;"></div>` : ""}
        `;

        // Apply window behavior settings
        this.menu.style.position = "fixed";
        this.menu.style.display = "flex";
        this.menu.style.flexDirection = "column";
        this.menu.style.overflow = "hidden";
        this.menu.style.left = this.initialPosition && this.initialPosition.left != null ? this.initialPosition.left + "px" : "0px";
        this.menu.style.top = this.initialPosition && this.initialPosition.top != null ? this.initialPosition.top + "px" : "0px";
        this.menu.style.width = (this.initialSize && this.initialSize.width != null ? this.initialSize.width : 400) + "px";
        this.menu.style.height = (this.initialSize && this.initialSize.height != null ? this.initialSize.height : 300) + "px";

        document.body.appendChild(this.menu);

        const bodyEl = document.getElementById(`${this.menuId}_body`);
        bodyEl.style.flex = "1 1 auto";
        bodyEl.style.overflow = "auto";
        bodyEl.appendChild(this.bodyElement);

        document.getElementById(`${this.menuId}-close-btn`).onclick = () => {
            this.menu.remove();
        };

        const maxBtn = document.getElementById(`${this.menuId}-maximize-btn`);
        if (maxBtn) {
            maxBtn.onclick = () => this.toggleMaximize();
        }

        const resizeHandle = document.getElementById(`${this.menuId}-resize`);
        if (resizeHandle) {
            let resizing = false;
            let sx = 0, sy = 0, sw = 0, sh = 0;
            resizeHandle.addEventListener("mousedown", e => {
                e.preventDefault();
                resizing = true;
                sx = e.clientX;
                sy = e.clientY;
                sw = this.menu.offsetWidth;
                sh = this.menu.offsetHeight;
            });
            document.addEventListener("mousemove", e => {
                if (!resizing) return;
                this.menu.style.width = Math.max(120, sw + (e.clientX - sx)) + "px";
                this.menu.style.height = Math.max(80, sh + (e.clientY - sy)) + "px";
            });
            document.addEventListener("mouseup", () => {
                resizing = false;
            });
        }

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

        this.onOpenMenu();
    }

    toggleMaximize() {
        const maxBtn = this.menu ? document.getElementById(`${this.menuId}-maximize-btn`) : null;
        if (this.isMaximized) {
            this.isMaximized = false;
            const g = this.savedGeometry;
            if (g) {
                this.menu.style.left = g.left + "px";
                this.menu.style.top = g.top + "px";
                this.menu.style.width = g.width + "px";
                this.menu.style.height = g.height + "px";
            }
            this.savedGeometry = null;
        } else {
            this.isMaximized = true;
            this.savedGeometry = {
                left: parseFloat(this.menu.style.left) || 0,
                top: parseFloat(this.menu.style.top) || 0,
                width: this.menu.offsetWidth,
                height: this.menu.offsetHeight
            };
            this.menu.style.left = "0px";
            this.menu.style.top = "0px";
            this.menu.style.width = window.innerWidth + "px";
            this.menu.style.height = window.innerHeight + "px";
        }
        if (maxBtn) maxBtn.textContent = this.isMaximized ? "⬓" : "⬒";
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