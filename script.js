var idCounter = 1; // Initialize a counter for unique IDs
var burgerMenuState;
var invisibleColorFieldValue;

const standardSettings = {
    borderRadiusValue: '10', // Example default value
    imageGapValue: '20', // Example default value
    CardBackground: '#000000', // Example default value
    ColorText: '#ffffff', // Example default value
    backgroundImage: 'https://i.imgur.com/ukZ8NJu.png', // Default background image URL
    backgroundColor: '#26292f' // Default background color
};



// Call the function with the desired scale value

function resetBurgerMenuStyles() {
    // Reset burger menu styles using standardSettings
    $('#border-radius').val(standardSettings.borderRadiusValue);
    $('#imageGap').val(standardSettings.imageGapValue);
    $('#CardBackground').val(standardSettings.CardBackground);
    $('#ColorText').val(standardSettings.ColorText);
    $('#backgroundImage').val(standardSettings.backgroundImage);
    $('#backgroundColor').val(standardSettings.backgroundColor);
    applyBurgerMenuStyles(); // Apply styles after resetting
    SettingsavesToLocalStorage(); // Save settings after resetting
    loadSettingsFromLocalStorage();


}


window.addEventListener('load', function() {
    // Call the applyBurgerMenuStyles function when the page is loaded
    applyBurgerMenuStyles();
    updateUIContainerSize(0.43);

});

