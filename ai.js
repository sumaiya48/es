let allData = []; // store all the data in this variable
let displayedItemsCount = 0; // keep track of the number of displayed items

const loadAi = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  allData = data.data.tools; // save all the data in the variable
  displayAi(allData.slice(0, 6)); // display only the first 6 items
}

const displayAi = ai => {
  const aiContainer = document.getElementById('ai-container');
  ai.forEach(ai => {
    const features = ai.features.map(feature => `<li>${feature}</li>`).join('');
    const aiDiv = document.createElement('div');
    aiDiv.classList.add('col');
    
    aiDiv.innerHTML = `<div class="card h-100">
    <img src=${ai.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${ai.name}</h5>
      <h6>Features</h6>
      <ol>${features}</ol>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <div><h5>${ai.name} </h5><p>${ai.published_in}</p></div>
      <div><button onClick="loadAiDetails('${ai.id}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Details
</button></div>
    </div>
  </div>`;
    aiContainer.appendChild(aiDiv);
    
  });
 
  // sprinner stop 
  togglesSpinner(false)
  // update the displayed items count
  displayedItemsCount += ai.length;

  // disable the button if all the items are already displayed
  const loadMoreButton = document.getElementById('see-more-btn');
  if (displayedItemsCount === allData.length) {
    loadMoreButton.disabled = true;
  }

  // add a click event listener to the button to load more items
  loadMoreButton.addEventListener('click', () => {
    // sprinner start 
    togglesSpinner(true);
    const remainingData = allData.slice(displayedItemsCount, displayedItemsCount + 6); // get the next 6 items from the data
    displayAi(remainingData); // display the next 6 items
  });


  
}
const togglesSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none');
  }
}


const loadAiDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url)
  const data = await res.json()
  displayAiDetails(data.data)
}

const displayAiDetails = ai => {
  const modalDescription = document.getElementById('description-wrapper');
  const modalRightContent = document.getElementById('modal-right');
  const pricingPlan = ai.pricing.map(price => `<div class="pricing">
  <div>${price.price} </div><div>${price.plan}</div></div>`).join('');
  const allFeatures = Object.values(ai.features).map(feature => `<li>${feature.feature_name}</li>`).join('');
  const allIntegration = ai.integrations.map(integration => `<li>${integration}</li>`).join('');
  const inputOutputArray = ai.input_output_examples.map(({ input, output }) => [input, output]);
  modalDescription.innerHTML = `<h5> ${ai.description}
</h5>
<div id="plans">
${pricingPlan}
</div>
<div class="features-integrations">
<div class="row">
<div class="col-6">
<div id="details-feature">
<h4>Features</h4>
<ul>${allFeatures}</ul>
</div>
</div>
<div class="col-6">
<div id="details-integration">
<h4>Integrations</h4>
<ul>${allIntegration ? allIntegration : "No data found"}</ul>
</div>
</div>
</div>
</div>`;


modalRightContent.innerHTML = '';
  modalRightContent.innerHTML = `
  <span class="badge bg-danger">${ai.accuracy.score ? ai.accuracy.score : ''}accuracy</span>
<img src="${ai.image_link[0] ? ai.image_link[0] : "no data found" }" alt="">
<h4 id="modal-title">${inputOutputArray[0][0]}</h4>
<p id="modal-message">${inputOutputArray[0][1]}</p>`

}


loadAi();