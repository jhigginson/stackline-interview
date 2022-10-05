import { useEffect } from 'react';
import logo from './stackline_logo.svg';
import { useDispatch } from 'react-redux';
import { getProductsData } from './store/productsSlice';
import ProductDetails from './components/ProductDetails';
import SalesTable from './components/SalesTable';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);


  return (
    <div className="h-screen flex flex-col text-slate-600">
      <header className="basis-24 shrink-0 bg-[#052748]">
        <img src={logo} alt="Stackline" className="w-48 h-full ml-6" />
      </header>
      <main className="bg-[#f5f7fa] h-fit flex flex-col lg:flex-row gap-6 py-20 px-6">
        <section id="product" className="bg-white shrink-0 basis-[400px] shadow-lg">
          <ProductDetails />
        </section>
        <section id="table" className="bg-white w-full shadow-lg" >
          <SalesTable />
        </section>
      </main>
    </div>
  );
}

export default App;
