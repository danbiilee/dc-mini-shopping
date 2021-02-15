// Fetch the items form the JSON file
function loadItems() {
  // response의 body를 json object로 변환하고, 그 안의 items를 반환
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  // item objecct를 li 문자열로 변환 -> 하나의 문자열로 만든 후 컨테이너에 추가
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item form the given data item
function createHTMLString(item) {
  return `<li class="item" data-type="${item.type}" data-color="${item.color}">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
            <span class="item__description">${item.gender}, ${item.size}</span>
          </li>`;
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  // 이벤트 위임: 각 요소마다 이벤트를 반복해 등록하지 않고,
  // 요소들의 컨테이너 한 군데에민 이벤트를 등록한 뒤 이벤트를 핸들링하는 기법
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (e) => onButtonClick(e));
}

// Handle button click
// on-: 이벤트가 발생했을 때 처리되는 함수명
function onButtonClick(e) {
  // dataset.프로퍼티
  // html에서 data-* 속성을 이용해 이벤트가 발생하는 타겟에 필요한 정보를 미리 담아둘 수 있음
  const dataset = e.target.dataset;
  const { key, value } = dataset;

  // buttons 컨테이너 내에 버튼이 아닌 요소를 클릭한 경우
  // undefined가 리턴됨
  if (key == null || value == null) {
    return;
  }

  // 단점: 매번 모든 li 아이템들을 새로 만들어서 업데이트 해야함
  //displayItems(items.filter((item) => item[key] === value));

  // 개선: json object인 items가 아니라, 동적으로 만들어진 li 요소들을 인자로 전달
  // invisible 클래스를 통해 display 여부만 제어
  const items = document.querySelectorAll(".item");
  updateItems(items, key, value);
}

// Make the items matching {key: value} invisible
function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

// 1. data.json을 동적으로 읽어와, 프로미스로 반환한다.
// 2. 데이터 로드 성공 시: 아이템들을 페이지에 보여주고, 필터링 하기 위해 버튼들에 이벤트 리스너를 등록한다.
// 3. 데이터 로드 실패 시: 콘솔에 찍기.
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
