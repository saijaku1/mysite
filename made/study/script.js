// app.js

let subjects = [];  // 学習項目を格納する配列

// DOM要素の取得
const subjectList = document.getElementById('subject-list');
const progressChart = document.getElementById('progress-chart').getContext('2d');
const addSubjectBtn = document.getElementById('add-subject-btn');
const subjectForm = document.getElementById('subject-form');
const cancelAddBtn = document.getElementById('cancel-add-btn');
const saveSubjectBtn = document.getElementById('save-subject-btn');
const subjectNameInput = document.getElementById('subject-name');
const subjectGoalInput = document.getElementById('subject-goal');
const subjectProgressInput = document.getElementById('subject-progress');
const subjectDueDateInput = document.getElementById('subject-due-date');

// 学習項目の追加ボタン
addSubjectBtn.addEventListener('click', () => {
  subjectForm.style.display = 'block';  // フォームを表示
});

// キャンセルボタン
cancelAddBtn.addEventListener('click', () => {
  subjectForm.style.display = 'none';  // フォームを非表示
  clearSubjectForm();
});

// 学習項目を保存
saveSubjectBtn.addEventListener('click', () => {
  const name = subjectNameInput.value;
  const goal = subjectGoalInput.value;
  const progress = parseInt(subjectProgressInput.value, 10);
  const dueDate = subjectDueDateInput.value;

  if (name && goal && !isNaN(progress) && dueDate) {
    const newSubject = {
      id: Date.now(),  // 一意なIDを生成
      name,
      goal,
      progress,
      due_date: dueDate,
      notes: [],
      next_steps: ''
    };
    subjects.push(newSubject);  // 学習項目を追加
    clearSubjectForm();
    displaySubjects();
    updateProgressChart();
  } else {
    alert('すべての項目を入力してください。');
  }
  subjectForm.style.display = 'none';  // フォームを非表示
});

// 学習項目の表示
function displaySubjects() {
  subjectList.innerHTML = '';
  subjects.forEach(subject => {
    const li = document.createElement('li');
    li.textContent = `${subject.name} - 進捗: ${subject.progress}%`;
    subjectList.appendChild(li);
  });
}

// 進捗グラフの更新
function updateProgressChart() {
  const progressData = subjects.map(subject => subject.progress);
  new Chart(progressChart, {
    type: 'bar',
    data: {
      labels: subjects.map(subject => subject.name),
      datasets: [{
        label: '進捗状況',
        data: progressData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// メモの保存
document.getElementById('save-note').addEventListener('click', () => {
  const memo = document.getElementById('memo-input').value;
  const nextSteps = document.getElementById('next-steps-input').value;

  // 最後の学習項目にメモを追加（仮）
  subjects[subjects.length - 1].notes.push(memo);
  subjects[subjects.length - 1].next_steps = nextSteps;

  displaySubjects();
  document.getElementById('memo-input').value = '';
  document.getElementById('next-steps-input').value = '';
});

// 学習進捗の保存
document.getElementById('save-progress').addEventListener('click', () => {
  const json = JSON.stringify(subjects);
  localStorage.setItem('learningProgress', json);
  alert('保存完了!');
});

// 学習進捗の読み込み
document.getElementById('load-progress').addEventListener('click', () => {
  const json = localStorage.getItem('learningProgress');
  if (json) {
    subjects = JSON.parse(json);
    displaySubjects();
    updateProgressChart();
    alert('読み込み完了!');
  } else {
    alert('保存された進捗がありません');
  }
});

// 学習フォームをクリア
function clearSubjectForm() {
  subjectNameInput.value = '';
  subjectGoalInput.value = '';
  subjectProgressInput.value = '';
  subjectDueDateInput.value = '';
}

// 初期表示
displaySubjects();