// Load items from localStorage on page load
$(document).ready(function () {
    loadSettingsFromLocalStorage();
    applyBurgerMenuStyles();

    

        // Listener for changes in the backgroundImage input field
    $('#backgroundImage').on('input', function() {
        var backgroundImageUrl = $(this).val(); // Get the value of the backgroundImage input field
        $('#uiContainer').css('background-image', 'url(' + backgroundImageUrl + ')'); // Set the background image of #uiContainer
        saveSettingsToLocalStorage();
    });

    $('#backgroundColor').on('input', function () {
        var backgroundColor = $(this).val(); // Get the value of the backgroundColor input field
        $('#uiContainer').css('background-color', backgroundColor); // Set the background color of #uiContainer
        saveSettingsToLocalStorage();
    })
    
    // Event listener for clicking on the RemoveBackground div
    $('#RemoveBackground').on('click', function () {
        RemoveBackground();
        saveSettingsToLocalStorage();
    });

    $('#RemoveBackgroundColor').on('click', function () {
        RemoveBackgroundColor();
        saveSettingsToLocalStorage();
    });

    function RemoveBackgroundColor() {
        // Clear the value of the backgroundColor input field
        $('#backgroundColor').val('none');
        // Remove the background color from the uiContainer
        $('#uiContainer').css('background-color', 'none');
        // Save the updated settings to local storage
        saveSettingsToLocalStorage();
    }
    
    // Event listener for input changes in the translatedchange and approvedchange fields
$('#translatedchange, #approvedchange', '#translatedchange', '#approvedchange').on('input', function () {
    var inputValue = parseInt($(this).val()); // Get the input value and parse it as an integer
    if (isNaN(inputValue)) {
        // If the input is not a number, set the value to 0
        $(this).val(0);
    } else {
        // If the input is a number, ensure it is within the range 0-100
        inputValue = Math.min(Math.max(inputValue, 0), 100);
        $(this).val(inputValue); // Update the input value with the corrected value

        // Update the value in memory
        var itemId = $(this).closest('.removecont').attr('id');
        var field = $(this).attr('id').replace('change', ''); // Get the field name (translated or approved)
        updateMemoryValues(itemId, field, inputValue);

        // Update the values in the #perctext field
        updatePerctext();
    }
});



    function RemoveBackground() {
        // Clear the value of the backgroundImage input field
        $('#backgroundImage').val('none');
        // Remove the background image from the uiContainer
        $('#uiContainer').css('background-image', 'none');
        // Save the updated settings to local storage
        saveSettingsToLocalStorage();
    }

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
        uiBackgroundImage: $('#UIBackground').val(),
        uiBackgroundColor: $('#backgroundColor').val()
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
        uiBackgroundImage: $('#UIBackground').val(),
        uiBackgroundColor: $('#backgroundColor').val()
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

function updateCardSize(scaleValue) {
    // Calculate the width and height of the card based on the scale value
    var cardWidth = scaleValue * 290; // Assuming the initial width of the card is 270px
    var cardHeight = scaleValue * 105; // Assuming the initial height of the card is 100px

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

    // Calculate border-radius for the .statuscont, .approved, and .translated elements
    var statusContBorderRadius = scaleValue * 5; // Adjust as needed
    $('.statuscont, .approved, .translated').css('border-radius', statusContBorderRadius + 'px');

    // Calculate margin for the .statuscont, .approved, and .translated elements
    var statusContMargin = scaleValue * 5; // Adjust as needed
    $('.statuscont').css('margin', statusContMargin + 'px ' + statusContMargin + 'px');

    // Update the height of the .statuscont element
    var statusContHeight = scaleValue * 20; // Adjust as needed
    $('.statuscont').css('height', statusContHeight + 'px');

    // Save the scale value to localStorage
    localStorage.setItem('cardScaleValue', scaleValue);
    saveSettingsToLocalStorage();
}


// Function to apply burger menu styles and update card size
function applyBurgerMenuStyles() {
    // Get the current form values
    
    var currentBorderRadius = $('#border-radius').val() + 'px';
    var currentImageGap = $('#imageGap').val() + 'px'; // Get the value of imageGap
    var currentCardBackgroundColor = $('#CardBackground').val();
    var currentColorText = $('#ColorText').val(); // Get the ColorText value
    var currentBackgroundImage = $('#backgroundImage').val(); // Get the background image URL
    var currentBackgroundColor = $('#backgroundColor').val(); // Get the background color value

    // Update the span elements with the current values
    $('.settingsradius').text($('#border-radius').val()); // Update span with border-radius value
    $('.settingsimageGap').text($('#imageGap').val()); // Update span with imageGap value
    $('.settingssize').text($('#cardSize').val()); // Update span with imageGap value

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

    // Check if backgroundImage is set to "none"
    if (currentBackgroundImage === 'none' || '') {
        $('#uiContainer').css('background-image', 'none');
        $('#uiContainer').css('background-color', currentBackgroundColor);
    } else {
        $('#uiContainer').css('background-image', 'url(' + currentBackgroundImage + ')');
    }

    // Trigger updateCardSize
    var scaleValue = $('#cardSize').val() / 100; // Convert slider value to scale value (0-1)
    updateCardSize(scaleValue); // Update card size
    var textPercentage = scaleValue * 100; // Calculate the percentage for the text size
    $('.percentage').css('font-size', textPercentage + '%'); // Set the font size of the percentage text dynamically
    updatePerctext();
}






// Event listener for the input event on the #imageGap slider
$('#imageGap').on('input', function () {
    applyBurgerMenuStyles(); // Update styles when imageGap slider value changes
    saveSettingsToLocalStorage(); // Save settings when imageGap changes
});


function saveSettingsToLocalStorage() {
    // Initialize an object to store all settings
    var allSettings = {};

    // Get values from form fields
    allSettings.settings = {
        borderRadiusValue: $('#border-radius').val(),
        imageGapValue: $('#imageGap').val(),
        cardSizeValue: $('#cardSize').val(),
        CardBackground: $('#CardBackground').val(), // Store CardBackground value
        ColorText: $('#ColorText').val(), // Store ColorText value
        backgroundImage: $('#backgroundImage').val(), // Store backgroundImage URL
        backgroundColor: $('#backgroundColor').val() // Store backgroundColor
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
        $('#backgroundImage').val(settings.backgroundImage); // Update backgroundImage input field
        $('#backgroundColor').val(settings.backgroundColor); // Update backgroundColor input field

        // Set the cardSize slider position
        if (settings.cardSizeValue) {
            $('#cardSize').val(settings.cardSizeValue).trigger('input');
        } else {
            // Set a default value if cardSizeValue is not present
            $('#cardSize').val(50).trigger('input');
        }

        // Apply the background image to the uiContainer
        if (settings.backgroundImage) {
            $('#uiContainer').css('background-image', 'url(' + settings.backgroundImage + ')');
        } else {
            // If no custom background image is found, use the default background image URL
            $('#uiContainer').css('background-image', 'url(' + standardSettings.backgroundImage + ')');
        }

        applyBurgerMenuStyles(); // Apply styles after loading settings
    } else {
        // If no settings are found, use standardSettings
        $('#border-radius').val(standardSettings.borderRadiusValue);
        $('#imageGap').val(standardSettings.imageGapValue);
        $('#CardBackground').val(standardSettings.CardBackground); // Update CardBackground input field
        $('#ColorText').val(standardSettings.ColorText); // Update ColorText input field
        $('#backgroundImage').val(standardSettings.backgroundImage); // Set backgroundImage input field to default value
        $('#backgroundColor').val(standardSettings.backgroundColor); // Set backgroundColor input field to default value

        $('#cardSize').val(50).trigger('input');

        // Apply the default background image to the uiContainer
        $('#uiContainer').css('background-image', 'url(' + standardSettings.backgroundImage + ')');

        applyBurgerMenuStyles(); // Apply styles after loading standard settings
    }
}

$('.removeobj').on('input', '.title-edit-input', function () {
    var itemId = $(this).closest('.removecont').attr('id');
    var newTitle = $(this).val(); // Get the new title from the input field

    // Update the title in the UI
    $('#' + itemId + ' .itemtitlecont .title').text(newTitle);

    // Update the title in local storage
    updateItemTitleInLocalStorage(itemId, newTitle);

    // Update the values in the #perctext field
    updatePerctext();
});


// Event listener for input changes in the #titlechange field
$('#titlechange').on('input', function () {
    var itemId = $(this).closest('.removecont').attr('id');
    var newTitle = $(this).val(); // Get the new title from the input field

    // Update the title in the UI
    $('#' + itemId + ' .itemtitlecont .title').text(newTitle);

    // Update the title in local storage
    updateItemTitleInLocalStorage(itemId, newTitle);
});


function updateItemTitleInLocalStorage(itemId, newTitle) {
    // Retrieve items from local storage
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];

    // Update the title of the corresponding item in local storage
    storedItems.forEach(function (item) {
        if (item.id === itemId) {
            item.title = newTitle; // Update the title
        }
    });

    // Save the updated items back to local storage
    localStorage.setItem('storedItems', JSON.stringify(storedItems));
    updatePerctext();
    updateItems();
    applyBurgerMenuStyles(); // Apply styles after loading standard settings

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

    // Update the perctext block
    updatePerctext();
    applyBurgerMenuStyles();
}

function updatePerctext() {
    // Clear the contents of the #perctext block
    var perctext = document.getElementById('perctext');
    perctext.innerHTML = '';

    // Load items from local storage and update the #perctext block
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];
    storedItems.forEach(function (item) {
        // Set default title if item title is not provided
        var title = item.title ? item.title : 'Невідомо';

        var duplicatePercentages = `${item.translated}%✏️ ${item.approved}%✅`;
        perctext.innerHTML += `<div>${title}: ${duplicatePercentages}</div>`;
    });
}


