const formContainer = document.getElementById("form-container")
const search = document.getElementById("search1");
// const search2 = document.getElementById("search2");
const submit = document.getElementById("submit1");
// const submit2 = document.getElementById("submit2");
const random = document.getElementById("random");
const chevronLeft = document.getElementById("chevron-left");
const byName = document.getElementById("by-name");
const byIngredient = document.getElementById("by-ingredient");
const chevronRight = document.getElementById("chevron-right");
const coctailsEl = document.getElementById("coctails");
const ingredientEl = document.getElementById("ingredients")
const resultHeading = document.getElementById("result-heading");
const single_coctailEl = document.getElementById("single-coctail-container");

// options moves 
// left 
function moveLeft() {
    console.log("123");

    if (!byName.classList.contains("btn-disabled")) {
        byIngredient.classList.remove("btn-disabled");
        byName.classList.add("btn-disabled");
        formContainer.innerHTML = `<form class="flex" id="submit2">
        <input type="text" id="search2" placeholder="Search by ingredient">
        <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
    </form>`;
        coctailsEl.innerHTML = "";
        resultHeading.innerHTML = "";

        // 04.05
        const submit2 = document.getElementById("submit2")
        submit2.addEventListener("submit", searchIngredient)

    } else if (!byIngredient.classList.contains("btn-disabled")) {
        random.classList.remove("btn-disabled");
        byIngredient.classList.add("btn-disabled");
        formContainer.innerHTML = ``;
        coctailsEl.innerHTML = "";
        resultHeading.innerHTML = "";
    } else if (!random.classList.contains("btn-disabled")) {
        byName.classList.remove("btn-disabled");
        random.classList.add("btn-disabled");
        formContainer.innerHTML = `<form class="flex" id="submit1">
        <input type="text" id="search1" placeholder="Search by name">
        <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
    </form>`;
        coctailsEl.innerHTML = "";
        resultHeading.innerHTML = "";
    }
}
// right
function moveRight() {
    console.log("321");

    if (!byName.classList.contains("btn-disabled")) {
        random.classList.remove("btn-disabled");
        byName.classList.add("btn-disabled");
        formContainer.innerHTML = ``;
        coctailsEl.innerHTML = "";
        resultHeading.innerHTML = "";
    } else if (!byIngredient.classList.contains("btn-disabled")) {
        byName.classList.remove("btn-disabled");
        byIngredient.classList.add("btn-disabled");
        formContainer.innerHTML = `<form class="flex" id="submit1">
        <input type="text" id="search1" placeholder="Search by name">
        <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
    </form>`;
        coctailsEl.innerHTML = "";
        resultHeading.innerHTML = "";
    } else if (!random.classList.contains("btn-disabled")) {
        byIngredient.classList.remove("btn-disabled");
        random.classList.add("btn-disabled");
        formContainer.innerHTML = `<form class="flex" id="submit2">
        <input type="text" id="search2" placeholder="Search by ingredient">
        <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
    </form>`;;
        coctailsEl.innerHTML = "";
        resultHeading.innerHTML = "";

        // 04.05
        const submit2 = document.getElementById("submit2")
        submit2.addEventListener("submit", searchIngredient)
    }
}

// input changers
function inputChangerByName() {
    formContainer.innerHTML = `<form class="flex" id="submit1">
    <input type="text" id="search1" placeholder="Search by name">
    <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
</form>`;

}

function inputChangerByIngredient() {
    formContainer.innerHTML = `<form class="flex" id="submit2">
    <input type="text" id="search2" placeholder="Search by ingredient">
    <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
</form>`;

    // 04.05
    const submit2 = document.getElementById("submit2")
    submit2.addEventListener("submit", searchIngredient)

}
// function inputChangerByName() {
//     formContainer.innerHTML = `<form class="flex" id="submit1">
//         <input type="text" id="search1" placeholder="Search by name">
//         <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
//     </form>`
// }

// function inputChangerByIngredient() {
//     formContainer.innerHTML = `<form class="flex" id="submit1">
//     <input type="text" id="search2" placeholder="Search by ingredient">
//     <button class="search-btn" type="submit"><i class="fas fa-search"></i></button>
// </form>`;
// }

