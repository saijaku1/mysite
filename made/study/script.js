// 学習項目を保存するボタンとフォームの要素
const saveSubjectBtn = document.getElementById('save-subject-btn');
const subjectNameInput = document.getElementById('subject-name');
const subjectGoalInput = document.getElementById('subject-goal');
const subjectProgressInput = document.getElementById('subject-progress');
const subjectDueDateInput = document.getElementById('subject-due-date');
const subjectList = document.getElementById('subject-items');
const progressChart = document.getElementById('progress-chart');

// 学習項目の配列（進捗を格納）
let subjects = JSON.parse(localStorage.getItem('subjects')) || []; // ローカルストレージから取得

// 学習項目を保存するボタンがクリックされたときの処理
saveSubjectBtn.addEventListener('click', () => {
  const name = subjectNameInput.value;  // 学習項目名
  const goal = subjectGoalInput.value;  // 目標
  const progress = parseInt(subjectProgressInput.value, 10);  // 進捗度（0〜100）
  const dueDate = subjectDueDateInput.value;  // 期日

  // 進捗度と目標などがすべて入力されている場合に保存
  if (name && goal && !isNaN(progress) && dueDate) {
    const newSubject = {
      id: Date.now(),  // 一意なIDを生成
      name,
      goal,
      progress,  // 進捗度
      due_date: dueDate,
      notes: [],
      next_steps: ''
    };

    subjects.push(newSubject);  // 学習項目を配列に追加
    saveSubjectsToLocalStorage();  // ローカルストレージに保存
    clearSubjectForm();  // フォームをクリア
    displaySubjects();  // 学習項目を表示
    updateProgressChart();  // 進捗グラフを更新
  } else {
    alert('すべての項目を入力してください。');
  }
});

// フォームをクリアする関数
function clearSubjectForm() {
  subjectNameInput.value = '';
  subjectGoalInput.value = '';
  subjectProgressInput.value = '';
  subjectDueDateInput.value = '';
}

// 学習項目をリストに表示する関数
function displaySubjects() {
  subjectList.innerHTML = '';  // 現在のリストをクリア

  subjects.forEach(subject => {
    const li = document.createElement('li');
    li.classList.add('subject-item');
    li.innerHTML = `
      <span>${subject.name} - 目標: ${subject.goal} - 進捗: ${subject.progress}%</span>
      <button class="edit-btn" data-id="${subject.id}">編集</button>
      <button class="delete-btn" data-id="${subject.id}">削除</button>
    `;
    subjectList.appendChild(li);

    // 編集ボタンの処理
    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => editSubject(subject.id));

    // 削除ボタンの処理
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteSubject(subject.id));
  });
}

// 学習項目を削除する関数
function deleteSubject(subjectId) {
  subjects = subjects.filter(subject => subject.id !== subjectId);
  saveSubjectsToLocalStorage();  // ローカルストレージを更新
  displaySubjects();  // 学習項目を再表示
  updateProgressChart();  // 進捗グラフを再更新
}

// 学習項目を編集する関数
function editSubject(subjectId) {
  const subject = subjects.find(subject => subject.id === subjectId);
  if (subject) {
    subjectNameInput.value = subject.name;
    subjectGoalInput.value = subject.goal;
    subjectProgressInput.value = subject.progress;
    subjectDueDateInput.value = subject.due_date;

    // 編集モードで保存ボタンの動作を変更
    saveSubjectBtn.textContent = '更新';
    saveSubjectBtn.removeEventListener('click', saveSubject);
    saveSubjectBtn.addEventListener('click', () => updateSubject(subjectId));
  }
}

// 学習項目を更新する関数
function updateSubject(subjectId) {
  const subjectIndex = subjects.findIndex(subject => subject.id === subjectId);
  if (subjectIndex !== -1) {
    const updatedSubject = {
      id: subjectId,
      name: subjectNameInput.value,
      goal: subjectGoalInput.value,
      progress: parseInt(subjectProgressInput.value, 10),
      due_date: subjectDueDateInput.value,
      notes: subjects[subjectIndex].notes,
      next_steps: subjects[subjectIndex].next_steps
    };

    subjects[subjectIndex] = updatedSubject;  // 学習項目を更新
    saveSubjectsToLocalStorage();  // ローカルストレージを更新
    clearSubjectForm();  // フォームをクリア
    displaySubjects();  // 学習項目を再表示
    updateProgressChart();  // 進捗グラフを再更新

    saveSubjectBtn.textContent = '保存';
    saveSubjectBtn.removeEventListener('click', updateSubject);
    saveSubjectBtn.addEventListener('click', saveSubject);
  }
}

// 学習項目をローカルストレージに保存する関数
function saveSubjectsToLocalStorage() {
  localStorage.setItem('subjects', JSON.stringify(subjects));
}

// 進捗グラフを更新する関数
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

// ページ読み込み時に学習項目を表示
window.onload = function() {
  displaySubjects();
  updateProgressChart();
};