function updateItems() {
    // Clear the contents of the #images div
    $('#images').empty();
    $('.removeobj').empty();

    // Load items from local storage and display them
    loadItemsFromLocalStorage();
    updatePerctext();
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
    var newItemId = 'id_' + idCounter;

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
    // Set default image if item image is not provided
    var itemImage = item.image ? item.image : 'https://i.imgur.com/klcspz6.png';

    // Set default title if item title is not provided
    var title = item.title ? item.title : 'Невідомо';

    // Create the HTML content for the new item
    var newItemHTML = `
        <div id="${item.id}" class="itemcontainer">
            <div class="itemtitlecont">
                <div class="itemimage" style="background: url('${itemImage}');"></div>
            </div>
            <div class="iteminfocont">
            <div class="infocont">
                <div id="itemtitle" class="title">${title}</div>
                <div class="statuscont">
                    <div class="statused">
                        <div id="itemtranslated" class="translated" style="width: ${item.translated}%;"></div>
                        <div id="itemapproved" class="approved" style="width: ${item.approved}%;"></div>
                    </div>
                </div>
                <div class="percentagecont">
                    <div class="percentage">${item.translated}% ✏️ ${item.approved}% ✅</div>
                </div>
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
                    <div class="itemimage" style="background: url('${itemImage}');"></div>
                    <div>${item.id}</div>
                </div>
            </div>
            </div>
            <label for="titlechange">Назва:</label>
            <input type="text" id="titlechange" class="title-edit-input" onchange="updateItemTitleInLocalStorage('${item.id}', this.value)" value="${title}">        
            <label for="translated">✏️ Перекладено:</label>
            <input id="translatedchange" type="number" min="0" max="100" class="translated-input form__label" value="${item.translated}" onchange="updateMemoryValues('${item.id}', 'translated', this.value)">
            <label for="approved">✅ Затверджено:</label>
            <input id="approvedchange" type="number" min="0" max="100" class="approved-input form__label" value="${item.approved}" onchange="updateMemoryValues('${item.id}', 'approved', this.value)">
        </div>
    `;

    // Append the remove button to the "removeobj" div using innerHTML
    document.querySelector('.removeobj').innerHTML += removeButtonHTML;

    // Update the duplicated percentages
    var perctext = document.getElementById('perctext');
    var duplicatePercentages = `${item.translated}%✏️ ${item.approved}%✅`;
    perctext.innerHTML += `<div>${title}: ${duplicatePercentages}</div>`;
}



