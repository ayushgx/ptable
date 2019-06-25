$(document).ready(function () {

    var search_text_field = $('.snv-search-form__search-field');
    var result_items = $(".snv-search-results__list .search-item");

    //=====================================================
    // JSON FOR MENU-VALUE AND DATABASE-COLUMN-VALUE
    //used for eliminating if-else and dynamically calling the function with db value from here
    var menu_text_to_db_col = {
        'Name': 'name',
        'Element symbol': 'symbol',
        'Element number': 'id',
        'Year': 'year_discovered',
        'Weight': 'atomic_mass',
        'Density': 'density',
        'Conductivity': 'thermal_conductivity',
        'CAS Number': 'cas_number',
        'Electronegativity': 'electronegativity',
        'Atomic Radius': 'atomic_radius',
    } //=====================================================

    result_search('.search-item'); //by default search for all parameters...

    //sets the default choice val if not selected
    var choice_val = $('.search-parameter__choice-value').text();


    //gets the choice parameter to use in the keyup function of the search text field
    $('.parameter-menu__list-item').click(function () {
        choice_val = $('.search-parameter__choice-value').text();

        //sets the placeholder
        $('.snv-search-form__search-field').attr('placeholder', 'Enter ' + choice_val.toLowerCase())

        //if choice_val == All parameters, Name, Element symbol, Weight, then do not fetch these values from the database
        //as we already have these values in the results itself by default
        if (choice_val == 'All parameters') {
            result_search('.search-item');
        } else if (choice_val == 'Name') {
            result_search('.element-name');
        } else if (choice_val == 'Element symbol') {
            result_search('.search-item__element-symbol');
        } else if (choice_val == 'Weight') {
            result_search('.element-mass');
        } else {
            //if other value is selected then load it from the DB
            load_and_search_element_data(menu_text_to_db_col[choice_val], true); //remove this true
        }
    })

    //handles the clear input (cross) button
    $('.snv-search-form__clear-btn').click(function () {
        $('.search-item').css('display', 'flex');
        $('.snv-search-results__no-result').removeClass('show');
    })

    /*
    Function to search for either data-attributes or text of an element with selector 
        * by default search for element text: e.g: result_search('.element');
            => selector = any normal css selector
        * to search for data attributes pass 'true' as second arguement: e.g: result_search('foo', true); for data-foo
            => selector = data attribute value
    */
    function result_search(selector, search_data_values=false) {
        search_text_field.on("keyup", function () {
            var input_value = $(this).val().toLowerCase();

            result_items.filter(function () {
                if(search_data_values) var x = (""+$(this).data(selector)).toString().toLowerCase();
                else var x = $(this).find(selector).text().toLowerCase(); //default object already present in each search (name, symbol, mass)
                if(selector=='.search-item') var x = $(this).text().toLowerCase();
                $(this).toggle(x.indexOf(input_value) != -1)
            });
            //handles the displaying of the error screen
            if (result_items.children(':visible').length == 0) {
                $('.snv-search-results__no-result').addClass('show');
            } else {
                $('.snv-search-results__no-result').removeClass('show');
            }
        })
    }

    function manage_col_data_response(json_data, db_col_name) {
        result_items.each(function (index, obj) {
            $(obj).attr('data-' + db_col_name, json_data[index][db_col_name])
        })
    }

   function load_and_search_element_data(db_col_name) {

        if (!result_items.data(db_col_name)) { //to stop any unnecessary requests
            //sets the data attribute of each result element
            $.ajax({
                type: "POST",
                url: "includes/get-element-data.php",
                data: {
                    col_name: db_col_name
                },
                dataType: 'json',
                beforeSend: function () {
                    console.log("show");
                    $('.snv-search-results__skeleton-loader').fadeIn(100);
                },
                complete: function () {
                    console.log("hide");
                    $('.snv-search-results__skeleton-loader').fadeOut(100);
                },
                success: function (response) {
                    manage_col_data_response(response, db_col_name);
                    result_search(db_col_name, true);
                }
            })
        }
        else 
        result_search(db_col_name, true); //true passed for search in data
    }

})