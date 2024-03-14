var idCounter = 1; // Initialize a counter for unique IDs
var burgerMenuState;
var invisibleColorFieldValue;

var standardSettings = {
    isImageBackground: true,
    currentBackgroundColor: '#1e2126',
    backgroundSwitchState: true,
    borderRadiusValue: '17',
    imageGapValue: '21',
    UIBackgroundImage: 'https://i.imgur.com/ukZ8NJu.png',
    UIBackgroundColor: '',
    CardBackground: '#1e2126', // Add CardBackground property to standardSettings
    ColorText: '#ffffff' // Add ColorText property to standardSettings
};


// Load items from localStorage on page load
$(document).ready(function () {
    loadSettingsFromLocalStorage();
    applyBurgerMenuStyles();
    
    var isImageBackground = true;

    var currentBackgroundColor = '#1e2126'; // Initialize the variable

    
// Call saveSettingsToLocalStorage() within your existing event listeners
$('#backgroundSwitch').on('change', function () {
    updateUIBackgroundInput();
    resetBackground();
    applyBurgerMenuStyles();
    saveSettingsToLocalStorage(); // Save settings when background switch changes
});

window.addEventListener('load', function() {
    applyBurgerMenuStyles();
});


// Event listener for ColorText input change
$('#ColorText').on('input', function () {
    standardSettings.ColorText = $(this).val();
    applyBurgerMenuStyles();
    saveSettingsToLocalStorage(); // Save settings when ColorText changes
});

// Event listener for UIBackground input change
$('#UIBackground').on('input', function () {
    standardSettings.currentBackgroundColor = $(this).val();
    applyBurgerMenuStyles();
    saveSettingsToLocalStorage(); // Save settings when UIBackground changes
});
    

// Function to save settings to local storage
function saveSettingsToLocalStorage() {
    // Initialize an object to store all settings
    var allSettings = {};

    // Get values from form fields
    allSettings.settings = {
        backgroundSwitchState: $('#backgroundSwitch').prop('checked'),
        borderRadiusValue: $('#border-radius').val(),
        imageGapValue: $('#imageGap').val(),
        UIBackground: $('#UIBackground').val(),
        CardBackground: $('#invisibleColorField').val(), // Store invisible color field value
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
        $('#backgroundSwitch').prop('checked', settings.backgroundSwitchState);
        $('#border-radius').val(settings.borderRadiusValue);
        $('#imageGap').val(settings.imageGapValue);
        $('#UIBackground').val(settings.UIBackground);
        $('#invisibleColorField').val(settings.CardBackground); // Update CardBackground field as well
        $('#CardBackground').val(settings.CardBackground); // Update CardBackground input field
        $('#ColorText').val(settings.ColorText); // Update ColorText input field
        applyBurgerMenuStyles(); // Apply styles after loading settings
    } else {
        // If no settings are found, use standardSettings
        $('#backgroundSwitch').prop('checked', standardSettings.backgroundSwitchState);
        $('#border-radius').val(standardSettings.borderRadiusValue);
        $('#imageGap').val(standardSettings.imageGapValue);
        $('#UIBackground').val(standardSettings.UIBackground);
        $('#invisibleColorField').val(standardSettings.CardBackground); // Update CardBackground field as well
        $('#CardBackground').val(standardSettings.CardBackground); // Update CardBackground input field
        $('#ColorText').val(standardSettings.ColorText); // Update ColorText input field
        applyBurgerMenuStyles(); // Apply styles after loading standard settings
    }
}







// Call saveSettingsToLocalStorage() within your existing event listeners
$('#border-radius, #imageGap').on('input', function () {
    updateBurgerMenuState();
    applyBurgerMenuStyles();
    saveSettingsToLocalStorage(); // Save settings when border-radius or imageGap changes
});


// Call updateUIBackgroundInput initially to set the default input type
updateUIBackgroundInput();
// Call resetBackground initially to set the default background
resetBackground();
// Apply styles after setting the default input type and background
applyBurgerMenuStyles();

// Function to reset the background based on the switch state and UIBackground value
function resetBackground() {
    var defaultBackgroundColor = standardSettings.currentBackgroundColor; // Use standard settings
    var defaultBackgroundImage = standardSettings.UIBackgroundImage; // Use standard settings

    // Check the state of the backgroundSwitch
    if ($('#backgroundSwitch').prop('checked')) {
        // If switch is checked, reset background to default image
        $('.UI').css('background-color', ''); // Clear background color
        $('#UIBackground').val(defaultBackgroundImage);
    } else {
        // If switch is not checked, reset background to default color
        $('.UI').css('background-image', 'none'); // Remove background image
        $('#UIBackground').val(defaultBackgroundColor);
    }

    // Update isImageBackground based on the switch state
    standardSettings.isImageBackground = $('#backgroundSwitch').prop('checked');
}

    // Call updateUIBackgroundInput initially to set the default input type
updateUIBackgroundInput();
// Call resetBackground initially to set the default background
resetBackground();
// Apply styles after setting the default input type and background
applyBurgerMenuStyles();

    // Function to update switch label based on the current state
    function updateBackgroundTypeLabel() {
        var switchLabel = standardSettings.isImageBackground ? 'Зображення' : 'Колір';
        $('#backgroundSwitchLabel').text(switchLabel);
        updateUIBackgroundInput();
    }

    // Function to update UIBackground input based on the current state
    function updateUIBackgroundInput() {
        var uiBackgroundInput = $('#UIBackground');
    
        // Check the state of the backgroundSwitch
        if ($('#backgroundSwitch').prop('checked')) {
            // If switch is checked, set input type as text for image
            uiBackgroundInput.prop('type', 'text').val('').attr('placeholder', 'Вставте посилання на зображення');
        } else {
            // If switch is not checked, set input type as color for color
            uiBackgroundInput.prop('type', 'color').attr('placeholder', '');
        }
    }

    loadItemsFromLocalStorage();

    $('#UIBackground').val('#1e2126');
    $('#UIBackground').val('https://i.imgur.com/ukZ8NJu.png');

    updateInvisibleColorField();
    // Call resetBackground initially to set the default background
    resetBackground();
    // Apply styles after setting the initial value and background
    applyBurgerMenuStyles();

        // Event listener for CardBackground input change
        $('#CardBackground').on('input', function () {
            updateInvisibleColorField(); // Call the function to update the invisible color field whenever CardBackground changes
            saveSettingsToLocalStorage(); // Save settings when CardBackground changes
        });
    
    
    // Function to update the invisible color field
    function updateInvisibleColorField() {
        var cardBackgroundColor = $('#CardBackground').val(); // Get the value of CardBackground input
        $('#invisibleColorField').val(cardBackgroundColor); // Update the value of the invisible color field
    }

        // Function to save the value of the invisible color field
    function saveInvisibleColorFieldValue() {
        invisibleColorFieldValue = $('#invisibleColorField').val();
    }

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

    $('#ShowSiteSettings, #SiteSettingsForm').hover(
        function () {
            // On hover
            showBurgerMenu();
        },
        function () {
            // On hover out
            hideBurgerMenu();
        }
    );
});

