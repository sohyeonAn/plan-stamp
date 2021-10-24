// 셀렉터
const addPlanBtn = document.querySelector('.add-plan-button');
const planContainer = document.querySelector('.plan-container');
const addPlanModal_1 = document.querySelector('.plan-add-modal-1');
const addPlanModal_2 = document.querySelector('.plan-add-modal-2');
const addPlanModal_3 = document.querySelector('.plan-add-modal-3');
const addBtn = document.querySelector('.add-button');
const cancelBtn_1 = document.querySelector('.cancel-button-1');
const cancelBtn_2 = document.querySelector('.cancel-button-2');
const cancelBtn_3 = document.querySelector('.cancel-button-3');
const nextBtn_1 = document.querySelector(".next-button-1");
const nextBtn_2 = document.querySelector(".next-button-2");
const prevBtn_1 = document.querySelector(".prev-button-1");
const prevBtn_2 = document.querySelector(".prev-button-2");

// 모달에서 입력받은 정보(계획명, 테이블크기)
const planTitleInput = document.querySelector('.plan-title-input');
const tableSizeInput = document.querySelector('.table-size-input');

//이벤트 리스너
document.addEventListener('DOMContentLoaded', getPlans);
addPlanBtn.addEventListener('click', addPlanModalEvent);
addBtn.addEventListener('click', addPlan);
cancelBtn_1.addEventListener('click', closeModal);
cancelBtn_2.addEventListener('click', closeModal);
cancelBtn_3.addEventListener('click', closeModal);
nextBtn_1.addEventListener('click', moveNextModal);
nextBtn_2.addEventListener('click', moveNextModal);
prevBtn_1.addEventListener("click", movePrevModal);
prevBtn_2.addEventListener("click", movePrevModal);

//펑션
function getPlans() {
  let plans = getPlansFromLocalStorage();

  plans.forEach(plan => {
    const planTitleArea = document.createElement('div');
    const planTitleEl = document.createElement('input');
    const changeTitleBtn = document.createElement('button');
    const okBtn = document.createElement('button');

    // 이름 수정 버튼 클릭시 이벤트 추가
    changeTitleBtn.addEventListener('click', modifyPlanTitle);

    planTitleArea.classList.add('plan-title-area');
    planTitleEl.classList.add('plan-title');
    changeTitleBtn.classList.add('change-title-button');
    okBtn.classList.add('ok-button');

    planTitleEl.value = plan.title;
    planTitleEl.disabled = true;
    changeTitleBtn.textContent = '이름 수정';
    okBtn.textContent = "수정 완료";

    planTitleArea.appendChild(planTitleEl);
    planTitleArea.appendChild(okBtn);
    planTitleArea.appendChild(changeTitleBtn);

    const planDescriptionArea = document.createElement('div');
    const restDayEl = document.createElement('p');
    const stampCntEl = document.createElement('p');

    planDescriptionArea.classList.add('plan-description-area');
    restDayEl.classList.add('rest-day');
    stampCntEl.classList.add('stamp-count-text');

    restDayEl.innerText = `다음 보상까지 ${plan.tableSize - plan.stampCnt}일 남았습니다.`;
    stampCntEl.innerText = `(${plan.stampCnt}/${plan.tableSize})`;

    planDescriptionArea.appendChild(restDayEl);
    planDescriptionArea.appendChild(stampCntEl);

    const stampTableArea = document.createElement('div');

    for (let i = 0; i < plan.tableSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = i + 1;

      const planCompleteBtn = document.createElement('button');
      planCompleteBtn.textContent = "계획 실행 완료";
      planCompleteBtn.classList.add('hidden');
      planCompleteBtn.addEventListener('click', planCompleteBtnEvent);

      if (i < plan.stampCnt) {
        cell.classList.add('stamp');
      } else if (i === plan.stampCnt) {
        planCompleteBtn.classList.remove('hidden');
      }

      cell.appendChild(planCompleteBtn);
      stampTableArea.appendChild(cell);
    }

    stampTableArea.classList.add('stamp-table-area');


    planContainer.appendChild(planTitleArea);
    planContainer.appendChild(planDescriptionArea);
    planContainer.appendChild(stampTableArea);
  });
}

function addPlanModalEvent() {
  addPlanModal_1.classList.remove(('hidden'));
}

