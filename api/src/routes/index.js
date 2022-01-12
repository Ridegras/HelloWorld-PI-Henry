const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Country, Activity } = require('../db.js');
const {Op} = require('sequelize');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApi = async ()=>{
    const url = await axios('https://restcountries.com/v3.1/all');
    const countries = await url.data.map(c => ({
        id: c.cca3,
        name: c.name.common,
        image: c.flags.svg,
        continent: c.region,
        capital: (
            c.capital
                ? c.capital.join(', ')
                : typeof c.capital
        ),
        subregion: (c.subregion ? c.subregion : typeof c.subregion),
        area: c.area,
        population: c.population,
    }))

    return countries
}


const getDB = async ()=>{
    return await Country.findAll({
        attributes: ['image', 'name', 'continent', 'population', 'id'],
        include:{
            model: Activity,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
}

const getAct = async ()=>{
    return await Activity.findAll({
        attributes: ['name']
    })
}

//ROUTES

router.get('/countries', async (req,res)=>{
    const {name} = req.query;

    if (name) {
        const dbCountry = await Country.findAll({
            where: {name: {[Op.iLike]: `%${name}%`}}
        })
    
        return res.send(dbCountry)
    }

    let dbCountries = await getDB();

    if (dbCountries.length) {
        res.send(dbCountries);

    }else{
        const info = await getApi();
        //saving countries in DB
        info.forEach(c =>{
            Country.findOrCreate({
                where: {
                    id: c.id,
                    name: c.name,
                    image: c.image,
                    continent: c.continent,
                    capital: c.capital,
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population,
                }
            })
        })

        dbCountries = await getDB();
        res.json(dbCountries);
    }

    //response only the att that i need
});


router.get('/countries/:id', async (req,res)=>{
    const {id} = req.params;

    const dbCountry = await Country.findAll({
        where: {id: id.toUpperCase()},
        include:{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season', 'id'],
            through:{
                attributes: []
            }
        }
    })

    dbCountry.length
    ? res.status(200).send(dbCountry)
    : res.status(404).send('Country not found')

});

router.get('/activity', async (req,res)=>{
    const dbAct = await getAct();

    if(dbAct.length){
        res.json(dbAct);
    }else {
        res.send('No pasa');
    }
})

router.post('/activity', async (req,res)=>{
    const {name, difficulty, duration, season, country} = req.body;
    
    if(!name || !difficulty){
        console.log(`Name: ${name}, Difficulty: ${difficulty}`);
        return res.status(400).send('Name and difficulty required');
    }

    //saving activities in DB
    let actCreated = await Activity.create({
        name, difficulty, duration, season
    })

    //Aca establezco la relacion de la act con pais---
    let dbCountry = await Country.findAll({
        where: { name: country },
    })
    actCreated.addCountry(dbCountry);
    ////////---------------------------

    res.status(200).send('Activity succesfully created');

    /* OJO CON LAS MAYUSCULAS EN SEASON!!! */
});

module.exports = router;
