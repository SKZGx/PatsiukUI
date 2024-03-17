var idCounter = 1; // Initialize a counter for unique IDs
var burgerMenuState;
var invisibleColorFieldValue;

const standardSettings = {
    borderRadiusValue: '10', // Example default value
    imageGapValue: '20', // Example default value
    CardBackground: '#000000', // Example default value
    ColorText: '#ffffff' // Example default value
};

function resetBurgerMenuStyles() {
    // Reset burger menu styles using standardSettings
    $('#border-radius').val(standardSettings.borderRadiusValue);
    $('#imageGap').val(standardSettings.imageGapValue);
    $('#CardBackground').val(standardSettings.CardBackground);
    $('#ColorText').val(standardSettings.ColorText);
    applyBurgerMenuStyles(); // Apply styles after resetting
    saveSettingsToLocalStorage(); // Save settings after resetting
}

// Load items from localStorage on page load
$(document).ready(function () {
    loadSettingsFromLocalStorage();
    applyBurgerMenuStyles();

    $('#CardBackground').on('input', function () {
        saveSettingsToLocalStorage(); // Save settings when CardBackground color changes
    });

    // Event listener for the input event on the #ColorText color input
    $('#ColorText').on('input', function () {
        saveSettingsToLocalStorage(); // Save settings when ColorText color changes
    });

    // Call saveSettingsToLocalStorage() within your existing event listeners
    $('#ColorText').on('input', function () {
        standardSettings.ColorText = $(this).val();
        applyBurgerMenuStyles();
        saveSettingsToLocalStorage(); // Save settings when ColorText changes
    });

    function updateCardSize(scaleValue) {
        // Calculate the width and height of the card based on the scale value
        var cardWidth = scaleValue * 270; // Assuming the initial width of the card is 270px
        var cardHeight = scaleValue * 100; // Assuming the initial height of the card is 100px
    
        // Apply dimensions to the card
        $('.itemcontainer').css({
            'width': cardWidth + 'px', // Set the width of the card
            'height': cardHeight + 'px' // Set the height of the card
        });
    
        // Calculate dimensions for elements inside the card
        var itemImageSize = scaleValue * 100; // Assuming the initial size of the item image is 100px
        var itemTitleFontSize = scaleValue * 16; // Assuming the initial font size of the item title is 16px
        var percentageFontSize = scaleValue * 14; // Assuming the initial font size of the percentage text is 14px
    
        // Apply dimensions to elements inside the card
        $('.images .itemimage').css('width', itemImageSize + 'px'); // Set the width of the item image
        $('.images .itemimage').css('height', itemImageSize + 'px'); // Set the height of the item image
        $('.images .title').css('font-size', itemTitleFontSize + 'px'); // Set the font size of the item title
        $('.percentage').css('font-size', percentageFontSize + 'px'); // Set the font size of the percentage text
    
        // Update the height of the .statuscont element
        var statusContHeight = scaleValue * 20; // Adjust as needed
        $('.statuscont').css('height', statusContHeight + 'px');
    
        // Save the scale value to localStorage
        localStorage.setItem('cardScaleValue', scaleValue);
    }
    
    
    // Load the scale value from localStorage when the page loads
    $(document).ready(function () {
        var savedScaleValue = localStorage.getItem('cardScaleValue');
        if (savedScaleValue) {
            $('#cardSize').val(savedScaleValue * 100).trigger('input');
        }
    });
    
    // Handle changes in the card size slider
    $('#cardSize').on('input', function () {
        var scaleValue = $(this).val() / 100; // Convert slider value to scale value (0-1)
        updateCardSize(scaleValue); // Update card size
        var textPercentage = scaleValue * 100; // Calculate the percentage for the text size
        $('.percentage').css('font-size', textPercentage + '%'); // Set the font size of the percentage text dynamically
    });

    $('#border-radius, #imageGap').on('input', function () {
        updateBurgerMenuState();
        applyBurgerMenuStyles();
        saveSettingsToLocalStorage(); // Save settings when border-radius or imageGap changes
    });

    // Initialize state to store latest settings
    burgerMenuState = {
        borderRadius: $('#border-radius').val(),
        cardBackgroundColor: $('#CardBackground').val(),
        uiBackgroundImage: $('#UIBackground').val()
    };

    // Attach input event listeners to form elements for real-time updates
    $('#SiteSettingsForm input').on('input', function () {
        updateBurgerMenuState();
        applyBurgerMenuStyles();
    });

    var hideMenuTimeout; // Define a variable to hold the timeout ID

    $('#ShowSiteSettings, #SiteSettingsForm').hover(
        function () {
            // On hover
            clearTimeout(hideMenuTimeout); // Clear any existing timeout
            showBurgerMenu();
        },
        function () {
            // On hover out
            hideMenuTimeout = setTimeout(hideBurgerMenu, 300); // Set a delay of 500 milliseconds before hiding the menu
        }
    );
    

    // Call loadItemsFromLocalStorage to load items when the page loads
    loadItemsFromLocalStorage();
    applyBurgerMenuStyles();
    updateBurgerMenuState();
    
    
});

