// 셀렉터
const addPlanBtn = document.querySelector('.add-plan-button');
const planContainer = document.querySelector('.plan-container');

//이벤트 리스너
document.addEventListener('DOMContentLoaded', getPlans);
addPlanBtn.addEventListener('click', addPlan);


//펑션
function getPlans() {
  let plans = localStorage.getItem('plans') ? JSON.parse(localStorage.getItem('plans')) : [];

  plans.forEach(plan => {
    const planTitleArea = document.createElement('div');
    const planTitleEl = document.createElement('p');
    const changeTitleBtn = document.createElement('button');

    planTitleArea.classList.add('plan-title-area');
    planTitleEl.classList.add('plan-title');
    changeTitleBtn.classList.add('change-title-button');

    planTitleEl.innerText = plan.title;
    changeTitleBtn.textContent = '이름 수정';

    planTitleArea.appendChild(planTitleEl);
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

      if(i<plan.stampCnt){
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


function addPlan() {
  const planTitleArea = document.createElement('div');
  const planTitleEl = document.createElement('p');
  const changeTitleBtn = document.createElement('button');

  planTitleArea.classList.add('plan-title-area');
  planTitleEl.classList.add('plan-title');
  changeTitleBtn.classList.add('change-title-button');

  planTitleEl.innerText = '계획명';
  changeTitleBtn.textContent = '이름 수정';

  planTitleArea.appendChild(planTitleEl);
  planTitleArea.appendChild(changeTitleBtn);

  const planDescriptionArea = document.createElement('div');
  const restDayEl = document.createElement('p');
  const stampCntEl = document.createElement('p');

  planDescriptionArea.classList.add('plan-description-area');
  restDayEl.classList.add('rest-day');
  stampCntEl.classList.add('stamp-count-text');

  restDayEl.innerText = '보상까지 n일 남았습니다.';
  stampCntEl.innerText = '(0/15)';

  planDescriptionArea.appendChild(restDayEl);
  planDescriptionArea.appendChild(stampCntEl);

  const stampTableArea = document.createElement('div');

  for (let i = 0; i < 15; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    cell.innerText = i + 1;
    stampTableArea.appendChild(cell);
  }

  stampTableArea.classList.add('stamp-table-area');


  planContainer.appendChild(planTitleArea);
  planContainer.appendChild(planDescriptionArea);
  planContainer.appendChild(stampTableArea);
}