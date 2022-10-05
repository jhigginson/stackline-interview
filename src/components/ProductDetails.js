import { useSelector } from 'react-redux';
import { selectProducts } from '../store/productsSlice';

const ProductDetails = (props) => {
  const products = useSelector(selectProducts);

  return (
    <> {products.length > 0 &&
      <article>
        <figure className="px-8 py-6 border-b border-slate-200 flex flex-col items-center gap-2">
          <img className="w-48"
            src={products[0].image}
            alt={products[0].title} />
          <figcaption className="font-medium text-xl mt-2">{products[0].title}</figcaption>
          <p className="font-light text-center text-slate-400 px-8">{products[0].subtitle}</p>
        </figure>
        <ul className="border-b border-slate-200 flex flex-wrap gap-4 p-6">
          {products[0].tags.map((tag, index) => (
            <li key={index} className="text-sm text-slate-500 border-2 border-slate-200 px-6 py-1 rounded-lg">
              {tag}
            </li>
          ))}
        </ul>
      </article>
    }
    </>
  )
};


export default ProductDetails;