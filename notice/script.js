const notices = [
  {
    title: "システム更新",
    date: "2024-10-28",
    category: "更新情報",
    content:
      "うれしいうれしい情報。なんと学校のPCのフィルターを回避できるサイトを作っちゃいました！！！うれしすぎるって！",
  },
  {
    title: "お知らせサイトを作りました。",
    date: "2024-10-27",
    category: "更新情報",
    content: "お知らせサイトを作りました。色々ここでやりますのでお願いします！",
  },
  {
    title: "シンプル電卓の改造しました。",
    date: "2024-11-01",
    category: "更新情報",
    content:
      "前までは-+÷×しかできませんでしたが、今は三角関数やルートなどを使うことができるようになりました。ぜひ使ってみてください！",
  },
  {
    title: "すべてのサイトにファビコンを追加しました。",
    date: "2024-11-01",
    category: "更新情報",
    content:
      "今まで一部のサイトにしかファビコンを追加していなかったので、すべてのサイトにファビコンを追加させました。",
  },
  {
    title: "最弱のサイトのスタイルを変えました。",
    date: "2024-11-02",
    category: "更新情報",
    content:
      "今までの最弱のサイトのスタイルが少しダサかったので少し変えました。結構かっこよくなったと思います。",
  },
  {
    title: "ドキュメントサイトを作りました。",
    date: "2024-11-05",
    category: "ニュース",
    content:
      "最弱のドキュメントを作りました。もしもこのサイトについて知りたい場合はドキュメントサイトを見てください。",
  },
  {
    title: "プログラミングサイトを作りました。",
    date: "2024-12-8",
    category: "ニュース",
    content:
      "プログラミングサイトを作りました。HTMLやCSS、JSの3つのプログラミング言語を学ぶことができます。ちなみにあっさりと開発終わったｗ。プログラミングを学びたい人はどうぞ使ってください！※無料だよ！",
  },
  {
    title: "スネークゲームにランキング機能を追加しました。",
    date: "2024-12-13",
    category: "更新情報",
    content:
      "スネークゲームにランキングを付けてみました。ちなみに作者の最高は59です。頑張って越してくださいね。",
  },
  {
    title: "宿題チェックサイトを作りました。",
    date: "2024-12-12",
    category: "更新情報",
    content:
      "宿題チェックサイトを作りました。宿題や目標を決めたいときに使ってみてください。",
  },
  {
    title: "一つ前に戻るボタンを追加しました。",
    date: "2025-04-09",
    category: "更新情報",
    content:
      "今まで戻ったりするボタンを作っていなくてすみませんでした。これで、よくなったと思います！",
  },
];

function formatDate(dateString) {
  const [year, month, day] = dateString
    .split("-")
    .map((num) => String(num).padStart(2, "0"));
  return `${year}-${month}-${day}`;
}

function displayNotices(filterDate = "", filterCategory = "") {
  const noticeList = document.getElementById("noticeList");
  noticeList.innerHTML = "";

  const filteredNotices = notices
    .filter((notice) => {
      const formattedDate = formatDate(notice.date);
      return (
        (!filterDate || formattedDate === filterDate) &&
        (!filterCategory || notice.category === filterCategory)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filteredNotices.length === 0) {
    const noNotices = document.createElement("div");
    noNotices.textContent = "記事がありません。";
    noticeList.appendChild(noNotices);
  }

  filteredNotices.forEach((notice) => {
    const card = document.createElement("div");
    card.classList.add("notice-card");

    card.innerHTML = `
        <h2>${notice.title}</h2>
        <p class="date">${formatDate(notice.date)}</p>
        <p>${notice.content}</p>
      `;

    noticeList.appendChild(card);
  });
}

document.getElementById("dateFilter").addEventListener("change", (e) => {
  displayNotices(
    e.target.value,
    document.getElementById("categoryFilter").value
  );
});
displayNotices();

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  displayNotices(document.getElementById("dateFilter").value, e.target.value);
});

document.getElementById("toggleDarkMode").addEventListener("click", () => {
  const isDarkMode = document.body.classList.contains("dark-mode");
  document.body.classList.toggle("dark-mode");

  if (isDarkMode) {
    document.getElementById("toggleDarkMode").textContent =
      "ダークモードに切り替え";
  } else {
    document.getElementById("toggleDarkMode").textContent =
      "ライトモードに切り替え";
  }
});

function back() {
  window.history.back();
  // window.history.go(-1); // これでも戻れます
  // window.history.go(-2); // 2つ前に戻ります
  // window.history.go(1); // 進む
  // window.history.go(2); // 2つ進みます
  // window.history.go(0); // リロード
}