function updateBurgerMenuState() {
    // Update state with the latest form values
    burgerMenuState = {
        borderRadius: $('#border-radius').val(),
        cardBackgroundColor: $('#CardBackground').val(),
        uiBackgroundImage: $('#UIBackground').val()
    };
}

function showBurgerMenu() {
    // Display burger menu
    $('#SiteSettingsForm').addClass('burger-menu-visible');
    applyBurgerMenuStyles();
}

function hideBurgerMenu() {
    // Hide burger menu
    $('.SiteSettings').removeClass('burger-menu-visible');
    applyBurgerMenuStyles();
}

// Function to apply burger menu styles
function applyBurgerMenuStyles() {
    // Get the current form values
    var currentBorderRadius = $('#border-radius').val() + 'px';
    var currentImageGap = $('#imageGap').val() + 'px'; // Get the value of imageGap
    var currentCardBackgroundColor = $('#CardBackground').val();
    var currentColorText = $('#ColorText').val(); // Get the ColorText value

    // Update the span elements with the current values
    $('.settingsradius').text($('#border-radius').val()); // Update span with border-radius value
    $('.settingsimageGap').text($('#imageGap').val()); // Update span with imageGap value

    // Check if fields are empty and retrieve values from standard settings if needed
    if (currentBorderRadius === 'px') {
        currentBorderRadius = standardSettings.borderRadiusValue + 'px';
        $('#border-radius').val(parseInt(currentBorderRadius)); // Update input field
    }
    if (currentCardBackgroundColor === '') {
        currentCardBackgroundColor = standardSettings.CardBackground;
        $('#CardBackground').val(currentCardBackgroundColor); // Update input field
    }

    // Apply styles
    $('.itemcontainer').css('border-radius', currentBorderRadius);
    $('.images').css('gap', currentImageGap); // Apply gap style
    $('.itemcontainer').css('background-color', currentCardBackgroundColor);

    // Apply ColorText to specified elements
    $('.title, .percentagecont').css('color', currentColorText);
}


// Event listener for the input event on the #imageGap slider
$('#imageGap').on('input', function () {
    applyBurgerMenuStyles(); // Update styles when imageGap slider value changes
    saveSettingsToLocalStorage(); // Save settings when imageGap changes
});


// Function to save settings to local storage
function saveSettingsToLocalStorage() {
    // Initialize an object to store all settings
    var allSettings = {};

    // Get values from form fields
    allSettings.settings = {
        borderRadiusValue: $('#border-radius').val(),
        imageGapValue: $('#imageGap').val(),
        CardBackground: $('#CardBackground').val(), // Store CardBackground value
        ColorText: $('#ColorText').val() // Store ColorText value
    };
    

    // Convert the settings object to JSON and save to local storage
    localStorage.setItem('allSettings', JSON.stringify(allSettings));
}

// Function to load settings from local storage
function loadSettingsFromLocalStorage() {
    // Load settings from local storage
    var savedSettings = JSON.parse(localStorage.getItem('allSettings'));

    // If there are saved settings, update the form fields
    if (savedSettings && savedSettings.settings) {
        var settings = savedSettings.settings;
        $('#border-radius').val(settings.borderRadiusValue);
        $('#imageGap').val(settings.imageGapValue);
        $('#CardBackground').val(settings.CardBackground); // Update CardBackground input field
        $('#ColorText').val(settings.ColorText); // Update ColorText input field
        applyBurgerMenuStyles(); // Apply styles after loading settings
    } else {
        // If no settings are found, use standardSettings
        $('#border-radius').val(standardSettings.borderRadiusValue);
        $('#imageGap').val(standardSettings.imageGapValue);
        $('#CardBackground').val(standardSettings.CardBackground); // Update CardBackground input field
        $('#ColorText').val(standardSettings.ColorText); // Update ColorText input field
        applyBurgerMenuStyles(); // Apply styles after loading standard settings
    }
}

$('.removeobj').on('click', '.removebtn', function () {
    var itemId = $(this).data('itemid');
    removeItem(itemId);
    applyBurgerMenuStyles();
});

function removeItem(itemId) {
    // Remove the corresponding remove button from removeobj
    $('.removebtn[data-itemid="' + itemId + '"]').remove();

    // Remove the item by its ID from the UI
    $('#' + itemId).remove();

    // Remove the item from local storage
    removeItemFromLocalStorage(itemId);

    // Trigger a custom event on div.removeobj after removing an item
    $('.removeobj').trigger('itemsRemoved');

    // Update the loaded items immediately
    updateItems();
    applyBurgerMenuStyles();
}