// Search Coctail and Fetch API 
function searchCoctail(e) {
    e.preventDefault()

    // clear single coctail 
    single_coctailEl.innerHTML = "";

    // get search from input 
    const term = search.value;

    if (term.trim()) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h4> Search results for '${term}':</h4>`
                console.log(data);


                if (data.drinks === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again</p>`
                } else {
                    coctailsEl.innerHTML = data.drinks.map(drink =>
                            `<div class="coctail" data-coctailID="${drink.idDrink}">
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
                        <div class="coctail-info" data-coctailID="${drink.idDrink}">
                        <h4>${drink.strDrink}</h4>
                        </div>
                        </div>`)
                        .join("")
                }
            })
        // clear search value 
        search.value = "";
    }
}

// fetch random coctail by ID 
function getDrinkByID(drinkId) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}
`)
        .then(res => res.json())
        .then(data => {
            const drink = data.drinks[0];

            addDrinkToDOM(drink)
        })
}
// Add Drink to the DOM 
function addDrinkToDOM(drink) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        if (drink[`strIngredient${i}`]) {
            ingredients.push(`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`)
        } else {
            break
        }
    }
    single_coctailEl.innerHTML = `
    <button class="close-btn" id="close">
    <i class="fa fa-times"></i>
 </button>
<div class="single-coctail">
<h2>${drink.strDrink}</h2>
<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
<div class="single-coctail-info">
${drink.strCategory ? `<h3>${drink.strCategory}</h3>` : ""}
${drink.strAlcoholic ? `<h3>${drink.strAlcoholic}</h3>` : ""}
</div>
<h3>Ingredients</h3>
<ul>
${ingredients.map(ing=> `<li>${ing}</li>`).join('')}
</ul>
<div class="main"><p>${drink.strInstructions}</p>
</div>
</div>`


}

// fetch random coctail from API 
function getRandomDrink() {
    coctailsEl.innerHTML = "";
    resultHeading.innerHTML = "";

    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(res => res.json()).then(data => {
        const drink = data.drinks[0]

        addDrinkToDOM(drink)
    })
}

// fetch ingredients 
function searchIngredient(e) {
    e.preventDefault()
    // console.log("searchIngredient");
    // clear single coctail 
    single_coctailEl.innerHTML = "";

    const search2 = document.getElementById("search2");
    // get search from input 
    const term = search2.value;

    console.log(term);

    if (term.trim()) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h4> Search results for '${term}':</h4>`
                console.log(data);

                if (data.drinks === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again</p>`
                } else {
                    coctailsEl.innerHTML = data.drinks.map(drink =>
                            `<div class="coctail" data-coctailID="${drink.idDrink}">
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
                        <div class="coctail-info" data-coctailID="${drink.idDrink}">
                        <h4>${drink.strDrink}</h4>
                        </div>
                        </div>`)
                        .join("")
                }

                // wyszukiwarka skladników 
                // if (data.ingredients === null) {
                //     resultHeading.innerHTML = `<p>There are no search results. Try again</p>`
                // } else {
                //     ingredientEl.innerHTML = data.ingredients.map(ingredient =>
                //             `<div class="ingredient" data-ingredientID="${ingredient.idIngredient}">
                //          <div class="ingredient-info" data-ingredientID="${ingredient.idIngredient}">
                //          <img src="https://www.thecocktaildb.com/images/ingredients/${term}.png"/>
                //          <h4>${ingredient.strIngredient}</h4>
                //          <p>Alcoholic: ${ingredient.strAlcohol}</p>
                //          <p>Vol: ${ingredient.strABV}</p>
                //          <p>Description</p>
                //          <p>${ingredient.strDescription}</p>
                //          </div>
                //          </div>`)
                //         .join("")
                // }
            })
        // clear search value 
        search.value = "";
    }

}

// Event Listener 
chevronLeft.addEventListener("click", moveLeft);
chevronRight.addEventListener("click", moveRight);
submit.addEventListener("submit", searchCoctail);
random.addEventListener("click", getRandomDrink);
byName.addEventListener("click", inputChangerByName)
byIngredient.addEventListener("click", inputChangerByIngredient)
coctailsEl.addEventListener("click", e => {
    const drinkInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('coctail');
        } else {
            return false
        }

    });
    if (drinkInfo) {
        const drinkId = drinkInfo.getAttribute("data-coctailID")
        getDrinkByID(drinkId)
    }
})
// link do skladników 
// https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

// przesuwanie po kliknieciu w drink do góry do pozycji

// wyswietlanie do 10 pozycji 

// klikniecie w skladnik 

// potwierdzenie wieku 