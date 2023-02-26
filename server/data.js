import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('eBruin'),
      isAdmin: true,
    },
    {
      name: 'eBruin',
      email: 'eBruin@gmail.com',
      password: bcrypt.hashSync('eBruin'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'First ',
      slug: '1st-p',
      category: '1st category',
      image: '/images/p1.jpeg', // 679px * 829px
      price: 120,
      countInStock: 10,
      brand: '1st Brand',
      rating: 4.5,
      numReviews: 10,
      description: 'This is the Description for the 1st product',
    },
    {
      name: 'Second',
      slug: '2nd-p',
      category: '2nd category',
      image: '/images/p2.jpeg',
      price: 100,
      countInStock: 0,
      brand: '2nd Brand',
      rating: 4.0,
      numReviews: 15,
      description: 'This is the Description for the 2nd product',
    },
    {
      name: 'Third',
      slug: '3rd-p',
      category: '3rd category',
      image: '/images/p3.jpeg',
      price: 80,
      countInStock: 6,
      brand: '3rd Brand',
      rating: 4.5,
      numReviews: 50,
      description: 'This is the Description for the 3rd product',
    },
    {
      name: 'Fourth',
      slug: '4th-p',
      category: '4th category',
      image: '/images/p4.jpeg',
      price: 50,
      countInStock: 90,
      brand: '4th Brand',
      rating: 5.0,
      numReviews: 30,
      description: 'This is the Description for the 4th product',
    },
  ],
};

export default data;
