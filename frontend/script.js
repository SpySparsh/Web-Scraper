const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadingDiv = document.getElementById('loading');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const query = searchInput.value.trim();
  
  if (!query) {
    return;
  }
  
  // Clear old results
  resultsContainer.innerHTML = '';
  
  // Show loading message
  loadingDiv.style.display = 'block';
  
  try {
    // Make POST request to the API
    // Ensure this matches your backend URL and Port
    const response = await fetch('https://web-scraper-9v14.onrender.com/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    
    // Hide loading message
    loadingDiv.style.display = 'none';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Loop through results and display them
    results.forEach(result => {
      // Create result div
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result-item';
      
      // Create title (h3)
      const titleElement = document.createElement('h3');
      const linkElement = document.createElement('a');
      linkElement.href = result.link;
      linkElement.textContent = result.title || 'No title';
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      titleElement.appendChild(linkElement);
      
      // Create snippet (p)
      const snippetElement = document.createElement('p');
      snippetElement.textContent = result.snippet || 'No snippet available';
      snippetElement.className = 'snippet';
      
      // Append elements to result div
      resultDiv.appendChild(titleElement);
      resultDiv.appendChild(snippetElement);
      
      // Append result div to container
      resultsContainer.appendChild(resultDiv);
    });
  } catch (error) {
    // Hide loading message
    loadingDiv.style.display = 'none';
    
    // Show error message
    resultsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}. Please try again.</p>`;
    console.error('Error:', error);
  }
});
