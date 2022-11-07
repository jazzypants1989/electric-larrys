import bcrypt from "bcryptjs"

const data = {
  users: [
    {
      name: "Jazzy Pants",
      email: "jessepence@gmail.com",
      password: bcrypt.hashSync("Z0nkerswow!"),
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Goofy Board Game",
      slug: "goofy-board-game",
      category: "Board Games",
      tags: "board games, goofy, disney",
      image: "/images/disney.png",
      price: 70,
      countInStock: 20,
      description: "A popular shirt",
      isFeatured: true,
      isOnSale: false,
      isRented: false,
      salePrice: 0,
    },
    {
      name: "Creepy Toy",
      slug: "creepy-toy",
      category: "Toys",
      image: "/images/creepytoy.webp",
      price: 80,
      countInStock: 0,
      description: "A really creepy toy",
      tags: "toys, creepy, scary, why",
      isFeatured: true,
      isOnSale: false,
      isRented: false,
      salePrice: 0,
    },
    {
      name: "Pokemon Blue",
      slug: "pokemon-blue",
      category: "Video Games",
      image: "/images/pokemonblue.webp",
      price: 100,
      countInStock: 15,
      description:
        "Remember when this was the best game ever? Who am I kidding, it still is. Who needs more than 150 Pokemon anyway?",
      tags: "video games, pokemon, blue, nostalgia, nintendo, game boy",
      isFeatured: true,
      isOnSale: false,
      isRented: false,
      salePrice: 0,
    },
    {
      name: "Star Trek Box Set",
      slug: "star-trek-box-set",
      category: "TV Shows",
      image: "/images/startrekboxset.webp",
      price: 100,
      countInStock: 15,
      description:
        "The original Star Trek series, all 79 episodes on 18 DVDs. This is the best deal you'll find anywhere.",
      tags: "tv shows, star trek, box set, dvd, original series, 1960s",
      isFeatured: true,
      isOnSale: false,
      isRented: false,
      salePrice: 0,
    },
    {
      name: "Star Wars Holiday Special",
      slug: "star-wars-holiday-special",
      category: "Movies",
      image: "/images/starwarschristmas.webp",
      price: 100,
      countInStock: 15,
      description:
        "The Star Wars Holiday Special is a 1978 American musical science fiction film set in the Star Wars universe. It was produced and originally broadcast by the American television network CBS as an hour-long television special on November 17, 1978. The film was written by Lawrence Kasdan and George Lucas, and directed by Steve Binder. It stars the original cast of the Star Wars film series, including Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams, Anthony Daniels, Peter Mayhew, and David Prowse. The film also features Bea Arthur, Harvey Korman, Art Carney, and Mel Brooks. The film was a ratings failure and was widely panned by critics and fans alike. It has since become a cult classic and is often cited as one of the worst films ever made.",
      tags: "movies, star wars, holiday special, 1970s, cult classic, worst movie ever",
      isFeatured: true,
      isOnSale: true,
      isRented: false,
      salePrice: 0,
    },
    {
      name: "Zelda: A Link to the Past",
      slug: "zelda-a-link-to-the-past",
      category: "Video Games",
      image: "/images/zeldaalink.webp",
      price: 100,
      countInStock: 15,
      description:
        "The Legend of Zelda: A Link to the Past is an action-adventure game developed and published by Nintendo for the Super Nintendo Entertainment System. It was released in Japan and North America in November 1991, and in Europe and Australia in 1992. It is the third game in The Legend of Zelda series, and the first to feature a 3D overworld. The game is set in the fictional land of Hyrule, where the player controls the titular character Link, who must collect the eight fragments of the Triforce of Wisdom to stop the evil wizard Ganon from conquering the land. The game is noted for its expansive world, nonlinear gameplay, and its use of a save-anywhere system. It was a critical and commercial success, selling over 7.5 million copies worldwide.",
      tags: "video games, zelda, link to the past, nintendo, snes, 1990s",
      isFeatured: true,
      isOnSale: false,
      isRented: true,
      salePrice: 0,
    },
  ],
}

export default data