function updateItems() {
    // Clear the contents of the #images div
    $('#images').empty();
    $('.removeobj').empty();

    // Load items from local storage and display them
    loadItemsFromLocalStorage();
}



function storeItemInLocalStorage(item) {
    // Get the existing items from local storage
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];

    // Add the new item to the array
    storedItems.push(item);

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
}

function loadItemsFromLocalStorage() {
    // Load items from localStorage and display them in both "images" and "calc" sections
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];

    // Add each stored item to the UI
    storedItems.forEach(function (item) {
        addStoredItemToUI(item);
    });
}

function removeItemFromLocalStorage(itemId) {
    // Remove the item from local storage by its ID
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];
    var updatedItems = storedItems.filter(function (item) {
        return item.id !== itemId;
    });

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(updatedItems));
   
}

loadItemsFromLocalStorage();

function addItem() {
    // Get form values
    var title = $('#title').val();
    var itemImageLink = $('#itemimage').val();
    var translated = $('#translated').val();
    var approved = $('#approved').val();

    // Retrieve the current ID counter value from local storage or initialize it to 1 if not found
    var idCounter = parseInt(localStorage.getItem('idCounter')) || 1;

    // Create unique ID for the new item using the current ID counter value
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
    applyBurgerMenuStyles();

    // Increment the counter for the next item
    idCounter++;

    // Store the updated counter value back to local storage
    localStorage.setItem('idCounter', idCounter);

    // Reset form fields
    $('#form')[0].reset();
}

function addStoredItemToUI(item) {
    // Create the HTML content for the new item
    var newItemHTML = `
        <div id="${item.id}" class="itemcontainer">
            <div class="itemtitlecont">
                <div class="itemimage" style="background: url('${item.image}');"></div>
            </div>
            <div class="iteminfocont">
            <div class="infocont">
                <div id="itemtitle" class="title">${item.title}</div>
                <div class="statuscont">
                    <div class="statused"> <div id="itemtranslated" class="translated" style="width: ${item.translated}%;"></div>
                    <div id="itemapproved" class="approved" style="width: ${item.approved}%;"></div></div></div>
                    <div class="percentagecont"><div class="percentage">${item.translated}% ✏️ ${item.approved}% ✅</div></div>
            </div>
            </div>
        </div>
    `;

    // Append the new item to the "images" div using innerHTML
    document.getElementById('images').innerHTML += newItemHTML;

    // Create the HTML content for the remove button with input fields
    var removeButtonHTML = `
        <div class="removecont" id="${item.id}">
            <div class=removetextcont>
            <div class="contcont">
                <div class="removebtn" data-itemid="${item.id}" title="remove" onclick="removeItem('${item.id}')">
                    <i class="emoji em-delete"></i>
                </div>
                <div class="nameUI">
                <div class="itemimage" style="background: url('${item.image}');"></div>
                
                <div>${item.title}</div>
                </div></div>
            </div>
            <label for="translated">✏️ Перекладено:</label >
            <input type="number" class="translated-input form__label" value="${item.translated}" onchange="updateMemoryValues('${item.id}', 'translated', this.value)">
            <label for="approved">✅ Затверджено:</label >
            <input type="number" class="approved-input form__label" value="${item.approved}" onchange="updateMemoryValues('${item.id}', 'approved', this.value)">
        </div>
    `;

    // Append the remove button to the "removeobj" div using innerHTML
    document.querySelector('.removeobj').innerHTML += removeButtonHTML;
}

function updateMemoryValues(itemId, field, value) {
    // Update values in the local storage
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];
    var updatedItems = storedItems.map(function (item) {
        if (item.id === itemId) {
            return { ...item, [field]: value };
        }
        return item;
        updateMemoryValues();
    });

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(updatedItems));

    // Update values in the UI
    $(`#${itemId} .${field}`).css('width', `${value}%`);
    $(`#${itemId} .percentage`).html(`${updatedItems.find(item => item.id === itemId).translated}% ✏️ ${updatedItems.find(item => item.id === itemId).approved}% ✅`);
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


$('.color-picker').spectrum({
    showInput: true,
    preferredFormat: 'hex',
    showPalette: true,
    showSelectionPalette: true,
    palette: [
        ['#000', '#444', '#666', '#999', '#ccc', '#eee', '#f3f3f3', '#fff'],
        ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#9400D3']
    ],
    change: function (color) {
        // Trigger the input change event when the color changes
        $('#UIBackground').val(color.toHexString()).trigger('input');
        
        // Add this line to apply the color immediately
        applyBurgerMenuStyles();
    }
});