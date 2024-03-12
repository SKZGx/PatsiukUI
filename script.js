var idCounter = 1; // Initialize a counter for unique IDs
var burgerMenuState;



// Load items from localStorage on page load
$(document).ready(function () {
    loadSettingsFromLocalStorage();
    applyBurgerMenuStyles();

    var isImageBackground = true;

    var currentBackgroundColor = '#26292fcc'; // Initialize the variable

    
// Call saveSettingsToLocalStorage() within your existing event listeners
$('#backgroundSwitch').on('change', function () {
    updateUIBackgroundInput();
    resetBackground();
    applyBurgerMenuStyles();
    saveSettingsToLocalStorage(); // Save settings when background switch changes
});

// Event listener for UIBackground input change
$('#UIBackground').on('input', function () {
    currentBackgroundColor = $(this).val();
    applyBurgerMenuStyles();
    saveSettingsToLocalStorage(); // Save settings when UIBackground changes
});
    
function loadSettingsFromLocalStorage() {
    // Load relevant settings from local storage
    isImageBackground = localStorage.getItem('isImageBackground') === 'true';
    currentBackgroundColor = localStorage.getItem('currentBackgroundColor') || '#26292fcc';
    var backgroundSwitchState = localStorage.getItem('backgroundSwitchState');

    if (backgroundSwitchState !== null) {
        $('#backgroundSwitch').prop('checked', backgroundSwitchState === 'true');
    }
    


    var borderRadiusValue = localStorage.getItem('borderRadiusValue') || '0';
    var imageGapValue = localStorage.getItem('imageGapValue') || '0';

    // Set the values to the corresponding elements
    $('#border-radius').val(borderRadiusValue);
    $('#imageGap').val(imageGapValue);

    // Update UI based on loaded settings
    updateBackgroundTypeLabel();
    updateUIBackgroundInput();
    resetBackground();
    applyBurgerMenuStyles();
}


function saveSettingsToLocalStorage() {
    localStorage.setItem('isImageBackground', isImageBackground);
    localStorage.setItem('currentBackgroundColor', currentBackgroundColor);
    localStorage.setItem('backgroundSwitchState', $('#backgroundSwitch').prop('checked'));
    localStorage.setItem('borderRadiusValue', $('#border-radius').val());
    localStorage.setItem('imageGapValue', $('#imageGap').val());
    // Add more settings as needed
    // ...

}

// Call saveSettingsToLocalStorage() within your existing event listeners
$('#border-radius, #imageGap').on('input', function () {
    updateBurgerMenuState();
    applyBurgerMenuStyles();
    saveSettingsToLocalStorage(); // Save settings when border-radius or imageGap changes
});

// Function to reset the background based on the switch state and UIBackground value
function resetBackground() {
    var defaultBackgroundColor = '#26292fcc'; // Set your default color here
    var defaultBackgroundImage = 'https://i.imgur.com/ukZ8NJu.png'; // Set your default image here

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
}

    // Call updateUIBackgroundInput initially to set the default input type
updateUIBackgroundInput();
// Call resetBackground initially to set the default background
resetBackground();
// Apply styles after setting the default input type and background
applyBurgerMenuStyles();

    // Function to update switch label based on the current state
    function updateBackgroundTypeLabel() {
        var switchLabel = isImageBackground ? 'Зображення' : 'Колір';
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

    $('#UIBackground').val('#26292fcc');
    $('#UIBackground').val('https://i.imgur.com/ukZ8NJu.png');



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

// Update the applyBurgerMenuStyles function to include the resetBackground call
function applyBurgerMenuStyles() {
    // Get the current form values
    var currentBorderRadius = $('#border-radius').val() + 'px';
    var currentCardBackgroundColor = $('#CardBackground').val();
    var currentUiBackground = $('#UIBackground').val();

    // Apply styles only if they have changed
    if (currentBorderRadius !== $('.itemcontainer').css('border-radius')) {
        $('.itemcontainer').css('border-radius', currentBorderRadius);
    }

    // Get the current value of the image gap slider
    var currentImageGap = $('#imageGap').val() + 'px';

    // Apply styles only if they have changed
    if (currentImageGap !== $('.images').css('gap')) {
        $('.images').css('gap', currentImageGap);
    }

    if (currentCardBackgroundColor !== $('.itemcontainer').css('background-color')) {
        $('.itemcontainer').css('background-color', currentCardBackgroundColor);
    }

    // Check the state of the backgroundSwitch
    if ($('#backgroundSwitch').prop('checked')) {
        // If switch is checked, set background as image
        var currentUiBackgroundImage = 'url(' + currentUiBackground + ')';
        if (currentUiBackgroundImage !== $('.UI').css('background')) {
            $('.UI').css('background', currentUiBackgroundImage);
        }
    } else {
        // If switch is not checked, set background as color
        var backgroundColorToApply = currentUiBackground ? currentUiBackground : '#26292fcc';
        if (backgroundColorToApply !== $('.UI').css('background-color')) {
            $('.UI').css('background-color', backgroundColorToApply);
        }
    }
}

// Call resetBackground initially to set the default background
resetBackground();
// Apply styles after setting the default background
applyBurgerMenuStyles();



function resetBurgerMenuStyles() {
    // Reset only specific styles when resetting burger menu
    $('.itemcontainer').css('border-radius', ''); // Reset to default
    $('#CardBackground').val(''); // Reset input value for card background color
    $('#UIBackground').val(''); // Reset input value for UI background image
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
                <div class="title">${item.title}</div>
                <div class="statuscont">
                    <div class="translated" style="width: ${item.translated}%;"></div>
                    <div class="approved" style="width: ${item.approved}%;"></div>
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
                <div class="removebtn" data-itemid="${item.id}" title="remove" onclick="removeItem('${item.id}')">
                    <i class="emoji em-delete"></i>
                </div>
                <div>${item.title}</div>
            </div>
            <input type="number" class="approved-input" value="${item.approved}" placeholder="Затверджено" onchange="updateMemoryValues('${item.id}', 'approved', this.value)">
            <input type="number" class="translated-input" value="${item.translated}" placeholder="Перекладено" onchange="updateMemoryValues('${item.id}', 'translated', this.value)">
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

