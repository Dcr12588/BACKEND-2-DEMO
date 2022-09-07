let movies = require('./db.json')

module.exports = {
    getMovies: (req,res) => {
         res.status(200).send(movies)
    },
    deleteMovie: (req,res) => {
        console.log(req.params.id)
        let index = movies.findIndex(elem => elem.id === +req.params.id)
        movies.splice(index,1)
        res.status(200).send(movies)
    },
    createMovie: (req,res) => {
        const {title,rating, imageURL} = req.body
        let newMovie = {
            title, 
            rating: +rating,
            imageURL,
            id: globalID
        }
        movies.push(newMovie)
        globalID++;
        res.status(200).send(movies)
    },
    updateMovie: (req,res) => {
        // console.log(req.params.id)
        // console.log(req.body)
        const {type} = req.body;
        let index = movies.findIndex(elem => elem.id === +req.params.id)
        if(type === 'minus' && movies[index].rating > 0){
            movies[index].rating -= 1;
            res.status(200).send(movies)
        } else if(type === 'plus' && movies[index].rating < 5){
            movies[index].rating += 1;
            res.status(200).send(movies)
    } else {
        res.status(400).send('Invalid star rating!')
    }
    }
}