$('#imageGap').on('input', function () {
    applyBurgerMenuStyles();
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
    var currentCardBackgroundColor = $('#CardBackground').val();
    var currentUiBackground = $('#UIBackground').val();
    var currentImageGap = $('#imageGap').val() + 'px';
    var currentColorText = $('#ColorText').val(); // Get the ColorText value

    // Check if fields are empty and retrieve values from standard settings if needed
    if (currentBorderRadius === 'px') {
        currentBorderRadius = standardSettings.borderRadiusValue + 'px';
        $('#border-radius').val(parseInt(currentBorderRadius)); // Update input field
    }
    if (currentCardBackgroundColor === '') {
        currentCardBackgroundColor = standardSettings.currentBackgroundColor;
        $('#CardBackground').val(currentCardBackgroundColor); // Update input field
    }
    if (currentUiBackground === '') {
        currentUiBackground = standardSettings.UIBackgroundImage;
        $('#UIBackground').val(currentUiBackground); // Update input field
    }
    if (currentImageGap === 'px') {
        currentImageGap = standardSettings.imageGapValue + 'px';
        $('#imageGap').val(parseInt(currentImageGap)); // Update input field
    }

    // Apply styles
    $('.itemcontainer').css('border-radius', currentBorderRadius);
    $('.images').css('gap', currentImageGap);
    $('.itemcontainer').css('background-color', currentCardBackgroundColor);

    // Apply ColorText to specified elements
    $('.title, .translated, .approved').css('color', currentColorText);

    // Check the state of the backgroundSwitch
    if ($('#backgroundSwitch').prop('checked')) {
        // If switch is checked, set background as image
        var currentUiBackgroundImage = 'url(' + currentUiBackground + ')';
        $('.UI').css('background', currentUiBackgroundImage);
    } else {
        // If switch is not checked, set background as color
        var backgroundColorToApply = currentUiBackground ? currentUiBackground : standardSettings.currentBackgroundColor;
        $('.UI').css('background-color', backgroundColorToApply);
    }
}


// Call resetBackground initially to set the default background
resetBackground();
// Apply styles after setting the default background
applyBurgerMenuStyles();



// Function to reset only specific styles when resetting burger menu
function resetBurgerMenuStyles() {
    // Reset the invisible color field value
    $('#invisibleColorField').val('');

    applyBurgerMenuStyles(); // Apply the reset styles
}


    // Event listener for form input change
    $('#form input').on('input', function () {
        applyBurgerMenuStyles(); // Apply styles immediately on input change
    });

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

$('.removeobj').on('click', '.removebtn', function () {
    var itemId = $(this).data('itemid');
    removeItem(itemId);
});

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

function addStoredItemToUI(item) {
    // Create the HTML content for the new item
    var newItemHTML = `
        <div id="${item.id}" class="itemcontainer">
            <div class="itemtitlecont">
                <div class="itemimage" style="background: url('${item.image}');"></div>
            </div>
            <div class="infocont">
                <div id="itemtitle" class="title">${item.title}</div>
                <div class="statuscont">
                    <div id="itemtranslated" class="translated" style="width: ${item.translated}%;"></div>
                    <div id="itemapproved" class="approved" style="width: ${item.approved}%;"></div>
                    <div class="percentage">${item.translated}% ✏️ ${item.approved}% ✅</div>
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
    });

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(updatedItems));

    // Update values in the UI
    $(`#${itemId} .${field}`).css('width', `${value}%`);
    $(`#${itemId} .percentage`).html(`${updatedItems.find(item => item.id === itemId).translated}% ✏️ ${updatedItems.find(item => item.id === itemId).approved}% ✅`);
}

function updateItemValues(itemId, translated, approved) {
    // Update values in the UI
    $(`#${itemId} .translated`).css('width', `${translated}%`);
    $(`#${itemId} .approved`).css('width', `${approved}%`);
    $(`#${itemId} .percentage`).html(`${translated}% ✏️ ${approved}% ✅`);

    // Update values in the local storage
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];
    var updatedItems = storedItems.map(function (item) {
        if (item.id === itemId) {
            return { ...item, translated, approved };
        }
        return item;
    });

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(updatedItems));
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

