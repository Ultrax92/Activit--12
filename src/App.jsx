import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  addProduct,
  updateProduct,
  updateProductPrice,
  removeProduct,
} from "./redux/productSlice";
import { selectProducts } from "./redux/selectors";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
    }
    fetchProducts();
  }, [dispatch]);

  async function handleAddProduct() {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    });

    const data = await response.json();
    dispatch(addProduct(data));
    alert(`Le produit avec l'id ${data.id} a été créé`);
  }

  async function handleUpdateProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test product updated",
        price: 10,
        description: "lorem ipsum set dolor",
        image: "https://i.pravatar.cc",
        category: "clothes",
      }),
    });
    const data = await response.json();
    dispatch(updateProduct(data));
    alert(`Le produit avec l'id ${data.id} a été modifié`);
  }

  async function handleUpdatePrice(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: 5 }),
    });
    const data = await response.json();
    dispatch(updateProductPrice({ id: data.id, price: data.price }));
    alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
  }

  async function handleDeleteProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    dispatch(removeProduct(data.id));
    alert(`Le produit avec l'id ${data.id} a été supprimé`);
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={handleAddProduct}>
          Ajouter un produit
        </Button>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 d-flex flex-column">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="cardImg"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description.substring(0, 100)}...
                </Card.Text>
                <Card.Text>{product.price} €</Card.Text>
                <Button
                  variant="warning"
                  className="mt-auto"
                  onClick={() => handleUpdateProduct(product.id)}
                >
                  Modifier le produit complet
                </Button>
                <Button
                  variant="info"
                  className="mt-2"
                  onClick={() => handleUpdatePrice(product.id)}
                >
                  Modifier le prix du produit
                </Button>
                <Button
                  variant="danger"
                  className="mt-2"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Supprimer le produit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
