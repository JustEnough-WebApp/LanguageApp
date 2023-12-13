// array containing all navbar link names
const navLinks = ["aHome", "aAbout", "aLearn", "aFlashcard", "aMatching", "aQuizzes", "aDictionary"];

// array containing all page titles
const titles = ["Just Enough", "About Us", "Learn", "Flashcards", "Matching Game", "Quizzes", "Dictionary"]


function toggleActiveLink() {
    for (let i = 0; i < navLinks.length; i++) {
        if (document.title === titles[i]) {
            document.getElementById(navLinks[i]).className = "nav-link active";
        
        } else {
            document.getElementById(navLinks[i]).className = "nav-link";
        }


       
    }
}

toggleActiveLink()