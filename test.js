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
    var itemImageSize = scaleValue * 90; // Assuming the initial size of the item image is 100px
    var itemTitleFontSize = scaleValue * 16; // Assuming the initial font size of the item title is 16px
    var percentageFontSize = scaleValue * 14; // Assuming the initial font size of the percentage text is 14px

    // Apply dimensions to elements inside the card
    $('.images .itemimage').css('width', itemImageSize + 'px'); // Set the width of the item image
    $('.images .itemimage').css('height', itemImageSize + 'px'); // Set the height of the item image
    $('.images .title').css('font-size', itemTitleFontSize + 'px'); // Set the font size of the item title
    $('.percentage').css('font-size', percentageFontSize + 'px'); // Set the font size of the percentage text
    $('percentage').css('border-radius', percentageFontSize + 'px');

    // Update the height of the .statuscont element
    var statusContHeight = scaleValue * 20; // Adjust as needed
    $('.statuscont').css('height', statusContHeight + 'px');

    // Save the scale value to localStorage
    localStorage.setItem('cardScaleValue', scaleValue);
    saveSettingsToLocalStorage();
}