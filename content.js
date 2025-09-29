(function() {
    if (document.getElementById("my-extension-window")) return;

    const win = document.createElement("div");
    win.id = "my-extension-window";
    win.innerHTML = `
        <div class="my-header">
            <span>🔧 拡張機能ウィンドウ</span>
            <button id="my-close-btn">✖</button>
        </div>
        <div class="my-body">
            <p>ここにいろいろ要素を追加できます。</p>
        </div>
    `;

    document.body.appendChild(win);

    document.getElementById("my-close-btn").onclick = () => {
        win.remove();
    };

    const header = win.querySelector(".my-header");
    let offsetX = 0, offsetY = 0, isDown = false;

    header.addEventListener("mousedown", e => {
        isDown = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });
    document.addEventListener("mouseup", () => isDown = false);
    document.addEventListener("mousemove", e => {
        if (!isDown) return;
        win.style.left = (e.clientX - offsetX) + "px";
        win.style.top = (e.clientY - offsetY) + "px";
    });
})();