# Project-4: Scribble


### ![](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

## Overview

Link to the site on [Heroku](https://djscribble.herokuapp.com/)

The final project tasked to us by General Assembly was to create a Full Stack Django REST application with a React front-end, Python back-end and a PostgreSQL database.

For our final project, both my teammate and I wanted to develop something slightly more creative and challenging than our previous projects. For this reason, we decided on building a web-based version of Pictionary.
 
The intention of the application was to allow players to create drawings using the Canvas element and save their drawings to the back-end for other users to then be able to guess what it was that they were trying to draw.

This was a **week-long paired project**.


## Brief

* Choose to work solo or in a team
* Build a full-stack application by making your own backend and your own front-end
* Use a **Python Django API using Django REST Framework** to serve your data from a Postgres database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and **CRUD functionality** for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design to kick your portfolio up a notch.
* Be deployed online so it's publicly accessible.

## Technology Used

> HTML5   
> CSS3    
> Python    
> Django  
> PostgreSQL   
> JavaScript (ES6)   
> React.js   
> Node.js  
> Material-UI   
> Webpack  
> Heroku    
> Git  
> GitHub

## Approach

### Inital Steps

Prior to the project idea being signed-off by a General Assembly Instructor, we
drew out a diagram that showed all the relationships between each of our models for the database.

These models included:   
- Correct Answer  
- Image  
- User  
- User Answer  
- Category  
 
### Back-End
Developing the back-end using Django and Python was relatively new to both my partner and I, therefore to avoid any confusion and boost our learning experience, we decided to pair-programme this section.

In the PostgreSQL databas we set up a table for the five models.

###### User model

For the users, we extended the basic User provided by Django to also include email and name fields.

###### Correct Answer & Category models

For the correct answer model we came up with objects and characters for people to draw to. This model was also given a many-to-many relationship with categories, to allow one answer to come under multiple categories.

	class CorrectAnswer(models.Model):
	    correct_answer = models.CharField(max_length=50)
	    category = models.ManyToManyField(Category, related_name='doodle')
	    is_solved = models.BooleanField(default=False)
	    
	    def __str__(self):
	        return f'Correct Answer = {self.correct_answer}'


For both categories and correct answers, we created a fixtures.json file to store our data in order to seed it back into the database when needed.

###### Image model

The Image model included the image drawn by a user and the time that they drew their picture. it also had a one-to-many relationship with the user who drew the image and the correct answer (the object / character) they drew to.

The image itself is saved as a route to the folder 'pics' which stores the actual image files themselves.

	class Image(models.Model):
	    user_drawn_image = models.ImageField(upload_to='pics', null=True)
	    correct_answer = models.ForeignKey(CorrectAnswer, related_name='doodle', on_delete=models.CASCADE, null=True)
	   max_length=50, blank=True)
	    date_drawn = models.DateTimeField(auto_now_add=True)
	    user_artist = models.ForeignKey(User, related_name='doodle', on_delete=models.CASCADE, null=True) 
 
###### User Answer model

The user answer model was designed to store all the guesses that users on the site made to each of the images.

The model included the guess made and the time that the guess was made. It also had a one-to-many relationship with the user that made the guess and the image which the guess was made to.

	class UserAnswer(models.Model):
	    user_answer = models.CharField(max_length=50)
	    date_guessed = models.DateTimeField(auto_now_add=True)
	    user = models.ForeignKey(User, related_name='doodle1', on_delete=models.CASCADE, null=True)
	    image = models.ForeignKey(Image, related_name='doodle', on_delete=models.CASCADE)


### API End-points

`register/ `(POST)   
Once a user enters the required data a POST request is made. If the data is valid then it will be stored into the database in the User table.

`login/` (POST)  
Once a POST request is made on this route and the input is valid, a response will be given, providing a JWT token.

`users/*`(GET)  
Returns a list of the users on the site.

`images/` (GET | POST)  
The GET request provides a list of all the images created by users.  
The POST request allows a user to save their drawing to the back-end in the 'pics' folder as a Binary Large Object (BLOB). It also saves the route to that image in the database.

This was possible by adding this code to the settings.py file:

	MEDIA_URL = '/api/media/'
	MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
	
	FILE_UPLOAD_HANDLERS = ["django.core.files.uploadhandler.MemoryFileUploadHandler",
	 "django.core.files.uploadhandler.TemporaryFileUploadHandler"]

The POST request in views.py:

    def post(self, request): #uncomment to add artist id to image
        request.data['user_artist'] = request.user.id
        image = Image(user_drawn_image=request.FILES['user_drawn_image'])
        image.save()
        return Response('Success')
        
                     
`useranswers/` (GET | POST)  
The GET request provides a list of all the guesses users have made on the drawings.   
The POST request allows users to make guesses to a specific drawing.

`categories/` (GET | POST)  
Like useranswers/, this route provides a way to GET a list of all the categories and the ability to POST new ones to the database.

`answers/`(GET | POST)  
Again, this route gives a list of all the answers which users can draw to (GET) and POST new ones to the database.