function copyTextToClipboard() {
    // Get the text content of the perctext block
    var perctext = document.getElementById('perctext');
    var textToCopy = perctext.innerText;

    // Create a temporary textarea element to hold the text to copy
    var textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    textarea.setAttribute('readonly', ''); // Ensure it's readonly to prevent modification

    // Set the position off-screen
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Append the textarea to the document body
    document.body.appendChild(textarea);

    // Select the text within the textarea
    textarea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the textarea from the document body
    document.body.removeChild(textarea);

    // Display the copied text temporarily
    var copiedTextDisplay = document.getElementById('copiedTextDisplay');
    copiedTextDisplay.classList.add('copied-text-display-visible');

    // After 2 seconds, hide the temporary display
    setTimeout(function() {
        copiedTextDisplay.classList.remove('copied-text-display-visible');
    }, 2000);
}





function updateMemoryValues(itemId, field, value) {
    // Ensure the value is not greater than 100
    value = Math.min(value, 100);
    
    // Update values in the local storage
    var storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];
    var updatedItems = storedItems.map(function (item) {
        if (item.id === itemId) {
            item[field] = value; // Update the field value
        }
        return item;
    });

    // Save the updated array back to local storage
    localStorage.setItem('storedItems', JSON.stringify(updatedItems));

    // Update values in the UI
    $(`#${itemId} .${field}`).css('width', `${value}%`);
    $(`#${itemId} .percentage`).html(`${updatedItems.find(item => item.id === itemId).translated}% ✏️ ${updatedItems.find(item => item.id === itemId).approved}% ✅`);
    updatePerctext();
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
            // Log the error for debugging
            console.error('Error capturing screenshot:', error);

            // Display an alert to the user about the error
            alert('Error capturing screenshot. Please check the console for more details.');
        });
}

function makeImage(uri) {
    // Add crossorigin.me proxy to the image URL
    const proxiedUrl = 'https://crossorigin.me/' + uri;

    return new Promise(function (resolve, reject) {
        // Create a new image element
        var image = new Image();

        // When the image loads successfully
        image.onload = function () {
            // Create a canvas element
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            // Set the canvas dimensions to match the image dimensions
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the image onto the canvas
            context.drawImage(image, 0, 0);

            // Manipulate the image (e.g., add something to it)
            context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Red semi-transparent rectangle
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Resolve the promise with the modified image
            resolve(canvas.toDataURL()); // Convert canvas to data URL and resolve the promise
        };

        // Handle errors when loading the image
        image.onerror = reject;

        // Set cross-origin attribute and load the image
        image.crossOrigin = 'Anonymous';
        image.src = proxiedUrl; // Use the proxied URL to fetch the image
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