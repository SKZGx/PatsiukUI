var idCounter = 1; // Initialize a counter for unique IDs

// Load items from localStorage on page load
$(document).ready(function () {
    loadItemsFromLocalStorage();
});

function addItem() {
    // Get form values
    var title = $('#title').val();
    var itemImageLink = $('#itemimage').val();
    var translated = $('#translated').val();
    var approved = $('#approved').val();

    // Create unique ID for the new item
    var newItemId = 'item_' + idCounter;

    // Create an object with item details
    var newItem = {
        id: newItemId,
        title: title,
        image: itemImageLink,
        translated: translated,
        approved: approved
    };

    // Store the item in local storage
    storeItemInLocalStorage(newItem);

    // Call the generic add item function
    addStoredItemToUI(newItem);

    // Increment the counter for the next item
    idCounter++;

    // Reset form fields
    $('#form')[0].reset();

    twemoji.parse(document.body);
}

function removeItem(itemId) {
    // Remove the corresponding remove button from removeobj
    $('.removebtn[data-itemid="' + itemId + '"]').remove();

    // Remove the item by its ID from the UI
    $('#' + itemId).remove();

    // Remove the item from local storage
    removeItemFromLocalStorage(itemId);
    
    // Optionally, remove the item from the "images" section in div.UI
    $('#uiContainer #' + itemId).remove();
}

function captureScreenshotWithDomToImage() {
    // Get the UI node
    var uiNode = document.getElementById('uiContainer');

    // Use dom-to-image to capture the screenshot
    domtoimage.toBlob(uiNode)
        .then(function (blob) {
            // Create a download link
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'screenshot.png';

            // Simulate a click on the link to trigger the download
            link.click();

            // Clean up
            URL.revokeObjectURL(link.href);
        })
        .catch(function (error) {
            console.error('Error capturing screenshot:', error);
        });
}

function storeItemInLocalStorage(item) {
    // Get the existing items from local storage
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];

    // Add the new item to the array
    storedItems.push(item);

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
    twemoji.parse(document.body);
}

function loadItemsFromLocalStorage() {
    // Load items from localStorage and display them in both "images" and "calc" sections
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];

    // Add each stored item to the UI
    storedItems.forEach(function (item) {
        addStoredItemToUI(item);
    });
    twemoji.parse(document.body);
}

function removeItemFromLocalStorage(itemId) {
    // Remove the item from local storage by its ID
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];
    var updatedItems = storedItems.filter(function (item) {
        return item.id !== itemId;
    });

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(updatedItems));
    twemoji.parse(document.body);
}

function addStoredItemToUI(item) {
    // Create the HTML content for the new item
    var newItemHTML = `
        <div id="${item.id}" class="itemcontainer">
            <div class="itemtitlecont">
                <div class="itemimage" style="background-image: url('${item.image}');"></div>
                <div class="title">${item.title}</div>
            </div>
            <div class="statuscont">
                <div class="translated" style="width: ${item.translated}%;"></div>
                <div class="approved" style="width: ${item.approved}%;"></div>
                <div class="percentage">${item.translated}% 🖍 ${item.approved}% ✅</div>
            </div>
        </div>
    `;

    // Append the new item to the "images" div using innerHTML
    document.getElementById('images').innerHTML += newItemHTML;

    // Create the HTML content for the remove button
    var removeButtonHTML = `
        <div class="removecont" id="${item.id}">
            <div class="removebtn" data-itemid="${item.id}" onclick="removeItem('${item.id}')" title="remove"> 🗑${item.title}</div>
        </div>
    `;

    // Append the remove button to the "removeobj" div using innerHTML
    document.querySelector('.removeobj').innerHTML += removeButtonHTML;

    // Parse twemoji after adding elements
    twemoji.parse(document.body);
}
