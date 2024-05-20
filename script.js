async function fetchImages(category) {
    const apiKey = 'Fe85xzHHwgS4GDDGuInT0hxv1OCRbVv403FrCITf';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the response contains an error message
        if (!response.ok) {
            throw new Error(`Error: ${data.msg}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}



// Display images on the web page
function displayImages(images) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';

    if (Array.isArray(images)) {
        images.forEach(image => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
    
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
    
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.title;
    
            const titleElement = document.createElement('p');
            titleElement.classList.add('text-fluid');
            titleElement.textContent = image.title;
    
            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('card-description');
            descriptionElement.textContent = image.description;
    
            cardContent.appendChild(titleElement);
            cardContent.appendChild(descriptionElement);
    
            cardElement.appendChild(imgElement);
            cardElement.appendChild(cardContent);
    
            cardElement.addEventListener('click', () => displayDetails(image));
    
            // Append card container to image container
            imageContainer.appendChild(cardElement);
        });
    } else {
        console.error('Invalid data format:', images);
        // You can display an error message to the user or handle it in any other way
    }
    
    
    
    
}

// Display detailed information for the selected image
function displayDetails(image) {
    const details = document.getElementById('details');
    const detailsContainer = document.getElementById('details-container');
    details.innerHTML = `
        <h2>${image.title}</h2>
        <p>Date: ${image.date}</p>
        <p>${image.explanation}</p>
    `;
    detailsContainer.style.display = 'block';

    const img = new Image();
    img.src = image.url;
    img.onload = function() {
        // Set the background of the details container to the image itself
        detailsContainer.style.backgroundImage = `url('${image.url}')`;
        
    };
}

document.getElementById('category').addEventListener('change', async function() {
    await applyFilter();
});

// Apply filter based on selected category
async function applyFilter() {
    const selectedCategory = document.getElementById('category').value;
    const images = await fetchImages(selectedCategory);
    displayImages(images);
}

// Initial load - Fetch and display images
window.onload = async function() {
    await applyFilter();
};

function closeDetails() {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.style.display = 'none';
}
