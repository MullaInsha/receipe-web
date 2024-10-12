document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const addRecipeButton = document.getElementById('addRecipeButton');
    const recipeContainer = document.getElementById('recipeContainer');
    const recipeModal = document.getElementById('recipeModal');
    const recipeDetail = document.getElementById('recipeDetail');
    const closeModal = document.querySelector('.close');
    let name = document.querySelector("#userName");
    let RecipeOneUser = JSON.parse(localStorage.getItem("RecipeOneUser"));
    let logout = document.querySelector("#logout");

    // Initialize an array to hold user-submitted recipes
    let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
    userRecipes.pop();

    if (RecipeOneUser) {
        name.innerText = RecipeOneUser.first;
        logout.style.display = "inline-block";
    }

    logout.addEventListener("click", () => {
        localStorage.removeItem("RecipeOneUser");
        name.innerText = "";
        logout.style.display = "none";
    });

    // Function to fetch recipes based on search input
    function fetchRecipes(query) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                displayRecipes(data.meals, userRecipes);
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }

    // Function to display the recipes
    function displayRecipes(recipes, userRecipes) {
        recipeContainer.innerHTML = "";

        // Display API recipes
        if (recipes) {
            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');
                recipeCard.innerHTML = `
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                    <h3>${recipe.strMeal}</h3>
                `;
                recipeContainer.appendChild(recipeCard);
                recipeCard.addEventListener('click', function() {
                    showRecipeDetail(recipe);
                });
            });
        }

        // Display user-submitted recipes
        userRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
            `;
            recipeCard.addEventListener('click', function() {
                showRecipeDetail(recipe);
            });
            recipeContainer.appendChild(recipeCard);
        });

        // If no recipes found, display a message
        if (!recipes && userRecipes.length === 0) {
            recipeContainer.innerHTML = `<p>No recipes found.</p>`;
        }
    }

    // Function to show recipe details in a modal
    function showRecipeDetail(recipe) {
        recipeDetail.innerHTML = `
            <h2>${recipe.strMeal || recipe.name}</h2>
            <img src="${recipe.strMealThumb || recipe.image}" alt="${recipe.strMeal || recipe.name}" style="width:100%">
            <h3>Ingredients</h3>
            <ul>
                ${getIngredients(recipe).map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions</h3>
            <p>${recipe.strInstructions || recipe.instructions}</p>
        `;
        recipeModal.style.display = "block";
    }

    // Function to extract ingredients from the recipe object
    function getIngredients(recipe) {
        let ingredients = [];
        if (recipe.strIngredient1) {
            for (let i = 1; i <= 20; i++) {
                let ingredient = recipe[`strIngredient${i}`];
                let measure = recipe[`strMeasure${i}`];
                if (ingredient) {
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
        } else if (recipe.ingredients) {
            ingredients = recipe.ingredients.split(',').map(ingredient => ingredient.trim());
        }
        return ingredients;
    }

    // Event listener to close the modal
    closeModal.addEventListener('click', function() {
        recipeModal.style.display = "none";
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == recipeModal) {
            recipeModal.style.display = "none";
        }
    });

    // Event listener for search button
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            fetchRecipes(query);
        } 
        // else {
        //     recipeContainer.innerHTML = '';
        // }
    });

    // Event listener for "Add Your Recipe" button
    addRecipeButton.addEventListener('click', function() {
        if (RecipeOneUser) {
            window.location.href = "recipeform.html";
        } else {
            window.location.href = "login.html";
        }
    });
    document.addEventListener("DOMContentLoaded", function() {
        const recipeContainer = document.getElementById('recipeContainer');
    
        // Load user recipes from localStorage
        let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
    
        // Function to display the recipes
        function displayRecipes(userRecipes) {
            recipeContainer.innerHTML = "";
    
            // Display user-submitted recipes
            userRecipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h3>${recipe.name}</h3>
                `;
                recipeCard.addEventListener('click', function() {
                    showRecipeDetail(recipe);
                });
                recipeContainer.appendChild(recipeCard);
            });
    
            // If no recipes found, display a message
            if (userRecipes.length === 0) {
                recipeContainer.innerHTML = `<p>No recipes found.</p>`;
            }
        }
    
        // Call displayRecipes to show the user recipes on page load
        displayRecipes(userRecipes);
    });


    // Initial load of some recipes when the page loads
    fetchRecipes('chicken'); // This will load chicken recipes by default when the page loads
    displayRecipes([], userRecipes); // Display any user-submitted recipes
});