function addPlan() {
  const planTitleArea = document.createElement('div');
  const planTitleEl = document.createElement('input');
  const changeTitleBtn = document.createElement('button');
  const okBtn = document.createElement('button');

  // 이름 수정 버튼 클릭시 이벤트 추가
  changeTitleBtn.addEventListener('click', modifyPlanTitle);

  planTitleArea.classList.add('plan-title-area');
  planTitleEl.classList.add('plan-title');
  changeTitleBtn.classList.add('change-title-button');
  okBtn.classList.add('ok-button');

  planTitleEl.value = planTitleInput.value;
  planTitleEl.disabled = true;
  changeTitleBtn.textContent = '이름 수정';
  okBtn.textContent = "수정 완료";

  planTitleArea.appendChild(planTitleEl);
  planTitleArea.appendChild(okBtn);
  planTitleArea.appendChild(changeTitleBtn);

  const planDescriptionArea = document.createElement('div');
  const restDayEl = document.createElement('p');
  const stampCntEl = document.createElement('p');

  planDescriptionArea.classList.add('plan-description-area');
  restDayEl.classList.add('rest-day');
  stampCntEl.classList.add('stamp-count-text');

  restDayEl.innerText = `다음 보상까지 ${tableSizeInput.value}일 남았습니다.`;
  stampCntEl.innerText = `(0/${tableSizeInput.value})`;

  planDescriptionArea.appendChild(restDayEl);
  planDescriptionArea.appendChild(stampCntEl);

  const stampTableArea = document.createElement('div');

  for (let i = 0; i < tableSizeInput.value; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    cell.innerText = i + 1;

    const planCompleteBtn = document.createElement('button');
    planCompleteBtn.textContent = "계획 실행 완료";
    planCompleteBtn.classList.add('hidden');
    planCompleteBtn.addEventListener('click', planCompleteBtnEvent);

    cell.appendChild(planCompleteBtn);

    // 맨 처음 칸에 계획 실행 완료 버튼 보이기
    if (i === 0) {
      planCompleteBtn.classList.remove('hidden');
    }
    stampTableArea.appendChild(cell);
  }

  stampTableArea.classList.add('stamp-table-area');


  planContainer.appendChild(planTitleArea);
  planContainer.appendChild(planDescriptionArea);
  planContainer.appendChild(stampTableArea);

  // localStorage에 새로운 계획 추가하기
  let plans = getPlansFromLocalStorage();

  plans.push({
    title: planTitleInput.value,
    stampCnt: 0,
    tableSize: parseInt(tableSizeInput.value),
  })

  localStorage.setItem('plans', JSON.stringify(plans));

  closeModal();
}

function closeModal() {
  // 모달 닫기
  addPlanModal_1.classList.add('hidden');
  addPlanModal_2.classList.add('hidden');
  addPlanModal_3.classList.add('hidden');

  // 계획 추가 모달 인풋 초기화
  planTitleInput.value = '';
  tableSizeInput.value = '';
}

function modifyPlanTitle(e) {
  const currPlanTitleEl = e.target.parentElement.children[0];
  const prevPlantitle = currPlanTitleEl.value;
  const okButton = e.target.parentElement.children[1];

  currPlanTitleEl.disabled = false;
  e.target.disabled = true;
  okButton.style.display = 'block';

  //수정 버튼 클릭시 이벤트 리스너 추가
  okButton.addEventListener('click', function () {
    planTitleModifyEvent(prevPlantitle, currPlanTitleEl.value);
    okButton.disabled = true;
    okButton.style.display = 'none';
    e.target.disabled = false;
    currPlanTitleEl.disabled = true;
  });

  //이름에 변경이 있는 이름수정 버튼 활성화
  currPlanTitleEl.addEventListener('input', function () {
    if (prevPlantitle === currPlanTitleEl.value) {
      okButton.disabled = true;
    } else {
      okButton.disabled = false;
    }
  });

}

function getPlansFromLocalStorage() {
  const plans = localStorage.getItem('plans') ? JSON.parse(localStorage.getItem('plans')) : [];
  return plans;
}

function planTitleModifyEvent(prevTitle, currTitle) {
  const plans = getPlansFromLocalStorage();

  plans.forEach(plan => {
    if (plan.title === prevTitle) {
      plan.title = currTitle;
    }
  })

  localStorage.setItem('plans', JSON.stringify(plans));
}

function planCompleteBtnEvent(e) {
  const planCompleteBtn = e.target;
  const cell = e.target.parentElement;
  const table = e.target.parentElement.parentElement;


  // 현재 셀의 계획실행완료 버튼 없애고 도장 찍기
  planCompleteBtn.classList.add('hidden');
  cell.classList.add('stamp');


  let nextCellIndex;
  for (let i = 0; i < table.children.length; i++) {
    if (!table.children[i].classList.contains('stamp')) {
      nextCellIndex = i;
      break;
    }
  }

  if (nextCellIndex < table.children.length) {
    const nextCell = table.children[nextCellIndex];
    const nextPlanCompleteBtn = nextCell.children[0];

    // 다음 셀에 계획실행완료 버튼 나타내기
    nextPlanCompleteBtn.classList.remove('hidden');
  } else {
    return;
  }

}


