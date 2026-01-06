// Photography component
function renderPhotographySection() {
    return `
        <div class="section-content">
            <h2 class="section-title">Photography Gallery</h2>
            <p class="section-subtitle">Capturing moments through the lens</p>

            <div class="photo-grid" id="photoGrid">
                <div class="photo-item" data-photo-id="1">
                    <img src="./attached_assets/lighthouse.jpg" alt="Umhlanga Lighthouse" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Umhlanga Lighthouse</h4>
                        <p>Umhlanga Lighthouse in South Africa</p>
                        <button class="btn btn-small" onclick="openPhotoModal(1)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="2">
                    <img src="./attached_assets/vulture.jpg" alt="Vulture" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Vulture</h4>
                        <p>A Vulture in Black & White</p>
                        <button class="btn btn-small" onclick="openPhotoModal(2)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="3">
                    <img src="./attached_assets/oxpeckerzebratail.jpg" alt="Oxpecker on a Zebra's tail" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Oxpecker on Zebra Tail</h4>
                        <p>An Oxpecker on a Zebra's Tail</p>
                        <button class="btn btn-small" onclick="openPhotoModal(3)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="4">
                    <img src="./attached_assets/oxpeckergiraffe.jpg" alt="Oxpecker on Giraffe" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Oxpeckers on Giraffe</h4>
                        <p>Oxpeckers on a giraffe's back</p>
                        <button class="btn btn-small" onclick="openPhotoModal(4)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="5">
                    <img src="./attached_assets/towerbridge.jpg" alt="Tower Bridge" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Tower Bridge in London</h4>
                        <p>Tower Bridge in London</p>
                        <button class="btn btn-small" onclick="openPhotoModal(5)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="6">
                    <img src="./attached_assets/tickbirds.jpg" alt="Oxpeckers on Zebra" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Oxpeckers on a Zebra</h4>
                        <p>Oxpeckers on a zebras's back</p>
                        <button class="btn btn-small" onclick="openPhotoModal(6)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="7">
                    <img src="./attached_assets/oxpeackerrhino.jpg" alt="Oxpecker on Rhino" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Oxpeckers on Rhino</h4>
                        <p>Oxpeckers on a rhino's back</p>
                        <button class="btn btn-small" onclick="openPhotoModal(7)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="8">
                    <img src="./attached_assets/moon.jpg" alt="The Moon" class="photo-image">
                    <div class="photo-overlay">
                        <h4>The Moon</h4>
                        <p>The Moon</p>
                        <button class="btn btn-small" onclick="openPhotoModal(8)">View & Purchase - $5</button>
                    </div>
                </div>

                <div class="photo-item" data-photo-id="9">
                    <img src="./attached_assets/durban.jpg" alt="Durban" class="photo-image">
                    <div class="photo-overlay">
                        <h4>Durban Skyline</h4>
                        <p>Durban Skyline</p>
                        <button class="btn btn-small" onclick="openPhotoModal(9)">View & Purchase - $5</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
