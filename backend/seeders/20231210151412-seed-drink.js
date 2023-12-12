'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Drinks', [
      {
        name:'Bad Touch',
        description:"We're nothing but mammals after all.",
        price:250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Beer',
        description:"Traditionally brewed beer has become a luxury, but this one's pretty close to the real deal...",
        price:200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Bleeding Jane',
        description:"Say the name of this drink three times in front of a mirror and you'll look like a fool.",
        price:200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Bloom Light',
        description:"It's so unnecessarily brown....",
        price:230,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Blue Fairy',
        description:"One of these will make all your teeth turn blue. Hope you brushed them well.",
        price:170,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Brandtini',
        description:"8 out of 10 smug assholes would recommend it but they're too busy being smug assholes.",
        price:250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Cobalt Velvet',
        description:"It's like champaigne served on a cup that had a bit of cola left.",
        price:280,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Fringe Weaver',
        description:"It's like drinking ethylic alcohol with a spoonful of sugar.",
        price:260,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Frothy Water',
        description:"PG-rated shows' favorite Beer ersatz since 2040.",
        price:150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Grizzly Temple',
        description:"This one's kinda unbearable. It's mostly for fans of the movie it was used on.",
        price:220,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Gut Punch',
        description:"It's supposed to mean 'a punch made of innards', but the name actually described what you feel while drinking it.",
        price:80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Marsblast',
        description:"One of these is enough to leave your face red like the actual planet.",
        price:170,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Mercuryblast',
        description:"No thermometer was harmed in the creation of this drink.",
        price:250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Moonblast',
        description:"No relation to the Hadron cannon you can see on the moon for one week every month.",
        price:180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Piano Man',
        description:"This drink does not represent the opinions of the Bar Pianists Union or its associates.",
        price:320,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Pile Driver',
        description:"It doesn't burn as hard on the tongue but you better not have a sore throat when drinking it...",
        price:160,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Sparkle Star',
        description:"They used to actually sparkle, but too many complaints about skin problem made them redesign the drink without sparkling.",
        price:150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Sugar Rush',
        description:"Sweet, light and fruity. As girly as it gets.",
        price:150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Sunshine Cloud',
        description:"Tastes like old chocolate milk with its good smell intact. Some say it tastes like caramel too...",
        price:150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Suplex',
        description:"A small twist on the Piledriver, putting more emphasis on the tongue burning and less on the throat burning.",
        price:160,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'Zen Star',
        description:"You'd think something so balanced would actually taste nice... you'd be dead wrong.",
        price:210,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drinks', null, {});
  }
};
