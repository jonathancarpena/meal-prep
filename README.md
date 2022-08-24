
# Nathan's Meal Prep

> A web app created for client that displays information about their company and products. Application also features a content managing system and ordering system.
> <a href="https://nathansmealprep.netlify.app/" target="_blank" rel="noopener noreferrer">Visit Here 🔗</a>
## Screenshots


<ul style="display:flex flex-direction:column">
<img src="./screenshots/landing.PNG" width="690" height="375" alt="landing"> 
<img src="./screenshots/meals.PNG" width="690" height="375" alt="meals">
<img src="./screenshots/single-meal.PNG" width="690" height="375" alt="single-meal">    
<img src="./screenshots/admin-orders.PNG" width="690" height="375" alt="admin-orders">  
<img src="./screenshots/admin-meals.PNG" width="690" height="375" alt="admin-meals">  
</ul>

### Mobile Design
<ul style="display:flex">
<img src="./screenshots/mobile-landing.PNG" width="173" height="361" alt="mobile-landing">  
<img src="./screenshots/mobile-meals.PNG" width="173" height="361" alt="mobile-meals">  
<img src="./screenshots/mobile-single-meal.PNG" width="173" height="361" alt="mobile-single-meal">   
</ul>



## Demo

Insert gif or link to demo


## Technologies

### Front End:
- React
- React Router
- Redux/Redux Toolkit
- Tailwind CSS
- Axios
- Netlify

### Back End: 
- MongoDB
- Express
- Node.js
- Firebase
- Heroku
- jsonwebtoken
- bcrypt




## Features

- Content Management System for Admin
    - Create/add new products to their menu.
    - Update product information such as price, description, image, etc.
    - Decide when the store is open for business by toggling dates on a calendar.
    - Manage past and new orders placed by customers. 
- Ordering System
    - Allows users to add meals to their bag and place orders.
- Responsive Web Design





## Setup

Clone down this repository. You will need node and npm installed globally on your machine.
```
$ git clone https://github.com/jonathancarpena/nathans-meal-prep.git
```
1. Install project folder `npm install`
1. Install client packages `cd client`  `npm install`
1. Install server packages `cd server`  `npm install`






## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file inside the server folder.

`MONGO_URI`: Register a new cluster in MongoDB Atlas and record your Mongo URI

`TOKEN_KEY`: a randomly generated string of numbers and letters. (Ex. "8c6b1abd9d8c44eb")
## Scripts


Development mode. Open http://localhost:3000 to view it in the browser. Server will run on PORT:5000
```
npm run dev
```

Server-side. (PORT:5000) Open http://localhost:5000 to access.
```
npm run server
```

Client-side. (PORT:3000) Open http://localhost:3000 to view it in the browser.
```
npm run client
```




## Summary

### Why I built this project:
- To provide the client an application that'll allow them to display their products as well as provide them a system that allows them to freely create, modify, and delete meals without having to build a completely new website.


### What was the focus of the project:
- Create a content managing system that is explicit and easy to use. 
- Implement a global state that tracks the user's "Bag" state.
- Complete the project within the timeframe the client asked for.


### How this project is built:
- Redux is used to keep track of the global state such as the user's bag, the appearance of a modal, the presence of the admin user, and the user's current session.
- Page routes are managed using React Router.
- The page folders are organized similar to Next.js structure.
- Customer orders, business open dates, and meal information are recorded in MongoDB.
- REST API routes are created using Node and Express.
- Meal Images are hosted through Firebase.
- REST API is hosted through Heroku.
- Client is hosted through Netlify.

### Reflection
- Working on this project not only allowed me to exercise my backend skills, but I was also able to work with time constraints. Knowing that there was a deadline, helped with figuring out a task list. 
- If I were to make this project better, I would implement a dark mode theme, experiment with using MongoDB and GridFS to potentially replace Firebase, incorporate animation throughout the application, and more personality to the design itself. 
