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

// 모달에서 입력받은 정보
const planTitleInput = document.querySelector('.plan-title-input');
const tableSizeInput = document.querySelector('.table-size-input');
let rewardsPlace = [];
let rewardsArr = [];

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
    const planArea = document.createElement('div');
    const planTitleArea = document.createElement('div');
    const planTitleEl = document.createElement('input');
    const changeTitleBtn = document.createElement('button');
    const okBtn = document.createElement('button');

    // 이름 수정 버튼 클릭시 이벤트 추가
    changeTitleBtn.addEventListener('click', modifyPlanTitle);

    planArea.classList.add('plan-area');
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

    if (plan.tableSize === plan.stampCnt)
      restDayEl.innerText = `축하합니다! 해당 계획을 완료하였습니다.`;
    else {
      restDayEl.innerText = `다음 보상까지 ${plan.tableSize - plan.stampCnt}일 남았습니다.`;
    }
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


    planArea.appendChild(planTitleArea);
    planArea.appendChild(planDescriptionArea);
    planArea.appendChild(stampTableArea);

    planContainer.appendChild(planArea);
  });
}

function addPlanModalEvent() {
  addPlanModal_1.classList.remove(('hidden'));
}

function setRewardsInput() {
  const rewardInputArea = document.querySelector(".reward-input-area");

  // rewardInputArea에 기존에 있던 보상목록을 rewardArr에 넣기 
  for(let i=0; i<rewardInputArea.children.length;i++){
    if(rewardInputArea.children[i].children[1].tagName === "INPUT"){
      rewardsArr.push(rewardInputArea.children[i].children[1].value);
    }
  }
}

function addPlan() {
  setRewardsInput();

  const planArea = document.createElement('div');
  const planTitleArea = document.createElement('div');
  const planTitleEl = document.createElement('input');
  const changeTitleBtn = document.createElement('button');
  const okBtn = document.createElement('button');

  // 이름 수정 버튼 클릭시 이벤트 추가
  changeTitleBtn.addEventListener('click', modifyPlanTitle);

  planArea.classList.add('plan-area');
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

    // 보상자리에 해당하면 보상추가텍스트 추가하기
    rewardsPlace.forEach( (placeNum, idx) => {
      if(i+1 === placeNum){
        cell.innerText = `${i+1} 보상명: ${rewardsArr[idx]}`;
      }
    })
    stampTableArea.appendChild(cell);
  }

  stampTableArea.classList.add('stamp-table-area');


  planArea.appendChild(planTitleArea);
  planArea.appendChild(planDescriptionArea);
  planArea.appendChild(stampTableArea);

  planContainer.append(planArea);

  // localStorage에 새로운 계획 추가하기
  let plans = getPlansFromLocalStorage();

  plans.push({
    title: planTitleInput.value,
    stampCnt: 0,
    tableSize: parseInt(tableSizeInput.value),
    rewardsPlace: rewardsPlace,
    rewardsArr: rewardsArr,
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
  rewardsPlace = [];
  rewardsArr = [];
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
  const cell = planCompleteBtn.parentElement;
  const table = cell.parentElement;
  const planArea = table.parentElement;


  // 현재 셀의 계획실행완료 버튼 없애고 도장 찍기
  planCompleteBtn.classList.add('hidden');
  cell.classList.add('stamp');


  let nextCellIndex = 0;
  const tableSize = table.children.length;
  for (let i = 0; i < tableSize; i++) {
    if (!table.children[i].classList.contains('stamp')) {
      nextCellIndex = i;
      break;
    }

    // 마지막 셀까지 도달하여 다음 셀이 없을 경우
    // 인덱스는 0부터 시작하기 때문에 다음 셀의 인덱스는 테이블사이즈로 한다.
    if (i === tableSize - 1 && table.children[i].classList.contains('stamp')) {
      nextCellIndex = tableSize;
    }
  }

  if (nextCellIndex < tableSize) {
    // 다음 셀에 계획실행완료 버튼 나타내기
    const nextCell = table.children[nextCellIndex];
    const nextPlanCompleteBtn = nextCell.children[0];

    nextPlanCompleteBtn.classList.remove('hidden');
  }

  //도장이 추가됐기 때문에 플랜의 stampCnt를 변경한다.
  const planTitle = planArea.firstChild.firstChild.value;
  const plans = getPlansFromLocalStorage();

  plans.forEach(plan => {
    if (plan.title === planTitle) {
      plan.stampCnt = nextCellIndex;
    }
  });

  localStorage.setItem('plans', JSON.stringify(plans));
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
    inputRewardModal(addPlanModal_3);
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
  const stampTableArea = document.querySelector(".modal-stamp-table-area");
  while (stampTableArea.hasChildNodes()) {
    stampTableArea.removeChild(stampTableArea.firstChild);
  }


  for (let i = 0; i < tableSizeInput.value; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add('pointer');

    cell.innerText = i + 1;

    const rewardPlaceText = document.createElement('p');
    rewardPlaceText.innerText = "";
    rewardPlaceText.classList.add('hidden');
    rewardPlaceText.classList.add('reward-place-text');
    cell.appendChild(rewardPlaceText);
    cell.addEventListener('click', placeOfRewardBtnEvent);

    stampTableArea.appendChild(cell);
  }

  modalEl.appendChild(stampTableArea);
}

function placeOfRewardBtnEvent(e) {
  const clickedCell = e.target;
  const clickedCellNum = parseInt(clickedCell.innerText);

  clickedCell.classList.toggle('checked');

  if (clickedCell.classList.contains('checked')) {
    rewardsPlace.push(clickedCellNum);
  } else {
    rewardsPlace.splice(rewardsPlace.indexOf(clickedCellNum), 1);
  }
}


function inputRewardModal(modalEl) {
  const rewardInputArea = document.querySelector(".reward-input-area");

  // rewardInputArea에 기존에 있던 보상목록 제거
  while (rewardInputArea.hasChildNodes()) {
    rewardInputArea.removeChild(rewardInputArea.firstChild);
  }

  // 모달2에서 선택한 보상 자리 순서대로 입력될 수 있도록 정렬한다.
  rewardsPlace.sort(function (a, b) {
    return a - b;
  });


  // 보상 입력창 추가
  for (let i = 0; i < rewardsPlace.length; i++) {
    const rewardInputDiv = document.createElement('div');
    const label = document.createElement('p');
    label.innerText = `${rewardsPlace[i]}번째 위치할 보상을 입력해주세요.`;
    const rewardInputText = document.createElement('input');
    rewardInputText.classList.add('reward-input-text');

    rewardInputDiv.appendChild(label);
    rewardInputDiv.appendChild(rewardInputText);

    rewardInputArea.appendChild(rewardInputDiv);
  }

}