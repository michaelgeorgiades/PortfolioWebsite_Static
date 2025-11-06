// Photo data
const photos = [
    { id: 1, title: "Umhlanga Lighthouse", description: "Umhlanga Lighthouse in South Africa", price: 5, image: "./attached_assets/lighthouse.jpg" },
    { id: 2, title: "a Vulture", description: "A Vulture in Black & White", price: 5, image: "./attached_assets/vulture.jpg" },
    { id: 3, title: "Oxpecker on Zebra Tail", description: "An Oxpecker on a Zebra's Tail", price: 5, image: "./attached_assets/oxpeckerzebratail.jpg" },
    { id: 4, title: "Oxpeckers on Giraffe", description: "Oxpeckers on a giraffe's back", price: 5, image: "./attached_assets/oxpeckergiraffe.jpg" },
    { id: 5, title: "Tower Bridge in London", description: "Tower Bridge in London", price: 5, image: "./attached_assets/towerbridge.jpg" },
    { id: 6, title: "Oxpeckers on Zebra", description: "Oxpeckers on a zebras's back", price: 5, image: "./attached_assets/tickbirds.jpg" },
    { id: 7, title: "Oxpeckers on Rhino", description: "Oxpeckers on a rhino's back", price: 5, image: "./attached_assets/oxpeackerrhino.jpg" },
    { id: 8, title: "The Moon", description: "The Moon", price: 5, image: "./attached_assets/moon.jpg" },
    { id: 9, title: "Durban Skyline", description: "Durban Skyline", price: 5, image: "./attached_assets/durban.jpg" }
];

let currentPhotoData = null;

// Photo modal functionality
function initializeModal() {
    const modal = document.getElementById('photoModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePhotoModal();
        }
    });
}

function openPhotoModal(photoId) {
    const photo = photos.find(p => p.id === photoId);
    if (!photo) return;

    currentPhotoData = photo;
    
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    
    modalImage.src = photo.image;
    modalImage.alt = photo.title;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
    modalPrice.textContent = `$${photo.price}`;
    
    modal.style.display = 'block';

    // Render PayPal button
    const paypalContainer = document.getElementById('paypal-button-container-modal');
    paypalContainer.innerHTML = ''; // Clear previous button
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: currentPhotoData.title,
                    amount: {
                        value: currentPhotoData.price
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                showToast('Transaction completed by ' + details.payer.name.given_name);
                closePhotoModal();
            });
        },
        onError: function(err) {
            showToast('An error occurred during the transaction.');
            console.error('PayPal Error:', err);
        }
    }).render('#paypal-button-container-modal');
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
}

window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
