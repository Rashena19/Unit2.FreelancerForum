
const names = ['Alice', 'Bob', 'Carol', 'Alissa', "Sara", "Josh" ];
const occupations = ['Writer','Teacher', 'Programmer', 'Driver', 'Lawyer'];
  

  const freelancers = [
    { name: 'Alice', price: 30, occupation:'Writer' },
    { name: 'Bob', price: 50, occupation: 'Teacher' },
  ];
  const maxLength = 15;

// Helper function to generate a random value from an array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // Alternative addFreelancer function
  function addFreelancer() {
    const name = getRandomItem(names);
    const occupation = getRandomItem(occupations);
    const price = Math.floor(Math.random() * 100);
  
    // Add the new freelancer directly to the freelancers array
    freelancers.push({ name, occupation, price });
  }
  
  // === Render ===
  // Update the DOM to reflect the current state
  function render() {
    const averagePriceElement = document.querySelector('#average-price');
    const tableBody = document.querySelector('#table-body');
  
    // Create row elements from the freelancers array using map
    const rowElements = freelancers.map(({ name, occupation, price }) => {
      const newRow = document.createElement('tr');
      
      // Create table cells for name, occupation, and price
      const nameCell = document.createElement('td');
      nameCell.innerText = name;
  
      const occupationCell = document.createElement('td');
      occupationCell.innerText = occupation;
  
      const priceCell = document.createElement('td');
      priceCell.innerText = `$${price}`;
  
      // Append cells to the row
      newRow.append(nameCell, occupationCell, priceCell);
  
      return newRow;
    });
  
    // Replace existing rows in the table body
    tableBody.replaceChildren(...rowElements);
  
    // Update the average price display
    const newAverage = calculateAveragePrice();
    averagePriceElement.innerText = `$${newAverage}`;
  }
  
  // Function to calculate the average price
  function calculateAveragePrice() {
    if (freelancers.length === 0) return 0; // Handle division by zero
    
    const total = freelancers.reduce((subtotal, { price }) => subtotal + price, 0);
    return Math.round(total / freelancers.length);
  }
  
  // === Script ===
  
  // Set an interval to add a freelancer and re-render the table
  const addFreelancerIntervalId = setInterval(() => {
    addFreelancer();
    render();
  
    // Clear the interval when the freelancers array reaches the max length
    if (freelancers.length >= maxLength) {
      clearInterval(addFreelancerIntervalId);
    }
  }, 1000);
  
  // Render the initial state on page load
  render();