const {
  User,
  Bouquet,
  Fleur,
  Transaction,
  BouquetFleur,
} = require("../models");

async function insertTestData() {
  try {
    let fleur1, fleur2, fleur3, fleur4;
    let user1, user2;
    const userCount = await User.count();
    if (userCount === 0) {
      user1 = await User.create({
        login: "Celina",
        password: "password123",
        fullName: "Celina Djermoune",
      });
      user2 = await User.create({
        login: "Romaissa",
        password: "password456",
        fullName: "Romaissa",
      });
      console.log("Users inserted:", user1, user2);
    }

    // Vérifier si des fleurs existent déjà, sinon les créer
    const fleurCount = await Fleur.count();
    if (fleurCount === 0) {
      fleur1 = await Fleur.create({
        name: " Fleur Rose ",
        description: "Une belle rose",
        price: 50.0,
        image:"rose.jpeg",
      });
      fleur2 = await Fleur.create({
        name: "Fleur tulipe",
        description: "une belle tulipe",
        price: 40.0,
          image:"tulipe.jpeg",
      });
      
      fleur3 = await Fleur.create({
        name: "Fleur Lys",
        description: "une belle fleur lys",
        price: 40.0,
          image:"lys.jpeg",
      });
    
      fleur4 = await Fleur.create({
        name: "Fleur Orchidée  ",
        description: "une magnifique Orchidée",
        price: 30.0,
        image:"Orchidée.jpeg",
      });
      console.log("Flowers inserted:");
    }

    // Vérifier si des bouquets existent déjà, sinon les créer
    const bouquetCount = await Bouquet.count();
    if (bouquetCount === 0) {
      const bouquet1 = await Bouquet.create({
        name: " Bouquet de Roses",
        description: "Un bouquet classique et élégant.",
        price: 1500.0,
        image: "roses.jpg",
        likes: 0,
      });
      const bouquet2 = await Bouquet.create({
        name: "Bouquet de Tulipes",
        description: "Symboles de printemps et de fraîcheur.",
        price: 400.0,
        image: "tulipes.jpg",
        likes: 0,
      });
      const bouquet3 = await Bouquet.create({
        name: "Bouquet d'Orchidées",
        description: "Exotiques et élégantes.",
        price: 400.0,
        image: "orchidées.png",
        likes: 0,
      });
      const bouquet4 = await Bouquet.create({
        name: "Bouquet de Lys",
        description: "Parfait pour les grandes occasions.",
        price: 400.0,
        image: "lys.webp",
        likes: 0,
      });

      console.log("Bouquets inserted:", bouquet1, bouquet2, bouquet3, bouquet4);

      // Associer des fleurs aux bouquets via BouquetFleur
      if (fleur1) {
        await BouquetFleur.create({
          bouquetId: bouquet1.id,
          fleurId: fleur1.id,
          quantity: 20, 
        });
        
      }
      if (fleur2) {
        await BouquetFleur.create({
          bouquetId: bouquet2.id,
          fleurId: fleur2.id,
          quantity: 20, 
        });
      
      }
      if (fleur3) {
        await BouquetFleur.create({
          bouquetId: bouquet3.id,
          fleurId: fleur3.id,
          quantity: 20, 
        });
      
      }
      if (fleur4) {
        await BouquetFleur.create({
          bouquetId: bouquet4.id,
          fleurId: fleur4.id,
          quantity: 20, 
        });
      
      }
    }

    // Vérifier si des transactions existent déjà, sinon les créer
    // const transactionCount = await Transaction.count();
    // if (transactionCount === 0) {
    //   const user = await User.findOne(); // On prend le premier utilisateur pour la transaction
    //   const bouquet1 = await Bouquet.findOne({
    //     where: { name: "Romantic Bouquet" },
    //   });

    //   const transaction = await Transaction.create({
    //     userId: user.id,
    //     totalAmount: bouquet1.fleurs[0].unitPrice * 10, // Le prix total pour 10 roses
    //   });

    //   await transaction.addBouquet(bouquet1, { through: { quantity: 10 } });
    //   console.log("Transaction inserted:", transaction);
    // }
  } catch (error) {
    console.error("Error inserting test data:", error);
  }
}


module.exports = insertTestData;
