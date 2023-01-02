var slides = document.querySelectorAll(".slides > div");
        var currentSlide = 0;
        
        // attach function to prev button click event
        document.getElementById("prev-button").addEventListener("click", function() {
            // hide current slide
            slides[currentSlide].style.display = "none";
        
            // decrement current slide index
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        
            // show new current slide
            slides[currentSlide].style.display = "flex";
        });
        
        // attach function to next button click event
        document.getElementById("next-button").addEventListener("click", function() {
            // hide current slide
            slides[currentSlide].style.display = "none";
        
            // increment current slide index
            currentSlide = (currentSlide + 1) % slides.length;
        
            // show new current slide
            slides[currentSlide].style.display = "flex";
        });