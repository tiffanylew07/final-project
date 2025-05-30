@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital@1&display=swap'); 
/* this is our font
 */
body {
    background: #ffccb3; 
    font-family: 'Courier Prime', monospace;
/*     contols the color of the background to match the theme */
/*   also include the font style we choose */
}

.stopwatch {
    width: 90%;
    max-width: 600px;
    background-image: url("https://img.freepik.com/free-vector/flat-abstract-doodle-background_23-2149336498.jpg?w=360");
    background-size: cover;
    background-position: center;
    text-align: center;
    padding: 40px 0;
    color: #A94064;
    margin: 100px auto 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
/*   this affecrs the output of how the stopwatch looks like in size, width and the image we choose */
}

.stopwatch h1 {
    margin-top: 60px;
    font-size: 62px;
    font-weight: 300;
/*   it affects between the placement of the image and stopwatch numbers that s display on top */
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: center;
/*   this affects how we display our buttons to be centered  */
}

.buttons img {
    width: 50px;
    margin: 0 20px;
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.2s ease;
/*   helps to be able to click on the buttons to start, reset, pause etc but using the pointer on our keyboard */
}

.buttons img:hover {
    transform: scale(1.1);
/*   hover with our keyboard to click on image, makes our images bigger when its hover above */
}

.buttons img:nth-child(2) {
    width: 80px;
/*   makes the play button bigger than the rest */
}
