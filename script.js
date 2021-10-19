// 셀렉터
const addPlanBtn = document.querySelector('.add-plan-button');
const planContainer = document.querySelector('.plan-container');
const addPlanModal = document.querySelector('.plan-add-modal');
const addBtn = document.querySelector('.add-button');
const cancelBtn = document.querySelector('.cancel-button');

// 모달에서 입력받은 정보(계획명, 테이블크기)
const planTitleInput = document.querySelector('.plan-title-input');
const tableSizeInput = document.querySelector('.table-size-input');

//이벤트 리스너
document.addEventListener('DOMContentLoaded', getPlans);
addPlanBtn.addEventListener('click', addPlanModalEvent);
addBtn.addEventListener('click', addPlan);
cancelBtn.addEventListener('click', closeModal);

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
    planTitleEl.disabled=true;
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

      if (i < plan.stampCnt) {
        cell.classList.add('stamp');
      }
      cell.innerText = i + 1;
      stampTableArea.appendChild(cell);
    }

    stampTableArea.classList.add('stamp-table-area');


    planContainer.appendChild(planTitleArea);
    planContainer.appendChild(planDescriptionArea);
    planContainer.appendChild(stampTableArea);
  });
}

function addPlanModalEvent() {
  addPlanModal.style.display = 'block';
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

  planTitleEl.value = plan.title;
  planTitleEl.disabled=true;
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
  addPlanModal.style.display = 'none';

  // 계획 추가 모달 인풋 초기화
  planTitleInput.value = '';
  tableSizeInput.value = '';
}

function modifyPlanTitle(e) {
  const currPlanTitleEl = e.target.parentElement.childNodes[0];
  const prevPlantitle = currPlanTitleEl.value;
  const okButton = e.target.parentElement.childNodes[1];

  currPlanTitleEl.disabled=false;
  e.target.disabled = true;
  okButton.style.display = 'block';
  
  //수정 버튼 클릭시 이벤트 리스너 추가
  okButton.addEventListener('click', function(){
    planTitleModifyEvent(prevPlantitle, currPlanTitleEl.value);
    okButton.disabled = true;
    okButton.style.display = 'none';
    e.target.disabled = false;
    currPlanTitleEl.disabled = true;
  });
  
  //이름에 변경이 있는 이름수정 버튼 활성화
  currPlanTitleEl.addEventListener('input', function(){
    if(prevPlantitle === currPlanTitleEl.value){
     okButton.disabled = true;
    }else{
      okButton.disabled = false;
    }
  });

}

function getPlansFromLocalStorage() {
  const plans = localStorage.getItem('plans') ? JSON.parse(localStorage.getItem('plans')) : [];
  return plans;
}

function planTitleModifyEvent(prevTitle, currTitle){
  const plans = getPlansFromLocalStorage();
  
  plans.forEach(plan => {
    if(plan.title === prevTitle){
      plan.title = currTitle;
    }
  })

  localStorage.setItem('plans',JSON.stringify(plans));
}