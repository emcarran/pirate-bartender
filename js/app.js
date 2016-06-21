// contains all ingredients available to creat the drink. //array of flavor objects
var pantry = {
    strong: ["glug of rum", "slug of whisky", "splash of gin"],
    salty: ["olive on a stick", "salt-dusted rim", "rasher of bacon"],
    bitter: ["shake of bitters", "splash of tonic", "twist of lemon peel"],
    sweet: ["sugar cube", "spoonful of honey", "splash of cola"],
    fruity: ["slice of orange", "dash of cassis", "cherry on top"]
};

var Order = function (orderValues) {
    // Pulls values from the DOM.
    this.strong = orderValues[0];
    this.salty = orderValues[1];
    this.bitter = orderValues[2];
    this.sweet = orderValues[3];
    this.fruity = orderValues[4];
};
var Drink = function (pantry, dinkOrder) {
    var ingredientNumber,
        ingredientsArray = [];
    for (var userPreference in drinkOrder) {
        ingredientNumber = generateRandomNumber(0, 2);
        if (drinkOrder[userPreference]) {
            ingredientsArray.push(pantry[userPreference][ingredientNumber]);
        }
    }
    return ingredientsArray;
};

var toTitleCase = function (str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var generateRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// use if statements to piece together name conditionally based on the ingredients that comprise it
var drinkNamer = function (concoction) {
    var drinkNamerOutput = concoction[0].split(' ');
    return 'yer Sparkly ' + toTitleCase(drinkNamerOutput[drinkNamerOutput.length - 1]) + ' Grog,';
}


$(document).ready(function () {

    $('.output').hide(0);

    $('form').on('submit', function (event) {
        event.preventDefault();

        //set the empty orderValues array
        orderValues = [];

        //check if the each one of the ingredient types have been chosen and add that to the orderValues array;
        $('select').each(function () {
            orderValues.push($(this).val() == 'yes' ? true : false);
        });

        //use the 2 constructors to create 2 new objects
        drinkOrder = new Order(orderValues); // create new order from DOM
        concoction = new Drink(pantry, drinkOrder); // mix drink with Drink constructor

        //build the chosen ingredients from the ingredients array
        var buildTheHtmlOutput = '';
        $.each(concoction, function (key, value) {
            buildTheHtmlOutput += '<li>' + value + '</li>';
        });

        //show the output container
        $('.output').show();

        //populate it with the ingredients
        $('.output ul').html(buildTheHtmlOutput);

        // name the customer's beverage with drinkNamer();
        $('.output h3').html('Here be ' + drinkNamer(concoction) + ' ye scurvy scoundrel!');
    });
});
