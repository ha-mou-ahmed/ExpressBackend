const express = require('express')
const app = express()
const Joi = require('joi');
app.use(express.json())
app.use((req,res,next)=>{
  console.log('login...')
  next()
})
app.use((req,res,next)=>{
  console.log('Authenticated...')
  next()
})

let courses = [
    {id:1, title:'Angular'},
    {id:2, title:'ReactJS'},
    {id:3, title:'NodeJS'},
]
app.put('/api/courses/:id', function (req, res) {
    // Vérifier si l'élément existe
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send('course not found')
    }
    // Validation
    const {error,value} = validateCourse(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    // Modification
    course.title = value.title
    // ENvoyer la donnée modifiée
    res.send(course)
  })
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/api/courses', function (req, res) {
    res.send(courses)
  })
app.post('/api/courses', function (req, res) {
    const schema = Joi.object({
        title: Joi.string().alphanum().min(3).max(120).required()
    })
    const {error,value} = schema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    const course = {
        id: courses.length +1,
        title: value.title
    }
    courses = [...courses, course];
  })
  function validateCourse(course){
      // Validation
    const schema = Joi.object({
        title: Joi.string().alphanum().min(3).max(120).required()
    })
    return schema.validate(course)
  }
const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`The app listening the port ${port} ...node `))