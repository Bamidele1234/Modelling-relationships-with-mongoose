import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


interface AuthorType {
  name: string;
  bio: string;
  website: string;
}

const authorSchema = new mongoose.Schema({
  name: { type : String },
  bio: { type: String, required: false }, 
  website: { type: String, required: false },
});

const courseSchema = new mongoose.Schema({
  name: String,
  author : {type : authorSchema, required : true},
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', courseSchema);

async function createCourse(name : string, author : AuthorType) {
  const course = new Course({
    name, 
    author ,
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId : string) {
  const course = await Course.updateOne({ _id: courseId}, {
    $unset : {
      'author' : ''
    }
  });

  console.log(course);
}

updateAuthor('658def0c962409cd2ba50532');

// createCourse('Node Course', { 
//   name: 'Mosh' , 
//   bio : 'Sample bio', 
//   website : 'This is my website'
// });