function moveNextModal(e) {
  const clickedModalEl = e.target.parentElement;
  let rewardsCnt = 0;

  if (clickedModalEl.classList.contains('plan-add-modal-1')) {
    // 첫번째 모달에서 다음을 클릭 했으므로 두번째 모달만 보이기
    addPlanModal_1.classList.add('hidden');
    addPlanModal_2.classList.remove('hidden');
    addPlanModal_3.classList.add('hidden');

    //두번째 모달 세팅하기.
    placeOfRewardsModal(addPlanModal_2);
  } else if (clickedModalEl.classList.contains('plan-add-modal-2')) {
    // 두번째 모달에서 다음을 클릭 했으므로 세번째 모달만 보이기
    addPlanModal_1.classList.add('hidden');
    addPlanModal_2.classList.add('hidden');
    addPlanModal_3.classList.remove('hidden');

    //세번째 모달 세팅하기.
    rewardsCnt = getRewardsCnt(addPlanModal_2);
    inputRewardModal(addPlanModal_3, rewardsCnt);
  }

}

function movePrevModal(e) {
  const clickedModalEl = e.target.parentElement;

  if (clickedModalEl.classList.contains('plan-add-modal-2')) {
    // 두번째 모달에서 이전을 클릭 했으므로 첫번째 모달만 보이기
    addPlanModal_1.classList.remove('hidden');
    addPlanModal_2.classList.add('hidden');
    addPlanModal_3.classList.add('hidden');

  } else if (clickedModalEl.classList.contains('plan-add-modal-3')) {
    // 세번째 모달에서 이전을 클릭 했으므로 두번째 모달만 보이기
    addPlanModal_1.classList.add('hidden');
    addPlanModal_2.classList.remove('hidden');
    addPlanModal_3.classList.add('hidden');
  }
}

function placeOfRewardsModal(modalEl) {
  const stampAreaEl = modalEl.lastElementChild;
  if (stampAreaEl.classList.contains("stamp-table-area")) {
    stampAreaEl.remove();
  }

  const stampTableArea = document.createElement('div');

  for (let i = 0; i < tableSizeInput.value; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = i + 1;

    const rewardPlaceText = document.createElement('p');
    rewardPlaceText.innerText = "";
    rewardPlaceText.classList.add('hidden');
    rewardPlaceText.classList.add('reward-place-text');
    cell.appendChild(rewardPlaceText);
    cell.addEventListener('click', placeOfRewardBtnEvent);

    stampTableArea.appendChild(cell);
  }

  stampTableArea.classList.add('stamp-table-area');
  modalEl.appendChild(stampTableArea);
}

function placeOfRewardBtnEvent(e) {
  const clickedCell = e.target;
  const placeText = clickedCell.children[0];
  clickedCell.classList.toggle('clicked');

  if (placeText.classList.contains('hidden')) {
    placeText.innerText = "여기가 보상!";
    placeText.classList.remove("hidden");
  } else {
    placeText.innerText = "";
    placeText.classList.add("hidden");
  }

}

function getRewardsCnt(modalEl) {
  const stampAreaEl = modalEl.lastElementChild;
  let rewardsCnt = 0;

  for (let i = 0; i < stampAreaEl.children.length; i++) {
    const cell = stampAreaEl.children[i];
    if (cell.classList.contains('clicked')) {
      rewardsCnt += 1;
    }
  }

  return rewardsCnt;
}

function inputRewardModal(modalEl, rewardsCnt) {
  console.log(modalEl.children);
  for (let j = 0; j < modalEl.children.length; j++) {
    if (modalEl.children[j].classList.contains("reward-input-area")) {
      modalEl.children[j].remove();
    }
  }

  for (let i = 0; i < rewardsCnt; i++) {
    const rewardInputArea = document.createElement('div');
    rewardInputArea.classList.add("reward-input-area");
    const label = document.createElement('p');
    label.innerText = `보상 ${i+1}를 입력해주세요.`;
    const rewardInputText = document.createElement('input');
    rewardInputText.classList.add('reward-input-text');
    rewardInputArea.appendChild(label);
    rewardInputArea.appendChild(rewardInputText);

    modalEl.appendChild(rewardInputArea);

  }
}