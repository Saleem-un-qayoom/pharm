import "./Home.scss";

import CategoryList from "../../../components/CategoryList/CategoryList";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import HeaderFooterWrapper from "../../../components/HeaderFooterWrapper/HeaderFooterWrapper";
import ProductList from "../../../components/ProductList/ProductList";
import { useParams } from "react-router";

const productList = [
  {
    ProductTitle: "Product A",
    products: [
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
    ],
  },

  {
    ProductTitle: "Product B",
    products: [
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
    ],
  },
  {
    ProductTitle: "Product B",
    products: [
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
    ],
  },
  {
    ProductTitle: "Product C",
    products: [
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
      {
        name: "Medicine (879)",
        image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
      },
    ],
  },
];

const Home = ({ popUpToggle }) => {
  let params = useParams();

  return (
    <>
      <Header />
      <HeaderFooterWrapper>
        <CategoryList />
        {productList.map((item, key) => (
          <ProductList product={item} key={key} />
        ))}
      </HeaderFooterWrapper>
      <Footer popUpToggle={popUpToggle} />
    </>
  );
};

export default Home;
