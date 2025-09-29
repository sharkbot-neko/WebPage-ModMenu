(function() {
    if (document.getElementById("my-extension-window")) return;

    const win = document.createElement("div");
    win.id = "my-extension-window";
    win.innerHTML = `
        <div class="my-header">
            <span>Google Search ModMenu</span>
            <button id="my-close-btn">✖</button>
        </div>
        <div class="my-body">
            <p>
                <button id="search_allcopy">サイト検索結果をすべてコピー</button>
            </p>
        </div>
    `;

    document.body.appendChild(win);

    document.getElementById("my-close-btn").onclick = () => {
        win.remove();
    };

    document.getElementById("search_allcopy").onclick = async () => {
        const elements = document.getElementsByClassName('zReHs');
        if (!elements.length) {
            alert('画像検索や動画検索では使用できません。');
            return;
        }

        let text = "";
        Array.from(elements).forEach(el => {
            try {
                text += el.getAttribute('href') + "\n";
            } catch (e) {
                return;
            }
            
        });

        try {
            await navigator.clipboard.writeText(text);
            alert('コピー完了！');
        } catch (e) {
            console.error(e);
        }
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