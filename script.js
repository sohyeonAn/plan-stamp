let plans = localStorage.getItem('plans') ? JSON.parse(localStorage.getItem('plans')) : [];

const innerEl = document.querySelector('.inner');
const containerEl = document.getElementById('container');

function init() {
  if(plans.length === 0){
    alert("계획을 추가해주세요.");
  } else {
    plans.forEach(plan => {
      const planEl = document.createElement('div');
      planEl.innerHTML = containerEl.innerHTML;
      planEl.style.display = 'block';
      planEl.id = "container-"+plan.id;
      
      console.log(planEl.id);
      const table = document.createElement('div');
      table.id = "mainTable";
      table.innerHTML = '';
  
      for (let i = 0; i < plan.tableSize; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerText = i+1; // 1부터 시작
  
        if(i === plan.stampCnt){
          cell.id = 'currentCell';
        }
  
        table.appendChild(cell);
      }
      
      planEl.appendChild(table);
      innerEl.appendChild(planEl);
    });
  }
}

init();