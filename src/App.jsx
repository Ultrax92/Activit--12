import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, updateProduct } from "./redux/productSlice";
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

  async function handleUpdateProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Produit mis à jour",
        price: 49.99,
        description: "Description mise à jour",
        image: "https://via.placeholder.com/150",
        category: "electronics",
      }),
    });

    const data = await response.json();
    dispatch(updateProduct(data));
    alert(`Le produit avec l'id ${data.id} a été modifié`);
  }

  return (
    <Container className="my-4">
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
