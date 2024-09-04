import 'dotenv/config';
import connect from 'mongoose';
import connection from 'mongoose';
import Product from '../DAO/mongo/models/product.model.js'; // Asegúrate de que la ruta al modelo sea correcta

async function loadProducts() {
    try {
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos');

        const productos = [
            {
              "title": "Camiseta Negra",
              "photo": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
              "category": "Ropa",
              "price": 25,
              "stock": 50,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Pantalones Vaqueros",
              "photo": "https://images.unsplash.com/photo-1583267744899-d8fa0cdd91a9",
              "category": "Ropa",
              "price": 45,
              "stock": 30,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Sudadera con Capucha",
              "photo": "https://images.unsplash.com/photo-1618354692205-73b277e71bc4",
              "category": "Ropa",
              "price": 35,
              "stock": 20,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Chaqueta de Cuero",
              "photo": "https://images.unsplash.com/photo-1534854638094-c7e8a7ef9930",
              "category": "Ropa",
              "price": 120,
              "stock": 10,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Camisa Blanca",
              "photo": "https://images.unsplash.com/photo-1523381211417-300f0c87b8ac",
              "category": "Ropa",
              "price": 30,
              "stock": 40,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Zapatillas Deportivas",
              "photo": "https://images.unsplash.com/photo-1583002683340-e040bb6719b5",
              "category": "Calzado",
              "price": 60,
              "stock": 25,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Botas de Montaña",
              "photo": "https://images.unsplash.com/photo-1601157037074-a23c1a1629e1",
              "category": "Calzado",
              "price": 80,
              "stock": 15,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Zapatos de Vestir",
              "photo": "https://images.unsplash.com/photo-1571607383361-d7c163b2632f",
              "category": "Calzado",
              "price": 70,
              "stock": 20,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Sandalias de Playa",
              "photo": "https://images.unsplash.com/photo-1629187320297-1796a1c9f14e",
              "category": "Calzado",
              "price": 20,
              "stock": 40,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Botines Casual",
              "photo": "https://images.unsplash.com/photo-1611078483195-1d60169f2f8d",
              "category": "Calzado",
              "price": 55,
              "stock": 18,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Gorra de Beisbol",
              "photo": "https://images.unsplash.com/photo-1586348943529-beaae6c28db9",
              "category": "Accesorios",
              "price": 20,
              "stock": 100,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Cinturón de Cuero",
              "photo": "https://images.unsplash.com/photo-1628523461905-64bc1a79c2ff",
              "category": "Accesorios",
              "price": 35,
              "stock": 25,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Gafas de Sol",
              "photo": "https://images.unsplash.com/photo-1598300057503-1ab718b653d4",
              "category": "Accesorios",
              "price": 50,
              "stock": 30,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Reloj de Pulsera",
              "photo": "https://images.unsplash.com/photo-1501985451801-967a3995d789",
              "category": "Accesorios",
              "price": 120,
              "stock": 12,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Bolso de Mano",
              "photo": "https://images.unsplash.com/photo-1612202817825-85e3f3ce12f0",
              "category": "Accesorios",
              "price": 70,
              "stock": 15,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Teléfono Inteligente",
              "photo": "https://images.unsplash.com/photo-1537453728877-e541f53c9798",
              "category": "Electrónica",
              "price": 699,
              "stock": 10,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Auriculares Bluetooth",
              "photo": "https://images.unsplash.com/photo-1596379402894-a9404d8d6672",
              "category": "Electrónica",
              "price": 120,
              "stock": 35,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Laptop Gaming",
              "photo": "https://images.unsplash.com/photo-1587202372775-1d5aa1e23054",
              "category": "Electrónica",
              "price": 1299,
              "stock": 5,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Smartwatch",
              "photo": "https://images.unsplash.com/photo-1513279920456-673d5e6ff7c7",
              "category": "Electrónica",
              "price": 250,
              "stock": 20,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Cámara DSLR",
              "photo": "https://images.unsplash.com/photo-1531148233859-a4a6542cde85",
              "category": "Electrónica",
              "price": 850,
              "stock": 8,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Vestido de Verano",
              "photo": "https://images.unsplash.com/photo-1588182987665-7c2581a66f07",
              "category": "Ropa",
              "price": 55,
              "stock": 20,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Abrigo de Invierno",
              "photo": "https://images.unsplash.com/photo-1512392166798-194bd28f11af",
              "category": "Ropa",
              "price": 150,
              "stock": 10,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Falda Plisada",
              "photo": "https://images.unsplash.com/photo-1618354692205-73b277e71bc4",
              "category": "Ropa",
              "price": 40,
              "stock": 25,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Chaqueta de Punto",
              "photo": "https://images.unsplash.com/photo-1551989918-6fc23b4b865c",
              "category": "Ropa",
              "price": 65,
              "stock": 15,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Bufanda de Lana",
              "photo": "https://images.unsplash.com/photo-1501862700950-18382cd41497",
              "category": "Accesorios",
              "price": 25,
              "stock": 40,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Guantes de Cuero",
              "photo": "https://images.unsplash.com/photo-1602810310844-9e3a8d41085f",
              "category": "Accesorios",
              "price": 45,
              "stock": 30,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Mochila de Viaje",
              "photo": "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd",
              "category": "Accesorios",
              "price": 80,
              "stock": 15,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Sombrero de Paja",
              "photo": "https://images.unsplash.com/photo-1587306713994-c2d2ab3dd5f6",
              "category": "Accesorios",
              "price": 30,
              "stock": 25,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Zapatos Oxford",
              "photo": "https://images.unsplash.com/photo-1604373605226-800245aaebc7",
              "category": "Calzado",
              "price": 90,
              "stock": 20,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Zapatos de Tacón",
              "photo": "https://images.unsplash.com/photo-1611078483195-1d60169f2f8d",
              "category": "Calzado",
              "price": 75,
              "stock": 15,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Pantuflas de Casa",
              "photo": "https://images.unsplash.com/photo-1601072378107-d7d13f4fd455",
              "category": "Calzado",
              "price": 25,
              "stock": 50,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Botas de Lluvia",
              "photo": "https://images.unsplash.com/photo-1556484687-306361646379",
              "category": "Calzado",
              "price": 60,
              "stock": 25,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Camiseta Básica",
              "photo": "https://images.unsplash.com/photo-1579002620503-4c2688c327f8",
              "category": "Ropa",
              "price": 15,
              "stock": 100,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Jersey de Lana",
              "photo": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
              "category": "Ropa",
              "price": 55,
              "stock": 30,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Vestido de Fiesta",
              "photo": "https://images.unsplash.com/photo-1593032469822-4d46a5a1512b",
              "category": "Ropa",
              "price": 110,
              "stock": 12,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Zapatos de Correr",
              "photo": "https://images.unsplash.com/photo-1554512348-d09d6f0e968c",
              "category": "Calzado",
              "price": 120,
              "stock": 20,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Alpargatas",
              "photo": "https://images.unsplash.com/photo-1562158077-d71d76bc6b10",
              "category": "Calzado",
              "price": 40,
              "stock": 25,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Sombrero de Fieltro",
              "photo": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
              "category": "Accesorios",
              "price": 50,
              "stock": 20,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Pañuelo de Seda",
              "photo": "https://images.unsplash.com/photo-1581404917879-9f5dc73cccb8",
              "category": "Accesorios",
              "price": 30,
              "stock": 35,
              "user_id": "66d3ba3f990b36513dd860d8"
            },
            {
              "title": "Audífonos Inalámbricos",
              "photo": "https://images.unsplash.com/photo-1588421358481-d85e17f42ba3",
              "category": "Electrónica",
              "price": 150,
              "stock": 40,
              "user_id": "66d3ba3f990b36513dd860d8"
            }
        ];

        await Product.insertMany(productos); // Usa el modelo de producto para insertar
        console.log('Productos cargados correctamente');
        connection.close();
    } catch (error) {
        console.error('Error loading products:', error);
        connection.close();
    }
}

loadProducts();
