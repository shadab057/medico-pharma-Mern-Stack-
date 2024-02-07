import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Basir",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
    {
      name: "Pallukuru mohan kumar",
      email: "mohan@gmail.com",
      password: bcrypt.hashSync("123123123"),
      isAdmin: true,
    },
  ],
  products: [
   
    {
      name: "Azithromycin 500",
      slug: " tablets",
      category: "azicip",
      image: "/images/azithromycin.png",
      images: [],
      description: "anti-biotics",
      brand: "cipal",
      price: 60,
      countInStock: 10,
      rating: 3.5,
      numReviews: 10,
      reviews: [],
    },
  
  {
      name: "p-250",
      slug: "tablets",
      category: "dolo250",
      image: "/images/Dolo.png",
      images: [],
      description: "fever",
      brand: "micro labs limitied",
      price: 38,
      countInStock: 10,
      rating: 3.5,
      numReviews: 10,
      reviews: [],
    },
  
  
  
  
  
  {
      name: "lactogen-3",
      slug: " milk powder",
      category: "azicip",
      image: "/images/lactogen3.png",
      images: [],
      description: "Nestle",
      brand: "cipal",
      price: 460,
      countInStock: 8,
      rating: 2.5,
      numReviews: 10,
      reviews: [],
    },
  
  {
      name: "Dexa",
      slug: "inj",
      category: " diclofenac ",
      image: "/images/Dexa.png",
      images: [],
      description: "Painkiller",
      brand: "Zydus geo",
      price: 60,
      countInStock: 10,
      rating: 3.5,
      numReviews: 10,
      reviews: [],
    },
  
  
  
  {
      name: "Surgical masks",
      slug: " surgical",
      category: "masks",
      image: "/images/mask.png",
      images: [],
      description: "cold/fever",
      brand: "General",
      price: 250,
      countInStock: 100,
      rating: 3.5,
      numReviews: 10,
      reviews: [],
    },
  
  
  {
      name: "Telsimart Am",
      slug: " 10-tablets",
      category: "telma",
      image: "/images/Telsimart am.png",
      images: [],
      description: "TELMISARTAN AM",
      brand: "Knoll",
      price: 235,
      countInStock: 10,
      rating: 3.5,
      numReviews: 10,
      reviews: [],
    },
  
  
  
  
  {
      name: "Human Mixtard 30/70",
      slug: "Insullion",
      category: "mixtard",
      image: "/images/humanmixtard.png",
      description: "Diabtetic/insulin isophane/nph(70%)+human insulin/soluble insulin(30%)",
      images: [],
      brand: "Novo pvt ltd",
      price: 153.64,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      reviews: [],
    },
  
  {
      name: "orls",
      slug: "energy drinks",
      category: "apple",
      image: "/images/orls.png",
      images: [],
      description: "Drinks",
      brand: "Jhonson",
      price: 45,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      reviews: [],
    },
  
  
  
  
  {
      name: "Multiplex",
      slug: " Vitamin",
      category: "beplex",
      image: "/images/multiprex.png",
      images: [],
      description: "anti-biotics",
      brand: "Multivitamin, multiminerals & Antioxidant Soft Gelatin Capsules ",
      price: 379,
      countInStock: 8,
      rating: 4.5,
      numReviews: 10,
      reviews: [],
   },
  
  {
      name: "Protinex",
      slug: "Powder",
      category: "ensure",
      image: "/images/Protinex.png",
      images: [],
      description: "Adults Protein Powder",
      brand: "Dandone",
      price: 750,
      countInStock: 8,
      rating: 4.5,
      numReviews: 10,
      reviews: [],
    },
  
  
  
  {
      name: "Nua ultra",
      slug: "Sanitary pads",
      category: "Stayfree",
      image: "/images/nua.png",
      images: [],
      description: "pads",
      brand: "General",
      price: 45,
      countInStock: 6,
      rating: 2.4,
      numReviews: 10,
      reviews: [],
    },
  ],
};
export default data;
