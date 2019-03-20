# [VacationBrain](https://ethan-vb-client.herokuapp.com/)

## Welcome to VacationBrain
Create an account to add a trip:
Give your trip a name and tell us what you're looking for in a vacation and how long you're travelling for. Other VacationBrain users will suggest a destination for you!
Add a suggestion:
Have great vacation ideas of your own? Submit a suggestion for other users' requested trips.

## App Screenshots

## Tech Specs: 
**Front-end:**
- React
- Redux
- Javascript
- HTML5

**Back-end**
- Node
- Express
- MongoDB hosted on mLab
- JWT 
- Passport 

## Links
[Client Repo](https://github.com/thinkful-ei26/ethan-vb-client)

[Deployed Server On Heroku](https://ethan-vb-server.herokuapp.com/)

[Deployed Client On Heroku](https://ethan-vb-client.herokuapp.com/)

## Schema
### User
```
{
  firstName:  {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
}
```

### Post
```
{ 
  name: String,
  selectedOptions: [{ type: String, required: true }],
  duration: { type: String, required: true },
  suggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion'}],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
```

### Suggestion
```
{
 suggestion: { type: String, required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
```

## API Overview
```        
/api
.
├── /auth
│   └── POST
│       ├── /login
│       ├── /refresh
│       └── /refresh-profile
├── /users
│   └── POST /
├── /trips
│   └── GET 
│       ├── /trips
│       ├── /my-trips
│   └── POST /
├── /suggestions
│   └── POST /:id
```

