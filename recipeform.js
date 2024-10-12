
// document.addEventListener("DOMContentLoaded", function() {
//     const recipeForm = document.getElementById('recipeForm');
    
//     recipeForm.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission
//         // Handle form data and update local storage
//         const recipeImage = document.getElementById('recipeImage').files[0];
//         const recipeName = document.getElementById('recipeName').value;
//         const ingredients = document.getElementById('ingredients').value;
//         const instructions = document.getElementById('instructions').value;
        
//         if (recipeName && recipeImage && ingredients && instructions) {
//             const newRecipe = {
//                 name: recipeName,
//                 image: URL.createObjectURL(recipeImage), // Convert the file to a URL
//                 ingredients: ingredients,
//                 instructions: instructions
//             };
//             let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
//             userRecipes.push(newRecipe);
//             localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
//             window.location.href = "index.html"; // Redirect after successful addition
//         } else {
//             alert("Please fill in all the details.");
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
    const recipeForm = document.getElementById('recipeForm');
    
    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const recipeImage = document.getElementById('recipeImage').files[0];
        const recipeName = document.getElementById('recipeName').value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;
        
        if (recipeName && recipeImage && ingredients && instructions) {
            const reader = new FileReader();
            reader.onloadend = function() {
                const newRecipe = {
                    name: recipeName,
                    image: reader.result, // Store the Base64 string
                    ingredients: ingredients,
                    instructions: instructions
                };
                let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
                userRecipes.push(newRecipe);
              
                localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
                alert("Recipe added successfully")
                window.location.href = "index.html"; // Redirect after successful addition
            };
            reader.readAsDataURL(recipeImage); // Convert the image to a Base64 string
        } else {
            alert("Please fill in all the details.");
        }
    });
});
