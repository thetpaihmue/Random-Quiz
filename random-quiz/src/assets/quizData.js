import menuData from '../assets/menu.json'; // Adjust the path as necessary

const generateQuizData = () => {
  const quizData = [];

  menuData.forEach(category => {
    category.items.forEach(item => {
      const question = `What are in ${item.name}?`;
      const description = item.description || ''; // Handle case if there's no description
      const ingredients = description.split(/,| and /).map(ingredient => ingredient.trim()).filter(Boolean); // Filter out empty strings
      
      // If there are no ingredients, skip creating a question
      if (ingredients.length === 0) {
        return; // Skip this item as it has no valid ingredients
      }

      // Generate incorrect options
      const incorrectOptions = [
        "crunch",
        "vinegar",
        "fried shrimp",
        "bell pepper",
      ];
      
      // Randomly select 2 incorrect options, ensuring they are unique
      const selectedIncorrectOptions = [];
      while (selectedIncorrectOptions.length < 2) {
        const randomOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        if (!selectedIncorrectOptions.includes(randomOption) && !ingredients.includes(randomOption)) { // Ensure no overlap
          selectedIncorrectOptions.push(randomOption);
        }
      }

      // Combine correct answers and the selected incorrect options
      const options = [...ingredients, ...selectedIncorrectOptions];

      // Shuffle options to randomize their order
      const shuffledOptions = options.sort(() => Math.random() - 0.5);
      
      quizData.push({
        question,
        options: shuffledOptions, // All correct answers + 2 incorrect
        correctAnswers: ingredients,
      });
    });
  });

  return quizData;
};

const quizData = generateQuizData();

export default quizData;
