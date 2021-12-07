const {Pizza} = require("../models");

//object that will contain methods for pizza operations 
const pizzaController = {
    //get all pizzas
    getAllPizza(req, res){
        Pizza.find({})
        .populate({
            path: "comments",
            select: "-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one pizza by id
    getPizzaById(req, res){
        Pizza.findOne({_id: req.params.id})
        .populate({
            path: "comments",
            select: "-__v"
        })
        .select("-__v")
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: "No pizza found with this id"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a Pizza
    createPizza(req, res){
        Pizza.create(req.body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //update pizza by id
    updatePizza(req, res){
        Pizza.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: "No pizza found with this id"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a pizza
    deletePizza(req, res){
        Pizza.findOneAndDelete({_id: req.params.id})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: "No pizza found with this id"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;