`images/<int:pk>/` & `answers/<int:pk>/` & `users/<int:pk>/` (GET)    
All these routes GET the data related to the image / answer / user with the specific id provided at the end of the route.

Additionally, `images/<int:pk>/` has a PUT request which links the the user artist to the specific image.


### Front-End
To develop the front-end of the application we decided to split components between us in order to be more efficient.

However we did add new features to each others components as we developed, particularly the 'Draw' component, which held the logic for users to draw their pictures.

The site includes a Login, Register, Home, Draw, All drawings, Guess and Profile page.

##### Draw Page

![drawgif](https://media.giphy.com/media/JR0uxcYHrHfzuxtakE/giphy.gif)

Here the user will be given a randomly generated word which is either an object, character or animal. Using a modified Canvas element the user can attempt to draw it.

The user has access to both a colour pallet and brush size scale for extra creative freedom.

The user can either skip to a new word or submit their drawing. In order for the image to be submitted, the image must first be turned into a Binary Large Object (BLOB). A POST request is then made which saves the blob to the back-end and the path to that image in the database.

	  function saveImage() {
	    let data = new FormData()
	    canvas.toBlob(function (blob) {
	      data.append('correct_answer', 4)
	      data.append('user_drawn_image', blob)
	      axios.post('/api/images/', data, {
	        headers: {
	          'Content-type': 'multipart/form-data',
	          Authorization: `Bearer ${Auth.getToken()}`
	        }
	      })
	        .then(resp => console.log(resp.data))
	    }, 'image/png')
	  }

A PUT request was then added to the 'next' button in order to update the database with information about the word linked to that image and the artist who drew it. 

	  function put() {
	    axios.put(`/api/images/${highestId.length + 1}/`, { 'correct_answer': props.match.params.id }, {
	      headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${Auth.getToken()}`
	      }
	    })
	      .then(props.history.push(`/draw/${randomAnswer()}`))
	      .then(setDoRefresh(true))
	  }

#### All Drawings Page

This page shows all the images drawn by users on the site. 
A user can click on any of the images and this will take them to the **guess page.**

#### Guess Page

![guess elephant](https://i.imgur.com/VOAPIk4.png)

The guess page shows the drawing and the username of the person who drew that drawing. The user is given three chances to guess what the drawing is.

The user must enter their answer and press **enter** in order for the guess to be checked against the answer. 

If you fail all three times, the user will be told what the correct answer was. All guesses made will be sent to the database via a POST request which is linked to the image that the user made the guess to.

	  function checkMatch(ev, ans, input, num) {
	    if (ev.key === 'Enter') {
	      if (num === 1) setGuess1(input); else if (num === 2) setGuess2(input); else if (num === 3) setGuess3(input)
	      axios.post('/api/useranswers/', { 'user_answer': input, 'image': parseInt(props.match.params.id) }, {
	        headers: { Authorization: `Bearer ${Auth.getToken()}` }
	      })
	        .then(() => console.log('success'))
	      if (ans.toLowerCase() === input.toLowerCase()) {
	        setDisable1(true); setDisable2(true); setDisable3(true)
	      } else if (num === 1) setClose1(true), setDisable1(true); else if (num === 2) setClose2(true), setDisable2(true); else if (num === 3) setClose3(true), setDisable3(true)
	      updateForm('')
	      ev.preventDefault()
	    }
	  }
	
	  function checkFail(g1, g2, g3, ans) {
	    if (ans) {
	      const lower = ans.toLowerCase()
	      if (g1 === lower || g2 === lower || g3 === lower) {
	        return 'Correct!'
	      } else if (g1 && g2 && g3) {
	        return `:( Correct answer is: ${ans}`
	      }
	    }
	  }

#### Profile Page

![profile](https://i.imgur.com/Q9On4rS.png)

The profile page shows the user all of the drawings they've ever made and all the guesses (right or wrong) that other users have made of those images.

## Wins & Blockers

Unfortunatley we ran out of time to be able to link the POST and PUT requests into a single POST request for the image on the draw page. At the moment, when adding `correct_answer` or `user_artist` to the image, this won't save to the database and instead has to be done seperately.

After opening the draw page, the color pallet, size scale and canvas would also show up on other pages. This is due to the fact that the canavs and these other features can only be rendered when placed directly into the index.html file. To fix this, we had added and removed a 'noShow' class which toggled the display of the items for each page.

I am most proud of having been able to save and retrieve images to and from the back-end, as PostgreSQL does not allow image files to be saved directly to the database.

Getting the Canvas element to work and create successful POST requests with was also a big win.

## Future Features
 
* Incorporate categories for people to draw from, as we have already set up the back-end in order for this to be possible.
* Establish a points system for correct guesses.
* Improve the overall appearance of the app.
* Link the POST and PUT requests for the image on the draw page.

## Lessons Learnt

Due to many of the features of the application being new to us, we knew we needed to keep the site simple in order to finish the MVP within the time-frame. However we should have left more time in order to design the front-end more and improve the user-experience.

