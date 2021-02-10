window.onload = function () {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    // 버튼 컬러 지정
    if (button.className === "color") {
      button.style.backgroundColor = `var(--color-${button.id})`;
    }
    // 클릭 이벤트 핸들러
    button.addEventListener("click", function () {
      filterItems(button.id, button.className);
    });
  });

  const renderDom = (list) => {
    const contents = document.querySelector("#contents");
    console.log(contents.hasChildNodes(), contents.childNodes);
    if (contents.hasChildNodes()) {
      contents.innerHTML = "";
    }

    const ul = document.createElement("ul");
    ul.classList = "item-list";

    //console.log(myJson);
    list.forEach((item) => {
      const li = document.createElement("li");

      const img = document.createElement("img");
      img.src = `./img/${item.image}`;
      img.alt = item.type;

      const p = document.createElement("p");
      p.innerHTML = `${item.sex}, ${item.size} size`;

      li.appendChild(img);
      li.appendChild(p);
      ul.appendChild(li);
    });

    contents.appendChild(ul);
  };

  const filterItems = (id, type) => {
    fetch("./data/data.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (myJson) {
        const filteredItems = myJson.items.filter((item) => item[type] === id);
        renderDom(filteredItems);
      });
  };

  // 전체 items 조회하기
  fetch("./data/data.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (myJson) {
      const items = myJson.items;
      renderDom(items);
    });
};
