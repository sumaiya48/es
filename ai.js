const loadAi = async()=>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAi(data.data.tools);
}

const displayAi = ai =>{
    const aiContainer = document.getElementById('ai-container');
    // show 6 card
    ai = ai.slice(0,6);
    ai.forEach(ai =>{
        console.log(ai)
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
    aiDiv.innerHTML=`<div class="card h-100">
    <img src=${ai.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${ai.name}</h5>
     <h6>Features</h6>
     <ol>
     <li>${ai.features}</li></ol>

    </div>
    <div class="card-footer d-flex justify-content-between">
    <div><h5>${ai.name} </h5>
    <p>${ai.published_in}</p></div>
    <div><button >see more</button>
      
    </div>
  </div>
  `;
  aiContainer.appendChild(aiDiv);
    })
}

loadAi();
